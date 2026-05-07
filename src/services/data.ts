import Taro from '@tarojs/taro'
import { RESOURCE_BASE, resolveUrl } from '@/constants/cdn'
import type { BookList } from '@/constants/booklists'

export interface Book {
  id: string
  name: string
  author: string
  type: string
  picUrl: string
  bd_link: string
  brief: string
  addedAt: string
}

export interface CategoryIndex {
  type: string
  count: number
}

const categoryCache = new Map<string, Book[]>()
let indexCache: CategoryIndex[] | null = null
let bookListsCache: BookList[] | null = null

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await Taro.request({ url, method: 'GET' })
  if (res.statusCode !== 200) {
    throw new Error(`请求失败: ${res.statusCode}`)
  }
  return res.data as T
}

function normalizeBook(book: Book): Book {
  return { ...book, picUrl: resolveUrl(book.picUrl) }
}

export async function loadIndex(): Promise<CategoryIndex[]> {
  if (indexCache) return indexCache
  indexCache = await fetchJSON<CategoryIndex[]>(`${RESOURCE_BASE}/configs/index.json`)
  return indexCache!
}

export async function loadCategory(type: string): Promise<Book[]> {
  if (categoryCache.has(type)) return categoryCache.get(type)!
  const raw = await fetchJSON<Book[]>(`${RESOURCE_BASE}/configs/${type}.json`)
  const books = raw.map(normalizeBook)
  categoryCache.set(type, books)
  return books
}

export async function loadAllCategories(): Promise<Book[]> {
  const index = await loadIndex()
  const loaded: Book[][] = await Promise.all(
    index.map(async ({ type }) => {
      if (categoryCache.has(type)) return categoryCache.get(type)!
      const raw = await fetchJSON<Book[]>(`${RESOURCE_BASE}/configs/${type}.json`)
      const books = raw.map(normalizeBook)
      categoryCache.set(type, books)
      return books
    }),
  )
  return loaded.flat()
}

export function loadBookLists(): Promise<BookList[]> {
  if (bookListsCache) return Promise.resolve(bookListsCache)
  return fetchJSON<{ bookLists: BookList[] }>(`${RESOURCE_BASE}/configs/booklists.json`).then((data) => {
    bookListsCache = data.bookLists
    return data.bookLists
  })
}

export function clearCache(): void {
  categoryCache.clear()
  indexCache = null
  bookListsCache = null
}

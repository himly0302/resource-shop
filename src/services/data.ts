import Taro from '@tarojs/taro'
import { CONFIGS_URL, INDEX_URL } from '@/constants/cdn'

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

export interface Configs {
  [category: string]: string
}

const categoryCache = new Map<string, Book[]>()
let configsCache: Configs | null = null
let indexCache: CategoryIndex[] | null = null

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await Taro.request({ url, method: 'GET' })
  if (res.statusCode !== 200) {
    throw new Error(`请求失败: ${res.statusCode}`)
  }
  return res.data as T
}

export async function loadConfigs(): Promise<Configs> {
  if (configsCache) return configsCache
  configsCache = await fetchJSON<Configs>(CONFIGS_URL)
  return configsCache!
}

export async function loadIndex(): Promise<CategoryIndex[]> {
  if (indexCache) return indexCache
  indexCache = await fetchJSON<CategoryIndex[]>(INDEX_URL)
  return indexCache!
}

export async function loadCategory(type: string): Promise<Book[]> {
  if (categoryCache.has(type)) return categoryCache.get(type)!
  const configs = await loadConfigs()
  const url = configs[type]
  if (!url) throw new Error(`未找到分类: ${type}`)
  const books = await fetchJSON<Book[]>(url)
  categoryCache.set(type, books)
  return books
}

export async function loadAllCategories(): Promise<Book[]> {
  const configs = await loadConfigs()
  const types = Object.keys(configs)
  const loaded: Book[][] = await Promise.all(
    types.map(async (type) => {
      if (categoryCache.has(type)) return categoryCache.get(type)!
      const books = await fetchJSON<Book[]>(configs[type])
      categoryCache.set(type, books)
      return books
    }),
  )
  return loaded.flat()
}

export function clearCache(): void {
  categoryCache.clear()
  configsCache = null
  indexCache = null
}

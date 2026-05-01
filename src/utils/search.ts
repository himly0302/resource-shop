import type { Book } from '@/services/data'

export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

export function filterBooks(books: Book[], keyword: string): Book[] {
  const lower = keyword.toLowerCase()
  return books.filter(
    (book) =>
      book.name.toLowerCase().includes(lower) ||
      book.author.toLowerCase().includes(lower),
  )
}

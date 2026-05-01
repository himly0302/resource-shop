import { useState, useEffect } from 'react'
import { loadCategory } from '@/services/data'
import type { Book } from '@/services/data'
import { PAGE_SIZE } from '@/constants/cdn'

export function useCategory(type: string) {
  const [books, setBooks] = useState<Book[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    setPage(1)

    loadCategory(type)
      .then((data) => {
        if (!cancelled) {
          setBooks(data)
          setHasMore(data.length > PAGE_SIZE)
        }
      })
      .catch((e) => {
        if (!cancelled) setError((e as Error).message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [type])

  const displayedBooks = books.slice(0, page * PAGE_SIZE)

  const loadMore = () => {
    if (!hasMore || loading) return
    const nextPage = page + 1
    if (nextPage * PAGE_SIZE >= books.length) {
      setHasMore(false)
    }
    setPage(nextPage)
  }

  return { books: displayedBooks, loading, error, hasMore, loadMore }
}

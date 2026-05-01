import { useState, useRef, useCallback } from 'react'
import { loadAllCategories } from '@/services/data'
import type { Book } from '@/services/data'
import { filterBooks, debounce } from '@/utils/search'
import { getErrorMessage } from '@/utils/error'
import { MIN_SEARCH_LENGTH, SEARCH_DEBOUNCE_MS } from '@/constants/cdn'

export function useSearch() {
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const allBooksRef = useRef<Book[]>([])

  const doSearch = useCallback(async (kw: string) => {
    if (kw.length < MIN_SEARCH_LENGTH) {
      setResults([])
      return
    }
    setLoading(true)
    setError(null)
    try {
      if (allBooksRef.current.length === 0) {
        allBooksRef.current = await loadAllCategories()
      }
      setResults(filterBooks(allBooksRef.current, kw))
    } catch (e) {
      setError(getErrorMessage(e))
    } finally {
      setLoading(false)
    }
  }, [])

  const debouncedSearch = useRef(debounce(doSearch, SEARCH_DEBOUNCE_MS)).current

  const search = (kw: string) => {
    setKeyword(kw)
    debouncedSearch(kw)
  }

  const clear = () => {
    setKeyword('')
    setResults([])
    setError(null)
  }

  return { keyword, results, loading, error, search, clear }
}

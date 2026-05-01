import { useState, useCallback } from 'react'
import Taro from '@tarojs/taro'
import { STORAGE_KEYS, MAX_HISTORY } from '@/constants/cdn'

export function useHistory() {
  const [history, setHistory] = useState<string[]>(() => {
    try {
      return Taro.getStorageSync(STORAGE_KEYS.history) || []
    } catch {
      return []
    }
  })

  const add = useCallback((bookId: string) => {
    setHistory((prev) => {
      const filtered = prev.filter((id) => id !== bookId)
      const next = [bookId, ...filtered].slice(0, MAX_HISTORY)
      Taro.setStorageSync(STORAGE_KEYS.history, next)
      return next
    })
  }, [])

  const clear = useCallback(() => {
    setHistory([])
    Taro.removeStorageSync(STORAGE_KEYS.history)
  }, [])

  return { history, add, clear }
}

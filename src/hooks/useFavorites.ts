import { useState, useCallback } from 'react'
import Taro from '@tarojs/taro'
import { STORAGE_KEYS, MAX_FAVORITES } from '@/constants/cdn'

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return Taro.getStorageSync(STORAGE_KEYS.favorites) || []
    } catch {
      return []
    }
  })

  const save = (list: string[]) => {
    setFavorites(list)
    Taro.setStorageSync(STORAGE_KEYS.favorites, list)
  }

  const toggle = useCallback((bookId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(bookId)
      if (exists) {
        const next = prev.filter((id) => id !== bookId)
        Taro.setStorageSync(STORAGE_KEYS.favorites, next)
        Taro.showToast({ title: '已取消收藏', icon: 'none', duration: 1500 })
        return next
      }
      if (prev.length >= MAX_FAVORITES) {
        Taro.showToast({ title: `收藏上限 ${MAX_FAVORITES} 本`, icon: 'none', duration: 1500 })
        return prev
      }
      const next = [...prev, bookId]
      Taro.setStorageSync(STORAGE_KEYS.favorites, next)
      Taro.showToast({ title: '已收藏', icon: 'none', duration: 1500 })
      return next
    })
  }, [])

  const isFavorite = useCallback(
    (bookId: string) => favorites.includes(bookId),
    [favorites],
  )

  return { favorites, toggle, isFavorite }
}

import { View, Text } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useState, useEffect, useCallback } from 'react'
import { loadAllCategories } from '@/services/data'
import type { Book } from '@/services/data'
import { useFavorites } from '@/hooks/useFavorites'
import BookCard from '@/components/BookCard'
import ErrorView from '@/components/ErrorView'
import { SkeletonBookCard } from '@/components/Skeleton'
import { getErrorMessage } from '@/utils/error'
import './index.scss'

export default function FavoritesPage() {
  const { favorites, isFavorite } = useFavorites()
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadBooks = useCallback(async () => {
    if (favorites.length === 0) {
      setBooks([])
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const all = await loadAllCategories()
      const favSet = new Set(favorites)
      setBooks(all.filter((b) => favSet.has(b.id)))
    } catch (e) {
      setError(getErrorMessage(e))
    } finally {
      setLoading(false)
    }
  }, [favorites])

  useEffect(() => {
    loadBooks()
  }, [loadBooks])

  const goToDetail = (book: Book) => {
    Taro.navigateTo({ url: `/pages/detail/index?id=${encodeURIComponent(book.id)}&type=${encodeURIComponent(book.type)}` })
  }

  return (
    <View className="favorites-page">
      {loading ? (
        <View className="favorites-page__list"><SkeletonBookCard count={3} /></View>
      ) : error ? (
        <ErrorView onRetry={loadBooks} />
      ) : books.length === 0 ? (
        <View className="favorites-page__empty">
          <Text>还没有收藏书籍</Text>
          <Text className="favorites-page__empty-sub">浏览书籍时点击 ♡ 即可收藏</Text>
        </View>
      ) : (
        <View className="favorites-page__list">
          {books.map((book) => (
            <BookCard key={book.id} book={book} onClick={goToDetail} />
          ))}
        </View>
      )}
    </View>
  )
}

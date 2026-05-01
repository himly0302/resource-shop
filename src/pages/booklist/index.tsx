import { View, Text } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useState, useEffect, useCallback } from 'react'
import { loadCategory } from '@/services/data'
import type { Book } from '@/services/data'
import { BOOK_LISTS } from '@/constants/booklists'
import { PAGE_SIZE } from '@/constants/cdn'
import BookCard from '@/components/BookCard'
import ErrorView from '@/components/ErrorView'
import { SkeletonBookCard } from '@/components/Skeleton'
import { getErrorMessage } from '@/utils/error'
import './index.scss'

export default function BookListPage() {
  const router = useRouter()
  const id = router.params.id || ''
  const bookList = BOOK_LISTS.find((bl) => bl.id === id)

  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const loadBooks = useCallback(async () => {
    if (!bookList) {
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const types = [...new Set(bookList.books.map((b) => b.type))]
      const idSet = new Set(bookList.books.map((b) => b.id))
      const loaded = await Promise.all(types.map((t) => loadCategory(t)))
      setBooks(loaded.flat().filter((b) => idSet.has(b.id)))
    } catch (e) {
      setError(getErrorMessage(e))
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    loadBooks()
  }, [loadBooks])

  const goToDetail = (book: Book) => {
    Taro.navigateTo({ url: `/pages/detail/index?id=${encodeURIComponent(book.id)}&type=${encodeURIComponent(book.type)}` })
  }

  const loadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE)
  }

  const visibleBooks = books.slice(0, visibleCount)
  const hasMore = visibleCount < books.length

  if (!bookList) {
    return (
      <View className="booklist-page">
        <Text className="booklist-page__hint">书单不存在</Text>
      </View>
    )
  }

  return (
    <View className="booklist-page">
      <View className="booklist-page__info">
        <Text className="booklist-page__title">{bookList.title}</Text>
        <Text className="booklist-page__desc">{bookList.description}</Text>
        <Text className="booklist-page__meta">共 {bookList.books.length} 本</Text>
      </View>

      {loading ? (
        <View className="booklist-page__list"><SkeletonBookCard count={3} /></View>
      ) : error ? (
        <ErrorView onRetry={loadBooks} />
      ) : books.length === 0 ? (
        <View className="booklist-page__empty">
          <Text>暂无书籍</Text>
        </View>
      ) : (
        <View className="booklist-page__list">
          {visibleBooks.map((book) => (
            <BookCard key={book.id} book={book} onClick={goToDetail} />
          ))}
          {hasMore ? (
            <Text className="booklist-page__more" onClick={loadMore}>加载更多</Text>
          ) : (
            <Text className="booklist-page__hint">已全部加载</Text>
          )}
        </View>
      )}
    </View>
  )
}

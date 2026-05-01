import { View, Text } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { loadAllCategories } from '@/services/data'
import type { Book } from '@/services/data'
import { BOOK_LISTS } from '@/constants/booklists'
import { PAGE_SIZE } from '@/constants/cdn'
import BookCard from '@/components/BookCard'
import './index.scss'

export default function BookListPage() {
  const router = useRouter()
  const id = router.params.id || ''
  const bookList = BOOK_LISTS.find((bl) => bl.id === id)

  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  useEffect(() => {
    if (!bookList) {
      setLoading(false)
      return
    }

    const load = async () => {
      try {
        const all = await loadAllCategories()
        const idSet = new Set(bookList.bookIds)
        setBooks(all.filter((b) => idSet.has(b.id)))
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [id])

  const goToDetail = (book: Book) => {
    Taro.navigateTo({ url: `/pages/detail/index?id=${encodeURIComponent(book.id)}` })
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
        <Text className="booklist-page__meta">共 {bookList.bookIds.length} 本</Text>
      </View>

      {loading ? (
        <Text className="booklist-page__hint">加载中...</Text>
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

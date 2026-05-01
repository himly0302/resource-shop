import { View, Text } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import BookCard from '@/components/BookCard'
import { useCategory } from '@/hooks/useCategory'
import './index.scss'

export default function CategoryPage() {
  const router = useRouter()
  const type = decodeURIComponent(router.params.type || '')
  const { books, loading, error, hasMore, loadMore } = useCategory(type)

  const goToDetail = (bookId: string) => {
    Taro.navigateTo({ url: `/pages/detail/index?id=${encodeURIComponent(bookId)}` })
  }

  return (
    <View className="category-page">
      {loading ? (
        <Text className="category-page__hint">加载中...</Text>
      ) : error ? (
        <Text className="category-page__hint">加载失败</Text>
      ) : (
        <View className="category-page__list">
          {books.map((book) => (
            <BookCard key={book.id} book={book} onClick={(b) => goToDetail(b.id)} />
          ))}
          {hasMore ? (
            <Text className="category-page__more" onClick={loadMore}>加载更多</Text>
          ) : (
            <Text className="category-page__hint">已全部加载</Text>
          )}
        </View>
      )}
    </View>
  )
}

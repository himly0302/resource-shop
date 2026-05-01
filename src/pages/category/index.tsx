import { View, Text } from '@tarojs/components'
import { useState, useEffect } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
import BookCard from '@/components/BookCard'
import ErrorView from '@/components/ErrorView'
import { SkeletonBookCard } from '@/components/Skeleton'
import { useCategory } from '@/hooks/useCategory'
import './index.scss'

export default function CategoryPage() {
  const router = useRouter()
  const type = decodeURIComponent(router.params.type || '')
  const { books, loading, error, hasMore, loadMore, retry } = useCategory(type)

  useEffect(() => {
    if (type) Taro.setNavigationBarTitle({ title: type })
  }, [type])

  const goToDetail = (bookId: string) => {
    Taro.navigateTo({ url: `/pages/detail/index?id=${encodeURIComponent(bookId)}&type=${encodeURIComponent(type)}` })
  }

  return (
    <View className="category-page">
      {loading ? (
        <View className="category-page__list"><SkeletonBookCard count={4} /></View>
      ) : error ? (
        <ErrorView onRetry={retry} />
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

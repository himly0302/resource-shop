import { View, Text, ScrollView, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import SearchBar from '@/components/SearchBar'
import CategoryCard from '@/components/CategoryCard'
import BookCard from '@/components/BookCard'
import BookListCard from '@/components/BookListCard'
import ErrorView from '@/components/ErrorView'
import { SkeletonCategoryGrid, SkeletonBookCard } from '@/components/Skeleton'
import { useConfigs } from '@/hooks/useConfigs'
import { useSearch } from '@/hooks/useSearch'
import { useFavorites } from '@/hooks/useFavorites'
import { useHistory } from '@/hooks/useHistory'
import { MIN_SEARCH_LENGTH } from '@/constants/cdn'
import { loadBookLists } from '@/services/data'
import type { BookList } from '@/constants/booklists'
import './index.scss'

export default function IndexPage() {
  const { index, loading, error, refresh } = useConfigs()
  const { keyword, results, loading: searchLoading, error: searchError, search, clear } = useSearch()
  const { history, clear: clearHistory } = useHistory()
  const { favorites } = useFavorites()
  const [bookLists, setBookLists] = useState<BookList[]>([])

  useEffect(() => {
    loadBookLists().then(setBookLists).catch(() => {})
  }, [])

  const goToCategory = (type: string) => {
    Taro.navigateTo({ url: `/pages/category/index?type=${encodeURIComponent(type)}` })
  }

  const goToDetail = (bookId: string, bookType?: string) => {
    const base = `/pages/detail/index?id=${encodeURIComponent(bookId)}`
    const url = bookType ? `${base}&type=${encodeURIComponent(bookType)}` : base
    Taro.navigateTo({ url })
  }

  const goToBookList = (id: string) => {
    Taro.navigateTo({ url: `/pages/booklist/index?id=${encodeURIComponent(id)}` })
  }

  const inSearchMode = keyword.length > 0
  const recentHistory = history.slice(0, 10)
  const showRecent = recentHistory.length >= 5

  return (
    <View className="index-page">
      <View className="index-page__header">
        <View className="index-page__header-row">
          <Text className="index-page__title">免费图书</Text>
          <View className="index-page__fav-entry" onClick={() => Taro.navigateTo({ url: '/pages/favorites/index' })}>
            <Text className="index-page__fav-icon">♡</Text>
            {favorites.length > 0 && (
              <Text className="index-page__fav-badge">{favorites.length}</Text>
            )}
          </View>
        </View>
        <SearchBar value={keyword} onInput={search} onClear={clear} />
      </View>

      {inSearchMode ? (
        <View className="index-page__search-results">
          {keyword.length < MIN_SEARCH_LENGTH ? (
            <Text className="index-page__hint">请输入至少 {MIN_SEARCH_LENGTH} 个字符</Text>
          ) : searchLoading ? (
            <View className="index-page__search-skeleton"><SkeletonBookCard count={2} /></View>
          ) : searchError ? (
            <ErrorView message="搜索失败" />
          ) : results.length > 0 ? (
            results.map((book) => (
              <BookCard key={book.id} book={book} onClick={(b) => goToDetail(b.id, b.type)} />
            ))
          ) : (
            <View className="index-page__empty">
              <Text>未找到相关书籍</Text>
            </View>
          )}
        </View>
      ) : (
        <>
          {showRecent && (
            <View className="index-page__recent">
              <View className="index-page__recent-header">
                <Text className="index-page__recent-title">最近浏览</Text>
                <Text className="index-page__recent-clear" onClick={clearHistory}>清除</Text>
              </View>
              <ScrollView scrollX className="index-page__recent-scroll">
                {recentHistory.map((item) => (
                  <View
                    key={item.id}
                    className="index-page__recent-item"
                    onClick={() => goToDetail(item.id, item.type)}
                  >
                    <Image className="index-page__recent-cover" src={item.picUrl} mode="aspectFill" lazyLoad />
                    <Text className="index-page__recent-name">{item.name}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
          {bookLists.length > 0 && (
            <View className="index-page__booklists">
              <Text className="index-page__section-title">精选书单</Text>
              <ScrollView scrollX className="index-page__booklists-scroll">
                {bookLists.map((bl) => (
                  <BookListCard key={bl.id} bookList={bl} onClick={goToBookList} />
                ))}
              </ScrollView>
            </View>
          )}
          <View className="index-page__categories">
            {loading ? (
              <View className="index-page__categories"><SkeletonCategoryGrid /></View>
            ) : error ? (
              <View className="index-page__categories">
                <ErrorView onRetry={refresh} />
              </View>
            ) : (
              <View className="index-page__grid">
                {index.map((cat) => (
                  <CategoryCard
                    key={cat.type}
                    name={cat.type}
                    count={cat.count}
                    onClick={goToCategory}
                  />
                ))}
              </View>
            )}
          </View>
          <View className="index-page__disclaimer">
            <Text>本小程序仅供学习交流，资源来源于互联网</Text>
            <Text>如有侵权请联系 823088131@qq.com 删除</Text>
          </View>
        </>
      )}
    </View>
  )
}

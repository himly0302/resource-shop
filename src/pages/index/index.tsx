import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import SearchBar from '@/components/SearchBar'
import CategoryCard from '@/components/CategoryCard'
import BookCard from '@/components/BookCard'
import { useConfigs } from '@/hooks/useConfigs'
import { useSearch } from '@/hooks/useSearch'
import './index.scss'

export default function IndexPage() {
  const { index, loading, error, refresh } = useConfigs()
  const { keyword, results, loading: searchLoading, search, clear } = useSearch()

  const goToCategory = (type: string) => {
    Taro.navigateTo({ url: `/pages/category/index?type=${encodeURIComponent(type)}` })
  }

  const goToDetail = (bookId: string) => {
    Taro.navigateTo({ url: `/pages/detail/index?id=${encodeURIComponent(bookId)}` })
  }

  const showSearch = keyword.length >= 2

  return (
    <View className="index-page">
      <View className="index-page__header">
        <Text className="index-page__title">免费图书</Text>
        <SearchBar value={keyword} onInput={search} onClear={clear} />
      </View>

      {showSearch ? (
        <View className="index-page__search-results">
          {searchLoading ? (
            <Text className="index-page__hint">搜索中...</Text>
          ) : results.length > 0 ? (
            results.map((book) => (
              <BookCard key={book.id} book={book} onClick={(b) => goToDetail(b.id)} />
            ))
          ) : (
            <View className="index-page__empty">
              <Text>未找到相关书籍</Text>
            </View>
          )}
        </View>
      ) : (
        <View className="index-page__categories">
          {loading ? (
            <Text className="index-page__hint">加载中...</Text>
          ) : error ? (
            <View className="index-page__empty">
              <Text>加载失败</Text>
              <Text className="index-page__retry" onClick={refresh}>点击重试</Text>
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
      )}
    </View>
  )
}

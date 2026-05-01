import { View, Text, ScrollView, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import SearchBar from '@/components/SearchBar'
import CategoryCard from '@/components/CategoryCard'
import BookCard from '@/components/BookCard'
import BookListCard from '@/components/BookListCard'
import { useConfigs } from '@/hooks/useConfigs'
import { useSearch } from '@/hooks/useSearch'
import { useFavorites } from '@/hooks/useFavorites'
import { useHistory } from '@/hooks/useHistory'
import { MIN_SEARCH_LENGTH } from '@/constants/cdn'
import { BOOK_LISTS } from '@/constants/booklists'
import './index.scss'

export default function IndexPage() {
  const { index, loading, error, refresh } = useConfigs()
  const { keyword, results, loading: searchLoading, search, clear } = useSearch()
  const { history, clear: clearHistory } = useHistory()
  const { favorites } = useFavorites()

  const goToCategory = (type: string) => {
    Taro.navigateTo({ url: `/pages/category/index?type=${encodeURIComponent(type)}` })
  }

  const goToDetail = (bookId: string) => {
    Taro.navigateTo({ url: `/pages/detail/index?id=${encodeURIComponent(bookId)}` })
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
                    onClick={() => goToDetail(item.id)}
                  >
                    <Image className="index-page__recent-cover" src={item.picUrl} mode="aspectFill" lazyLoad />
                    <Text className="index-page__recent-name">{item.name}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
          <View className="index-page__booklists">
            <Text className="index-page__section-title">精选书单</Text>
            <ScrollView scrollX className="index-page__booklists-scroll">
              {BOOK_LISTS.map((bl) => (
                <BookListCard key={bl.id} bookList={bl} onClick={goToBookList} />
              ))}
            </ScrollView>
          </View>
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
        </>
      )}
    </View>
  )
}

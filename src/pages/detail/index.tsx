import { View, Text, Button } from '@tarojs/components'
import Taro, { useRouter, useShareAppMessage } from '@tarojs/taro'
import { useState, useEffect, useCallback } from 'react'
import { loadCategory, loadAllCategories } from '@/services/data'
import type { Book } from '@/services/data'
import { CATEGORY_COLORS, DETAIL_IMG_PARAMS } from '@/constants/cdn'
import { copyDownloadLink } from '@/utils/clipboard'
import { useFavorites } from '@/hooks/useFavorites'
import { useHistory } from '@/hooks/useHistory'
import SafeImage from '@/components/SafeImage'
import ErrorView from '@/components/ErrorView'
import { SkeletonDetail } from '@/components/Skeleton'
import { getErrorMessage } from '@/utils/error'
import './index.scss'

export default function DetailPage() {
  const router = useRouter()
  const id = router.params.id || ''
  const type = router.params.type ? decodeURIComponent(router.params.type) : ''
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toggle, isFavorite } = useFavorites()
  const { add } = useHistory()

  const loadBook = useCallback(async () => {
    if (!id) return
    setLoading(true)
    setError(null)
    try {
      if (type) {
        const books = await loadCategory(type)
        const target = books.find((b) => b.id === id)
        if (target) {
          setBook(target)
          add({ id: target.id, name: target.name, picUrl: target.picUrl, type: target.type })
        }
      } else {
        const all = await loadAllCategories()
        const target = all.find((b) => b.id === id)
        if (target) {
          setBook(target)
          add({ id: target.id, name: target.name, picUrl: target.picUrl, type: target.type })
        }
      }
    } catch (e) {
      setError(getErrorMessage(e))
    } finally {
      setLoading(false)
    }
  }, [id, type])

  useEffect(() => {
    loadBook()
  }, [loadBook])

  useShareAppMessage(() => {
    if (!book) return { title: '免费图书', path: '/pages/index/index' }
    return {
      title: `${book.name} - ${book.author}`,
      path: `/pages/detail/index?id=${book.id}&type=${encodeURIComponent(book.type)}`,
      imageUrl: book.picUrl,
    }
  })

  if (loading) {
    return (
      <View className="detail-page">
        <SkeletonDetail />
      </View>
    )
  }

  if (error) {
    return (
      <View className="detail-page">
        <ErrorView onRetry={loadBook} />
      </View>
    )
  }

  if (!book) {
    return (
      <View className="detail-page">
        <Text className="detail-page__hint">未找到该书籍</Text>
      </View>
    )
  }

  const color = CATEGORY_COLORS[book.type] || '#B2BEC3'

  return (
    <View className="detail-page">
      <View className="detail-page__body">
        <SafeImage
          className="detail-page__cover"
          src={book.picUrl + DETAIL_IMG_PARAMS}
          mode="aspectFit"
          lazyLoad
        />
        <Text className="detail-page__name">{book.name}</Text>
        <View className="detail-page__meta">
          <Text className="detail-page__author">{book.author}</Text>
          <View className="detail-page__tag" style={{ backgroundColor: color }}>
            <Text className="detail-page__tag-text">{book.type}</Text>
          </View>
        </View>
        {book.brief && (
          <View className="detail-page__section">
            <Text className="detail-page__section-title">简介</Text>
            <Text className="detail-page__brief">{book.brief}</Text>
          </View>
        )}
      </View>

      <View className="detail-page__footer">
        <View
          className="detail-page__fav"
          onClick={() => toggle(book.id)}
        >
          <Text>{isFavorite(book.id) ? '❤️' : '🤍'}</Text>
        </View>
        <Button className="detail-page__share-btn" openType="share">
          <Text className="detail-page__share-text">分享给好友</Text>
        </Button>
        <View className="detail-page__copy-btn" onClick={() => copyDownloadLink(book.bd_link)}>
          <Text className="detail-page__copy-text">复制下载链接</Text>
        </View>
      </View>
    </View>
  )
}

import { View, Image, Text } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { loadCategory } from '@/services/data'
import type { Book } from '@/services/data'
import { CATEGORY_COLORS, DETAIL_IMG_PARAMS, CONFIGS_URL } from '@/constants/cdn'
import { copyDownloadLink } from '@/utils/clipboard'
import { useFavorites } from '@/hooks/useFavorites'
import { useHistory } from '@/hooks/useHistory'
import './index.scss'

export default function DetailPage() {
  const router = useRouter()
  const id = router.params.id || ''
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const { toggle, isFavorite } = useFavorites()
  const { add } = useHistory()

  useEffect(() => {
    if (!id) return

    const load = async () => {
      try {
        const res = await Taro.request({ url: CONFIGS_URL })
        const configs = res.data as Record<string, string>
        const types = Object.keys(configs)

        for (const type of types) {
          const catRes = await Taro.request({ url: configs[type] })
          const books = catRes.data as Book[]
          const target = books.find((b) => b.id === id)
          if (target) {
            setBook(target)
            add(target.id)
            break
          }
        }
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [id])

  if (loading) {
    return (
      <View className="detail-page">
        <Text className="detail-page__hint">加载中...</Text>
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
        <Image
          className="detail-page__cover"
          src={book.picUrl + DETAIL_IMG_PARAMS}
          mode="aspectFit"
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
        <View className="detail-page__copy-btn" onClick={() => copyDownloadLink(book.bd_link)}>
          <Text className="detail-page__copy-text">复制下载链接</Text>
        </View>
      </View>
    </View>
  )
}

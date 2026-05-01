import { View, Text } from '@tarojs/components'
import SafeImage from '@/components/SafeImage'
import type { Book } from '@/services/data'
import { THUMB_PARAMS } from '@/constants/cdn'
import './index.scss'

interface BookCardProps {
  book: Book
  onClick: (book: Book) => void
  action?: React.ReactNode
}

export default function BookCard({ book, onClick, action }: BookCardProps) {
  return (
    <View className="book-card" onClick={() => onClick(book)}>
      <SafeImage
        className="book-card__cover"
        src={book.picUrl + THUMB_PARAMS}
        mode="aspectFill"
        lazyLoad
      />
      <View className="book-card__info">
        <Text className="book-card__name">{book.name}</Text>
        <Text className="book-card__author">{book.author}</Text>
        {book.brief && (
          <Text className="book-card__brief">{book.brief}</Text>
        )}
      </View>
      {action && <View className="book-card__action">{action}</View>}
    </View>
  )
}

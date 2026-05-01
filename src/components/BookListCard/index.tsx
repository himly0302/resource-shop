import { View, Text } from '@tarojs/components'
import type { BookList } from '@/constants/booklists'
import './index.scss'

interface BookListCardProps {
  bookList: BookList
  onClick: (id: string) => void
}

export default function BookListCard({ bookList, onClick }: BookListCardProps) {
  return (
    <View className="booklist-card" onClick={() => onClick(bookList.id)}>
      <View className="booklist-card__header">
        <Text className="booklist-card__title">{bookList.title}</Text>
        <Text className="booklist-card__count">{bookList.bookIds.length} 本</Text>
      </View>
      <Text className="booklist-card__desc">{bookList.description}</Text>
    </View>
  )
}

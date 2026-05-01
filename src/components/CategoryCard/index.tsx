import { View, Text } from '@tarojs/components'
import { CATEGORY_COLORS } from '@/constants/cdn'
import './index.scss'

interface CategoryCardProps {
  name: string
  count: number
  onClick: (name: string) => void
}

export default function CategoryCard({ name, count, onClick }: CategoryCardProps) {
  const color = CATEGORY_COLORS[name] || '#B2BEC3'

  return (
    <View
      className="category-card"
      style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
      onClick={() => onClick(name)}
    >
      <Text className="category-card__name">{name}</Text>
      <Text className="category-card__count">{count} 本</Text>
    </View>
  )
}

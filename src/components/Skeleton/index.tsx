import { View } from '@tarojs/components'

interface SkeletonBookCardProps {
  count?: number
}

export function SkeletonBookCard({ count = 1 }: SkeletonBookCardProps) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <View key={i} className="skeleton-book-card">
          <View className="skeleton__element skeleton-book-card__cover" />
          <View className="skeleton-book-card__info">
            <View className="skeleton__element skeleton-book-card__name" />
            <View className="skeleton__element skeleton-book-card__author" />
          </View>
        </View>
      ))}
    </>
  )
}

export function SkeletonCategoryGrid() {
  return (
    <View className="skeleton-category-grid">
      {Array.from({ length: 6 }, (_, i) => (
        <View key={i} className="skeleton__element skeleton-category-grid__cell" />
      ))}
    </View>
  )
}

export function SkeletonDetail() {
  return (
    <View className="skeleton-detail">
      <View className="skeleton__element skeleton-detail__cover" />
      <View className="skeleton__element skeleton-detail__title" />
      <View className="skeleton__element skeleton-detail__meta" />
    </View>
  )
}

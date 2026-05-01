import { View, Text } from '@tarojs/components'
import './index.scss'

interface ErrorViewProps {
  message?: string
  onRetry?: () => void
}

export default function ErrorView({ message = '加载失败', onRetry }: ErrorViewProps) {
  return (
    <View className="error-view">
      <Text>{message}</Text>
      {onRetry && (
        <Text className="error-view__retry" onClick={onRetry}>点击重试</Text>
      )}
    </View>
  )
}

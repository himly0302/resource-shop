import { View, Input, Text } from '@tarojs/components'
import './index.scss'

interface SearchBarProps {
  value: string
  placeholder?: string
  onInput: (value: string) => void
  onClear?: () => void
  onFocus?: () => void
  onBlur?: () => void
}

export default function SearchBar({
  value,
  placeholder = '搜索书名或作者',
  onInput,
  onClear,
  onFocus,
  onBlur,
}: SearchBarProps) {
  return (
    <View className="search-bar">
      <Text className="search-bar__icon">🔍</Text>
      <Input
        className="search-bar__input"
        value={value}
        placeholder={placeholder}
        placeholderClass="search-bar__placeholder"
        onInput={(e) => onInput(e.detail.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        confirmType="search"
      />
      {value && (
        <View className="search-bar__clear" onClick={onClear}>
          ✕
        </View>
      )}
    </View>
  )
}

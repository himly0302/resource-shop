/** 资源基础路径 */
export const RESOURCE_BASE = 'https://qn-cdn.windlliu.com/v1/books-shop'

/** CDN 域名前缀 */
const CDN_ORIGIN = 'https://qn-cdn.windlliu.com/v1'

/** 将相对路径转换为完整 URL */
export function resolveUrl(path: string): string {
  if (!path || path.startsWith('http')) return path
  return `${CDN_ORIGIN}/${path}`
}

/** 分类配色映射 */
export const CATEGORY_COLORS: Record<string, string> = {
  '文学': '#6C5CE7',
  '历史': '#E17055',
  '科技': '#00B894',
  '学术': '#0984E3',
  '心理': '#E84393',
  '经济': '#FDCB6E',
  '社会': '#00CEC9',
  '哲学': '#A29BFE',
  '艺术': '#FF6B6B',
  '管理': '#55E6C1',
  '传记': '#F8A5C2',
  '教育': '#74B9FF',
  '其他': '#B2BEC3',
  '政治': '#FD79A8',
  '军事': '#636E72',
  '医学': '#81ECEC',
}

/** 本地存储 Key */
export const STORAGE_KEYS = {
  favorites: 'favorites',
  history: 'history',
} as const

/** 分页大小 */
export const PAGE_SIZE = 20

/** 搜索最小字符数 */
export const MIN_SEARCH_LENGTH = 2

/** 搜索防抖时间(ms) */
export const SEARCH_DEBOUNCE_MS = 300

/** 收藏上限 */
export const MAX_FAVORITES = 100

/** 浏览历史上限 */
export const MAX_HISTORY = 50

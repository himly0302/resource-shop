/** CDN 基础路径 */
export const CDN_BASE = 'https://qn-cdn.windlliu.com/books-tidy/configs'

/** 分类汇总数据 */
export const INDEX_URL = `${CDN_BASE}/index.json`

/** 七牛云缩略图参数 */
export const THUMB_PARAMS = '?imageView2/2/w/200/h/280/q/85'

/** 详情页大图参数 */
export const DETAIL_IMG_PARAMS = '?imageView2/2/w/400/h/560/q/90'

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

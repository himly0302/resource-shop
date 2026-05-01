# Changelog

## [Unreleased]

### Fixed
- 详情页使用 `loadAllCategories` 替代原始 `Taro.request` 遍历，复用内存缓存，避免重复请求所有配置文件

## [0.3.0] - 2026-05-01

### Added
- **书单推荐**（P2）：首页精选书单横滑区域 + 书单详情页（`pages/booklist/index`）
  - 5 个编辑精选书单（世界文学经典、读历史知兴替、科普新视野、心灵成长、商业洞察）
  - 书单数据为静态配置（`src/constants/booklists.ts`），后续可扩展为远程配置

## [0.2.0] - 2026-05-01

### Fixed
- **搜索返回空结果**：`loadAllCategories` 遍历 configs 时误将 `index` 键当作分类加载，导致非 Book 数据混入结果，过滤报错
- **搜索体验优化**：输入即进入搜索模式，不足最小字符数时展示提示文案
- **浏览历史与收藏状态不刷新**：从详情页返回首页后历史和收藏角标不更新。Taro 页面栈机制下返回不触发组件重挂载，需通过 `useDidShow` 从 storage 重新同步数据

### Changed
- **CDN 协议环境区分**：开发环境 http，生产环境 https，通过 `defineConstants` 构建时注入 `CDN_PROTOCOL`

### Added
- **收藏页面**（`pages/favorites/index`）：展示本地收藏书籍列表，支持取消收藏

## [0.1.0] - 2026-05-01

### Added
- 项目初始化，Taro 4 + React 18 + TypeScript + NutUI + SCSS
- MVP 需求文档（`docs/requirements.md`）
- UI/UX 设计规范（`docs/ui-ux-spec.md`）
- 首页（分类网格 + 搜索 + 最近浏览）
- 分类列表页（前端分页，每页 20）
- 书籍详情页（复制下载链接、收藏、分享）
- 数据服务层：CDN 静态 JSON 三级缓存（configs → index → category）

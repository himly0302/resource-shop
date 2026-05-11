# Changelog

## [Unreleased]

### Changed
- **移除 CONFIGS_URL 冗余配置**：分类数据 URL 改为直接拼接 `CDN_BASE/{type}.json`，减少一次网络请求
  - 相关文件：`src/constants/cdn.ts`、`src/services/data.ts`、`src/hooks/useConfigs.ts`
- **下载链接复制优化**：复制带提取码的完整 URL（`?pwd=xxx`），简化引导面板为一步操作
  - 相关文件：`src/utils/clipboard.ts`、`src/pages/detail/index.tsx`

### Fixed
- 补充缺失的 `src/index.html` 模板文件，修复 H5 模式页面只显示 `~ /` 而无内容的问题
- 补充缺失的 `@pmmmwh/react-refresh-webpack-plugin` 依赖，修复 H5 开发模式启动报 MODULE_NOT_FOUND 错误
- 详情页携带 `type` 参数，优先 `loadCategory(type)` 单分类加载，避免加载全部数据
- 浏览历史记录增加 `type` 字段，支持从历史跳转时走单分类加载
- 书单配置增加每本书的分类信息，书单详情页按需加载涉及分类而非全量
- 修复网络错误时分类页显示"加载更多"而非错误提示（Taro 抛出非标准 Error 对象导致 error 为 undefined）

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

# Changelog

## [Unreleased]

### Fixed
- **搜索功能修复**：搜索返回空结果的问题。`loadAllCategories` 遍历 configs 时误将 `index` 键当作分类加载，导致 `index.json` 的非 Book 数据混入结果，过滤时报错

### Changed
- **CDN 协议环境区分**：开发环境使用 http，生产环境使用 https
  - 通过 defineConstants 构建时注入 CDN_PROTOCOL
  - 相关文件：`config/dev.ts`、`config/prod.ts`、`src/constants/cdn.ts`

## [0.1.0] - 2026-05-01
### Added
- 项目初始化
- MVP 需求文档
- UI/UX 设计规范

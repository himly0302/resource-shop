# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

```bash
npm run dev:weapp     # 开发模式（微信小程序 + watch）
npm run build:weapp   # 生产构建（微信小程序）
npm run dev:h5        # 开发模式（H5 + watch）
```

构建产物输出到 `dist/`，用微信开发者工具指向该目录预览。

## Architecture

**无后端架构**：所有书籍数据来自七牛云 CDN 静态 JSON 文件，通过 `src/services/data.ts` 按需加载并缓存在内存中。

**数据流**：
- `src/constants/cdn.ts` 定义 CDN_BASE 及所有 URL 常量
- `src/services/data.ts` 通过 `Taro.request` 获取 JSON，三级缓存（configs → index → category）
- 5 个 hooks 封装具体业务逻辑（加载、搜索、收藏、历史）
- 页面和组件只消费 hooks 返回的数据

**路由**：5 个页面，在 `src/app.config.ts` 中注册：
- `pages/index/index` — 首页（分类网格 + 搜索 + 最近浏览 + 精选书单）
- `pages/category/index?type=xxx` — 分类列表（前端分页，每页 20）
- `pages/detail/index?id=xxx` — 书籍详情（复制链接、收藏、分享）
- `pages/favorites/index` — 收藏列表（取消收藏）
- `pages/booklist/index?id=xxx` — 书单详情（静态配置的编辑精选书单）

**工具函数**（`src/utils/`）：
- `clipboard.ts` — 解析百度网盘链接并复制到剪贴板
- `search.ts` — debounce 工具和书籍关键词过滤

**路径别名**：`@/*` → `src/*`，tsconfig 和 webpack 均已配置。

## Styling

SCSS 全局变量通过 `sass.data` 自动注入到每个 SCSS 文件：`@use "@/assets/styles/variables.scss" as *`。组件和页面的 SCSS 中可直接使用 `$color-primary`、`$spacing-md` 等变量，无需手动 import。

设计规范见 `docs/ui-ux-spec.md`（配色、字体、间距、组件规范）。

## Key Conventions

- **CDN 域名**：开发环境用 http，正式环境用 https。协议通过 `config/dev.ts` 和 `config/prod.ts` 的 `defineConstants` 注入
- **本地存储**：收藏和浏览历史使用 `Taro.setStorageSync`，Key 定义在 `STORAGE_KEYS`
- **页面返回状态同步**：读取 storage 的 hooks（`useHistory`、`useFavorites`）必须使用 `useDidShow` 在页面重新显示时从 storage 同步数据，因为 Taro 小程序页面栈返回不触发组件重挂载
- **组件结构**：每个组件一个目录，包含 `index.tsx` + `index.scss`
- **页面结构**：每个页面一个目录，包含 `index.tsx` + `index.scss` + `index.config.ts`

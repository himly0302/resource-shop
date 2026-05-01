# 免费图书分享

一个简洁的免费电子书浏览与下载微信小程序，帮助用户快速找到想要的书籍并获取下载链接。

## 核心功能

- **分类浏览** — 多分类书籍网格展示，点击进入分类列表
- **搜索** — 按书名/作者快速检索，支持防抖
- **复制下载链接** — 一键复制百度网盘链接和提取码
- **收藏** — 本地收藏喜欢的书籍，独立收藏页面管理
- **分享** — 分享书籍给微信好友
- **浏览历史** — 自动记录浏览过的书籍，首页展示最近 10 条
- **书单推荐** — 编辑精选书单，一键浏览推荐好书

## 技术栈

Taro 4 + React 18 + TypeScript + NutUI-React + SCSS

**数据架构**：无后端，所有书籍数据来自七牛云 CDN 静态 JSON 文件，客户端按需加载并缓存。

## 开发

```bash
npm install
npm run dev:weapp     # 微信小程序开发模式
npm run build:weapp   # 微信小程序生产构建
npm run dev:h5        # H5 开发模式
```

构建产物输出到 `dist/`，用微信开发者工具指向该目录预览。

## 文档

- [需求文档](docs/requirements.md)
- [UI/UX 设计规范](docs/ui-ux-spec.md)
- [更新日志](CHANGELOG.md)

## 项目结构

```
src/
├── assets/styles/    # SCSS 全局变量
├── components/       # 公共组件（BookCard, CategoryCard, BookListCard, SearchBar）
├── constants/        # CDN URL、存储 Key、书单配置、分页等常量
├── hooks/            # 业务 hooks（configs, category, search, history, favorites）
├── pages/            # 页面（index, category, detail, favorites, booklist）
├── services/         # 数据加载与缓存
└── utils/            # 工具函数（剪贴板、搜索）
```

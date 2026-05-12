# H5 兼容性适配 - 功能开发文档

> 生成时间：2026-05-12
> 基于项目：resource-shop（免费图书分享）
> 优先级：P0

---

## 1. 开发上下文

**技术栈**：Taro v4.0.9 + React + TypeScript + SCSS + Webpack5，无后端（CDN 静态数据）
**关联模块**：
- 详情页（`src/pages/detail/index.tsx`、`src/pages/detail/index.scss`）
- 搜索栏组件（`src/components/SearchBar/index.tsx`、`src/components/SearchBar/index.scss`）
- CDN 常量（`src/constants/cdn.ts`）
**现有 UI 规范**：`docs/ui-ux-spec.md`（当前仅针对微信小程序 750rpx 固定宽度设计，第 6 章明确标注"H5 适配时再补充"）

**当前状态**：项目原为纯微信小程序设计，所有代码未做平台判断。`process.env.TARO_ENV` 在项目中尚未被使用。

---

## 2. 验收标准

- [ ] 微信小程序端所有功能正常，视觉无变化（回归验证）
- [ ] H5 端详情页不显示"分享"按钮，布局自然填充
- [ ] H5 端详情页类型标签（如"文学"、"历史"）视觉垂直居中，与作者文字对齐
- [ ] H5 端首页搜索栏的🔍图标与输入文字垂直居中对齐
- [ ] H5 端搜索栏输入内容后只显示 1 个清除按钮（✕），不出现浏览器原生清除图标
- [ ] H5 端 `npm run build:h5` 构建无报错，`npm run dev:h5` 页面功能正常

---

## 3. 开发方案

### 3.1 数据模型改动

不涉及

### 3.2 API 改动

不涉及

### 3.3 UI 改动

| 问题 | 改动内容 | 影响范围 |
|------|---------|---------|
| 分享按钮 H5 无效 | `process.env.TARO_ENV !== 'h5'` 条件渲染 | `detail/index.tsx` |
| 类型标签未居中 | `detail-page__tag` 添加 flex 居中 + line-height | `detail/index.scss` |
| 搜索栏图标对齐 | `search-bar__icon` 添加 line-height 修正 | `SearchBar/index.scss` |
| 搜索栏双 ✕ | CSS 隐藏 H5 原生 input 清除按钮 | `SearchBar/index.scss` |

### 3.4 文件清单

- 修改：`src/pages/detail/index.tsx` — H5 端条件隐藏分享按钮
- 修改：`src/pages/detail/index.scss` — 类型标签垂直居中
- 修改：`src/components/SearchBar/index.scss` — 图标对齐 + 隐藏原生清除按钮

### 3.5 新增依赖

无

---

## 4. 实施步骤

**步骤 1：详情页分享按钮条件渲染**

- [ ] 在 `src/pages/detail/index.tsx` 中，将分享按钮包裹在 `process.env.TARO_ENV !== 'h5'` 条件内：
  ```tsx
  {process.env.TARO_ENV !== 'h5' && (
    <Button className="detail-page__share-btn" openType="share">
      <Text className="detail-page__share-text">分享</Text>
    </Button>
  )}
  ```

**步骤 2：类型标签垂直居中**

- [ ] 在 `src/pages/detail/index.scss` 的 `&__tag` 中添加：
  ```scss
  &__tag {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    padding: 4rpx 16rpx;
    border-radius: 20rpx;
  }
  ```

**步骤 3：搜索栏图标对齐**

- [ ] 在 `src/components/SearchBar/index.scss` 的 `&__icon` 中添加：
  ```scss
  &__icon {
    font-size: 28rpx;
    flex-shrink: 0;
    margin-right: $spacing-xs;
    line-height: 1;
    display: flex;
    align-items: center;
  }
  ```

**步骤 4：隐藏 H5 原生 input 清除按钮**

- [ ] 在 `src/components/SearchBar/index.scss` 末尾添加：
  ```scss
  // H5: 隐藏浏览器原生 input 清除按钮，避免与自定义 ✕ 重复
  input::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
  input::-ms-clear {
    display: none;
  }
  ```

**步骤 5：验收检查**

- [ ] 微信小程序端 `npm run build:weapp` 构建无报错，在开发者工具中验证页面正常
- [ ] H5 端 `npm run dev:h5` 启动，浏览器验证 4 项验收标准全部通过
- [ ] 逐条对照"验收标准"章节，确认全部通过

---

## 5. 文档更新清单

**CHANGELOG.md**（在 `## [Unreleased]` 下添加）：

```markdown
### Fixed
- **H5 兼容性适配**：修复 H5 端 4 项兼容性问题
  - 详情页分享按钮在 H5 端隐藏（小程序专属功能）
  - 详情页类型标签垂直居中对齐
  - 搜索栏图标与文字垂直居中对齐
  - 搜索栏清除按钮去重（隐藏浏览器原生清除图标）
  - 相关文件：`detail/index.tsx`、`detail/index.scss`、`SearchBar/index.scss`
```

**README.md 更新清单**：

| section | 更新内容 |
|---------|---------|
| - | 不需要更新 |

**CLAUDE.md 更新清单**：

| section | 更新内容 |
|---------|---------|
| Key Conventions | 补充说明项目使用 `process.env.TARO_ENV` 做平台条件编译 |

---

## 6. 约束与风险

- **数据安全**：不涉及数据变更
- **兼容性**：`process.env.TARO_ENV` 是 Taro 编译时常量，打包时由 webpack 直接替换为字符串字面量（`'weapp'` / `'h5'`），不会增加运行时体积。各端构建产物互不影响
- **性能/安全**：纯 CSS/条件渲染改动，无性能风险

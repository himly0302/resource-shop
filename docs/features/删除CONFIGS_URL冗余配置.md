# 删除 CONFIGS_URL 冗余配置 - 功能开发文档

> 生成时间：2026-05-02
> 基于项目：books-shop（免费图书分享小程序）
> 优先级：P2

---

## 1. 开发上下文

**技术栈**：Taro 4 + React 18 + TypeScript + SCSS + NutUI + 七牛云 CDN
**关联模块**：
- CDN 常量（`src/constants/cdn.ts`）
- 数据服务（`src/services/data.ts`）
- 配置加载 hook（`src/hooks/useConfigs.ts`）
- 首页（`src/pages/index/index.tsx`）
- 搜索 hook（`src/hooks/useSearch.ts`）
- 收藏页（`src/pages/favorites/index.tsx`）
- 详情页（`src/pages/detail/index.tsx`）

**现状分析**：
- `configs.json` 是一个 `{"军事": "http://cdn.../军事.json"}` 的映射文件
- 所有 URL 遵循固定模式：`${CDN_BASE}/${分类名}.json`
- 该映射可被直接拼接替代，无需额外网络请求

---

## 2. 验收标准

- [ ] 删除 `CONFIGS_URL` 常量和 `configs.json` 相关网络请求
- [ ] `loadCategory(type)` 改为直接拼接 `${CDN_BASE}/${type}.json` 获取数据
- [ ] `loadAllCategories()` 改为先调 `loadIndex()` 获取分类列表，再逐个拼接 URL
- [ ] `useConfigs` hook 移除 `configs` 状态和 `loadConfigs()` 调用
- [ ] 首页分类网格正常加载和显示（回归）
- [ ] 分类列表页正常加载书籍（回归）
- [ ] 搜索功能正常（`loadAllCategories` 调用方不受影响）（回归）
- [ ] 收藏页正常（回归）
- [ ] 详情页"猜你喜欢"正常（回归）

---

## 3. 开发方案

### 3.1 数据层改动

删除 `Configs` 接口、`configsCache` 变量、`loadConfigs()` 函数。URL 直接拼接。

### 3.2 文件清单

- 修改：`src/constants/cdn.ts` — 删除 `CONFIGS_URL` 导出
- 修改：`src/services/data.ts` — 删除 `Configs`/`configsCache`/`loadConfigs()`，改造 `loadCategory()` 和 `loadAllCategories()`，更新 `clearCache()`
- 修改：`src/hooks/useConfigs.ts` — 移除 `configs` 状态和 `loadConfigs()` 调用，只保留 `loadIndex()`
- 修改：`src/pages/index/index.tsx` — 从 `useConfigs()` 解构中移除 `configs`（当前已未使用，无需改动）

### 3.3 新增依赖

无

---

## 4. 实施步骤

**步骤 1：修改 CDN 常量**
- [ ] 删除 `src/constants/cdn.ts` 中的 `CONFIGS_URL`

**步骤 2：改造数据服务**
- [ ] 删除 `Configs` 接口、`configsCache` 变量、`loadConfigs()` 函数
- [ ] 删除 `CONFIGS_URL` 导入，新增 `CDN_BASE` 导入
- [ ] `loadCategory(type)`：将 `const configs = await loadConfigs(); const url = configs[type]` 改为 `const url = \`${CDN_BASE}/${type}.json\``
- [ ] `loadAllCategories()`：将 `const configs = await loadConfigs()` 改为先 `const index = await loadIndex()`，从 index 获取 type 列表，URL 直接拼接
- [ ] `clearCache()` 中移除 `configsCache = null`

**步骤 3：更新 useConfigs hook**
- [ ] 移除 `loadConfigs` 导入和 `Configs` 类型导入
- [ ] 移除 `configs` / `setConfigs` 状态
- [ ] `refresh()` 中移除 `loadConfigs()` 调用，只保留 `loadIndex()`
- [ ] 返回值中移除 `configs`

**步骤 4：回归验证**
- [ ] 首页分类网格加载正常
- [ ] 点击分类进入列表页，书籍正常加载
- [ ] 搜索功能正常
- [ ] 收藏页正常
- [ ] 详情页正常

---

## 5. 文档更新清单

**CHANGELOG.md**（在 `## [Unreleased]` 下添加）：

```markdown
### Changed
- **移除 CONFIGS_URL 冗余配置**：分类数据 URL 改为直接拼接 `CDN_BASE/{type}.json`，减少一次网络请求
  - 相关文件：`src/constants/cdn.ts`、`src/services/data.ts`、`src/hooks/useConfigs.ts`
```

**README.md 更新清单**：

不需要更新

**CLAUDE.md 更新清单**：

| section | 更新内容 |
|---------|---------|
| Architecture > 数据流 | 将"三级缓存（configs → index → category）"改为"两级缓存（index → category）"，删除 configs 相关描述 |

---

## 6. 约束与风险

- **数据兼容性**：需确认七牛 CDN 上所有分类 JSON 文件均遵循 `{CDN_BASE}/{分类名}.json` 的命名规则，无例外
- **网络请求**：改动后减少一次网络请求（无需先加载 configs.json），性能略有提升
- **向后兼容**：纯内部重构，无 API 变化，不影响用户

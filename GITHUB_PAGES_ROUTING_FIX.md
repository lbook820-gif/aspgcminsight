# GitHub Pages SPA路由404问题修复说明

## 问题描述

访问 `https://lbook820-gif.github.io/aspgcminsight/dpas` 时返回404错误。

## 问题原因

GitHub Pages默认不支持单页应用（SPA）的路由模式。当用户直接访问或刷新非根路径（如 `/dpas`）时，GitHub Pages会尝试查找对应的物理文件，但该文件不存在，因此返回404错误。

## 解决方案

采用 [spa-github-pages](https://github.com/rafgraph/spa-github-pages) 方案，通过404重定向和URL重写来支持SPA路由。

### 1. 更新Vite配置

**修改前**：
```typescript
export default defineConfig({
  base: './',  // 相对路径
  // ...
});
```

**修改后**：
```typescript
export default defineConfig({
  base: '/aspgcminsight/',  // GitHub Pages项目路径
  // ...
});
```

**原因**：
- 相对路径在GitHub Pages上会导致资源加载问题
- 需要使用绝对路径指向项目根目录

### 2. 添加404重定向页面

**文件位置**：`public/404.html`

**功能**：
- 捕获所有404请求
- 将路径转换为查询字符串
- 重定向到index.html

**核心代码**：
```javascript
var pathSegmentsToKeep = 1; // 保留仓库名称段

var l = window.location;
l.replace(
  l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
  l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
  l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
  (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
  l.hash
);
```

### 3. 添加URL重写脚本

**文件位置**：`index.html`

**功能**：
- 检查查询字符串中的重定向信息
- 将查询字符串还原为路径
- 使用 `history.replaceState` 更新URL

**核心代码**：
```javascript
var pathSegmentsToKeep = 1;

var l = window.location;
if (l.search[1] === '/') {
  var decoded = l.search.slice(1).split('&').map(function(s) {
    return s.replace(/~and~/g, '&')
  }).join('?');
  window.history.replaceState(null, null,
    l.pathname.slice(0, -1) + decoded +
    l.hash
  );
}
```

## 工作原理

### 正常访问流程

1. 用户访问 `https://lbook820-gif.github.io/aspgcminsight/`
2. GitHub Pages返回 `index.html`
3. React Router处理客户端路由

### 直接访问子路径流程

1. 用户访问 `https://lbook820-gif.github.io/aspgcminsight/dpas`
2. GitHub Pages找不到 `/dpas` 文件，返回 `404.html`
3. `404.html` 将URL转换为：
   ```
   https://lbook820-gif.github.io/aspgcminsight/?/dpas
   ```
4. 浏览器加载 `index.html`
5. `index.html` 中的脚本检测到查询字符串，还原为：
   ```
   https://lbook820-gif.github.io/aspgcminsight/dpas
   ```
6. React Router接管路由，渲染对应组件

## 支持的路由

修复后支持以下路由：

- ✅ `/` - 首页
- ✅ `/laws` - 法律法规页
- ✅ `/enforcement` - 执法动态页
- ✅ `/dpas` - 监管机构页

## 注意事项

### 1. pathSegmentsToKeep 设置

```javascript
var pathSegmentsToKeep = 1; // 保留仓库名称段
```

**说明**：
- 对于 `https://username.github.io/repo-name/` 格式，设置为1
- 对于 `https://username.github.io/` 格式，设置为0
- 对于自定义域名，设置为0

### 2. 构建产物

构建后会自动生成：
- `dist/index.html` - 包含重定向处理脚本
- `dist/404.html` - 404重定向页面
- `dist/assets/*` - 静态资源

### 3. 部署验证

部署后验证以下场景：
1. ✅ 直接访问根路径
2. ✅ 直接访问子路径
3. ✅ 刷新子路径页面
4. ✅ 使用浏览器前进/后退按钮
5. ✅ 分享链接给他人

## 替代方案

### 方案一：使用HashRouter

**优点**：
- 简单，无需额外配置
- 天然支持GitHub Pages

**缺点**：
- URL中有 `#` 号，不够优雅
- 不利于SEO

**实现**：
```typescript
import { HashRouter } from 'react-router-dom';

<HashRouter>
  <Routes>
    {/* 路由配置 */}
  </Routes>
</HashRouter>
```

### 方案二：使用自定义域名

**优点**：
- URL更简洁
- 完全控制路由

**缺点**：
- 需要购买域名
- 需要配置DNS

## 测试清单

- [x] 访问首页：`https://lbook820-gif.github.io/aspgcminsight/`
- [x] 访问法律法规页：`https://lbook820-gif.github.io/aspgcminsight/laws`
- [x] 访问执法动态页：`https://lbook820-gif.github.io/aspgcminsight/enforcement`
- [x] 访问监管机构页：`https://lbook820-gif.github.io/aspgcminsight/dpas`
- [x] 刷新任意页面
- [x] 使用浏览器前进/后退按钮
- [x] 分享链接给他人访问

## 参考资料

- [spa-github-pages](https://github.com/rafgraph/spa-github-pages)
- [GitHub Pages文档](https://docs.github.com/en/pages)
- [React Router文档](https://reactrouter.com/)
- [Vite配置文档](https://vitejs.dev/config/)

## 更新历史

- 2026-04-25：修复GitHub Pages SPA路由404问题
- 2026-04-25：添加404重定向和URL重写脚本
- 2026-04-25：更新Vite配置使用绝对路径

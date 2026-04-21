# GitHub 自动更新指南

## 方案概述

使用 **GitHub Actions** 实现每天自动更新新闻，完全免费且无需本地服务器。

---

## 快速设置（5分钟）

### 步骤 1：创建 GitHub 仓库

1. 访问 https://github.com/new
2. 仓库名称：`europe-app-ecosystem-insights`
3. 选择 **Private**（私有）
4. 点击 **Create repository**

### 步骤 2：上传代码

在您的仓库页面，点击 **"uploading an existing file"**，上传以下文件：

```
📁 需要上传的文件：
├── src/                    # 源代码
├── public/                 # 静态资源
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── .github/workflows/      # GitHub Actions 配置
    ├── deploy.yml
    └── auto-update-news.yml
```

或者使用命令行：

```bash
# 在您的项目目录中
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/europe-app-ecosystem-insights.git
git push -u origin main
```

### 步骤 3：启用 GitHub Pages

1. 进入仓库 **Settings** → **Pages**
2. **Source** 选择 **GitHub Actions**
3. 保存

### 步骤 4：配置定时任务

GitHub Actions 已经配置好，每天北京时间 08:00 会自动：
1. 检查是否有待处理的新闻
2. 自动构建网站
3. 部署到 GitHub Pages

---

## 添加新闻的两种方式

### 方式一：手动触发（推荐）

1. 进入 GitHub 仓库
2. 点击 **Actions** 标签
3. 选择 **Auto Update News** 工作流
4. 点击右侧 **Run workflow**
5. 填写新闻信息，点击 **Run workflow**

![手动触发示意图](https://docs.github.com/assets/images/actions-workflow-dispatch.png)

### 方式二：创建 pending_news.json

1. 在仓库中创建 `scripts/pending_news.json` 文件
2. 格式如下：

```json
[
  {
    "title": "新闻标题",
    "source": "Reuters",
    "sourceUrl": "https://example.com/news",
    "summary": "新闻摘要",
    "aiComment": {
      "overallImpact": "整体影响分析",
      "huaweiImpact": "对华为的影响分析"
    },
    "publishDate": "2026-04-05",
    "score": 7,
    "category": "appstore",
    "tags": ["苹果", "App Store"]
  }
]
```

3. 提交文件后，定时任务会自动处理

---

## 定时任务说明

### 自动执行时间

| 时间类型 | 执行时间 |
|---------|---------|
| UTC 时间 | 每天 00:00 |
| 北京时间 | 每天 08:00 |
| 纽约时间 | 每天 19:00 (前一天) |

### 执行流程

```
定时触发
    ↓
检出代码
    ↓
安装依赖 (npm ci)
    ↓
检查 pending_news.json
    ↓
如有新闻 → 添加到 newsData.ts
    ↓
构建网站 (npm run build)
    ↓
部署到 GitHub Pages
    ↓
完成！
```

---

## 查看执行日志

1. 进入 GitHub 仓库
2. 点击 **Actions** 标签
3. 点击任意工作流运行记录
4. 查看详细日志

---

## 常见问题

### Q: 定时任务没有执行？

GitHub Actions 对免费账户的定时任务有一些限制：
- 如果仓库 60 天无活动，定时任务会暂停
- 需要手动重新启用

**解决方法：**
- 定期手动触发一次工作流
- 或升级 GitHub Pro

### Q: 如何修改执行时间？

编辑 `.github/workflows/deploy.yml`：

```yaml
schedule:
  - cron: '0 0 * * *'    # 每天 UTC 00:00 (北京时间 08:00)
  - cron: '0 12 * * *'   # 每天 UTC 12:00 (北京时间 20:00)
```

### Q: 如何部署到其他平台？

修改 `.github/workflows/deploy.yml` 中的部署步骤：

**部署到 Vercel:**
```yaml
- name: Deploy to Vercel
  uses: amondnet/vercel-action@v25
  with:
    vercel-token: ${{ secrets.VERCEL_TOKEN }}
    vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
    vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

**部署到 Netlify:**
```yaml
- name: Deploy to Netlify
  uses: nwtgck/actions-netlify@v2.0
  with:
    publish-dir: './dist'
    production-deploy: true
  env:
    NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
    NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

## 备选方案

如果 GitHub Actions 不适合您，还可以使用：

### 方案 A：第三方定时任务服务

1. 注册 https://cron-job.org（免费）
2. 创建定时任务，调用您的更新接口
3. 或使用 Webhook 触发 GitHub Actions

### 方案 B：Kimi 定时任务（如果支持）

咨询 Kimi 是否提供定时任务功能。

### 方案 C：手动更新

每次找到新闻后，手动运行：

```bash
# 本地编辑 newsData.ts
# 然后提交到 GitHub
# GitHub Actions 会自动构建部署
git add .
git commit -m "Add news: xxx"
git push
```

---

## 需要帮助？

如有问题，请查看：
1. GitHub Actions 文档：https://docs.github.com/actions
2. 仓库的 Actions 页面查看执行日志

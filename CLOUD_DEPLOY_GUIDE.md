# 云端自动更新完整方案

## 推荐方案：GitHub + GitHub Actions（免费）

### 第一步：创建 GitHub 仓库

1. 打开 https://github.com/new
2. 填写仓库名称：`app-ecosystem-insights`
3. 选择 **Private**（私有仓库）
4. 点击 **Create repository**

### 第二步：上传代码

**方法一：网页上传（最简单）**

1. 在新仓库页面，点击 **"uploading an existing file"**
2. 拖拽或选择以下文件上传：
   - `src/` 文件夹
   - `index.html`
   - `package.json`
   - `vite.config.ts`
   - `tsconfig.json`
   - `tailwind.config.js`
   - `.github/workflows/` 文件夹
3. 点击 **Commit changes**

**方法二：命令行上传**

```bash
# 在项目目录中执行
cd /mnt/okcomputer/output/app

git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/app-ecosystem-insights.git
git push -u origin main
```

### 第三步：启用自动部署

1. 进入仓库 → **Settings** → **Pages**
2. **Build and deployment** → **Source**
3. 选择 **GitHub Actions**
4. 完成！

### 第四步：验证自动更新

每天北京时间 **08:00**，GitHub 会自动：
- ✅ 构建网站
- ✅ 部署到 GitHub Pages
- ✅ 您会收到邮件通知

---

## 添加新闻的 3 种方式

### 方式 1：GitHub 网页直接编辑（推荐）

1. 打开 GitHub 仓库
2. 找到 `src/data/newsData.ts`
3. 点击右上角 **铅笔图标**（Edit）
4. 复制最后一条新闻的格式，添加新新闻
5. 点击 **Commit changes**
6. 网站会在 1-2 分钟后自动更新

### 方式 2：手动触发工作流

1. 打开 GitHub 仓库 → **Actions** 标签
2. 点击 **Daily Build**
3. 点击右侧 **Run workflow** → **Run workflow**
4. 强制重新构建

### 方式 3：本地编辑后推送

```bash
# 编辑新闻
code src/data/newsData.ts

# 提交更改
git add .
git commit -m "Add: 苹果发布新政策"
git push
```

---

## 网站地址

部署完成后，您的网站地址将是：

```
https://你的用户名.github.io/app-ecosystem-insights/
```

---

## 备选方案

### 方案 A：Vercel（推荐，国内访问快）

1. 注册 https://vercel.com（可用 GitHub 账号登录）
2. 点击 **Add New Project**
3. 导入您的 GitHub 仓库
4. 框架预设选择 **Vite**
5. 点击 **Deploy**

**优点：**
- 国内访问速度快
- 自动部署
- 免费

### 方案 B：Netlify

1. 注册 https://netlify.com
2. 点击 **Add new site** → **Import an existing project**
3. 选择 GitHub 仓库
4. 构建设置：
   - Build command: `npm run build`
   - Publish directory: `dist`
5. 点击 **Deploy site**

### 方案 C：Cloudflare Pages

1. 注册 https://pages.cloudflare.com
2. 连接 GitHub 仓库
3. 构建设置：
   - Build command: `npm run build`
   - Build output: `dist`
4. 点击 **Save and Deploy**

---

## 定时任务问题

### GitHub Actions 定时任务可能不执行？

GitHub 对免费账户的定时任务有限制：
- 仓库 60 天无活动会暂停
- 需要手动重新启用

**解决方法：**

1. 每月手动触发一次工作流
2. 或使用第三方定时任务服务 ping 您的仓库

### 使用 cron-job.org 保持活跃（免费）

1. 注册 https://cron-job.org
2. 创建新任务：
   - Title: Keep GitHub Active
   - URL: `https://api.github.com/repos/你的用户名/app-ecosystem-insights`
   - Schedule: Every day at 07:00
3. 保存

---

## 快速检查清单

- [ ] 创建 GitHub 仓库
- [ ] 上传代码文件
- [ ] 启用 GitHub Pages
- [ ] 测试手动触发工作流
- [ ] 等待第二天 08:00 检查自动执行
- [ ] （可选）配置备用部署平台

---

## 需要帮助？

1. 查看 GitHub Actions 执行日志：仓库 → Actions
2. 检查构建错误：点击失败的工作流 → 查看日志
3. 参考文档：https://docs.github.com/actions

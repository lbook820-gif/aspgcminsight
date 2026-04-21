# ASPG Insight 工作流记录

## 每日自动更新流程

### 1. 新闻采集（由我执行）
- **时间**：每天北京时间 00:00（午夜）
- **方式**：OpenClaw Cron 任务（isolated session）
- **搜索关键词**（8组）：
  1. Apple App Store / iOS / App Store Connect 政策 / XChat
  2. Google Play / Android / Play Store 政策
  3. DMA / 欧盟数字市场法 / 反垄断
  4. Epic Games Store / 第三方应用商店 / 侧载
  5. Apple Maps / 地图广告 / 本地广告
  6. 即时通讯 / WhatsApp / Telegram / 隐私加密
  7. 开发者 / 佣金 / 支付 IAP / 第三方计费
  8. 应用生态 / 平台政策 / 监管合规

### 2. 内容生成
- 读取 `src/data/newsData.ts`，提取已有 sourceUrl 去重
- 对每条新发现的新闻，AI 生成：
  - `overallImpact`：整体行业影响分析
  - `huaweiImpact`：对华为的影响分析（**核心字段，必须生成**），提供深度扩展的多维度分析结果。
  - `score`：1-10 重要性评分
  - `category`：appstore / googleplay / dma / thirdparty / developer
  - `tags`：相关标签
- 新新闻追加到数组末尾，id 按最大+1递增
- **注意**：不收录纯华为产品报道，聚焦行业动态和监管政策

### 3. 构建与推送
- `npm install`（如 node_modules 不存在）
- `npm run build`（生成 dist/）
- `git add -A`
- `git commit -m "auto: daily news update YYYY-MM-DD"`
- `git push origin main`
- **如无新增新闻**：仅执行 `git pull` 后静默结束，不提交空更新

### 4. 自动部署（GitHub Actions）
- **触发**：main 分支推送时自动触发
- **工作流**：`.github/workflows/deploy.yml`
- **步骤**：
  1. checkout 代码
  2. setup Node.js 20
  3. `npm ci`
  4. `npm run build`
  5. 部署到 GitHub Pages
- **额外**：每天北京时间 08:00 也会自动构建一次（保底）
- **手动触发**：Actions 页面 → Build and Deploy → Run workflow

## 手动添加新闻（备用）
- **方式**：GitHub Actions 手动触发
- **工作流**：`.github/workflows/auto-update-news.yml`
- **入口**：Actions → Auto Update News → Run workflow
- **表单字段**：标题、链接、来源、摘要、整体影响、华为影响、分类、评分

## 相关路径
- 本地仓库：`/home/sandbox/.openclaw/workspace/repo/aspg-insight/`
- 远程仓库：`https://github.com/lbook820-gif/aspg-insight`
- 网站地址：`https://lbook820-gif.github.io/aspg-insight/`

## 定时任务信息
- **任务ID**：`5e03e870-b12c-4ba1-8068-105306a3f3bb`
- **任务名**：`aspg-insight-daily-update`
- **Cron**：`0 0 * * *` @ Asia/Shanghai
- **Session Target**：isolated
- **Thinking**：high
- **Timeout**：600秒

## 更新历史
- 2026-04-21：初始化工作流，添加3条华为生态新闻，设置定时任务
- 2026-04-21：优化关键词，新增XChat、Apple Maps广告等关键词，移除纯华为产品报道；深化华为影响分析

# 新闻自动更新系统使用指南

## 系统概述

本系统提供多种方式添加新闻到网站，支持定时自动更新和手动添加。

## 文件说明

```
scripts/
├── README.md                 # 详细说明文档
├── AUTO_UPDATE_GUIDE.md      # 本文件
├── crontab.config            # 定时任务配置示例
├── daily_news_check.py       # 每日新闻检查脚本
├── add_news_interactive.py   # 交互式添加工具
├── news_updater.py           # 命令行添加工具
├── auto_update_news.py       # 自动更新框架
├── setup_cron.sh             # 定时任务设置脚本
├── quick_add.sh              # 快速添加脚本
└── pending_news.json.example # 待处理新闻示例
```

## 快速开始

### 1. 设置定时任务（推荐）

```bash
cd /mnt/okcomputer/output/app/scripts
./setup_cron.sh
```

按提示选择定时任务设置方式即可。

### 2. 手动添加新闻

#### 方式一：交互式添加（推荐）

```bash
cd /mnt/okcomputer/output/app
python3 scripts/add_news_interactive.py
```

按提示输入新闻信息，脚本会自动构建网站。

#### 方式二：快速添加

```bash
cd /mnt/okcomputer/output/app/scripts
./quick_add.sh "新闻标题" "原文链接" "来源"
```

然后编辑 `pending_news.json` 补充详细信息，再运行：

```bash
python3 daily_news_check.py
```

#### 方式三：直接编辑数据文件

直接编辑 `src/data/newsData.ts` 文件，添加新闻条目后运行：

```bash
npm run build
```

## 定时任务说明

### 默认设置

- **执行时间**: 每天北京时间 08:00 (UTC 00:00)
- **执行内容**: 
  1. 检查 `scripts/pending_news.json` 文件
  2. 将新闻添加到 `src/data/newsData.ts`
  3. 自动构建网站

### 查看定时任务

```bash
# 查看当前用户的定时任务
crontab -l

# 查看日志
tail -f /mnt/okcomputer/output/app/logs/news_update.log
```

### 手动运行

```bash
# 运行每日检查
python3 /mnt/okcomputer/output/app/scripts/daily_news_check.py
```

## 新闻数据格式

```json
{
  "title": "新闻标题",
  "source": "新闻来源",
  "sourceUrl": "https://example.com/news",
  "summary": "新闻摘要",
  "aiComment": {
    "overallImpact": "整体影响分析",
    "huaweiImpact": "对华为的影响分析"
  },
  "publishDate": "2026-04-04",
  "score": 7,
  "category": "appstore",
  "tags": ["苹果", "App Store"]
}
```

### 分类说明

| 分类代码 | 说明 |
|---------|------|
| `dma` | DMA/数字市场法相关 |
| `appstore` | 苹果App Store相关 |
| `googleplay` | Google Play相关 |
| `thirdparty` | 第三方应用商店 |
| `huawei` | 华为相关 |
| `developer` | 开发者相关 |

### 评分标准

| 分数 | 说明 |
|-----|------|
| 9-10 | 重大政策变化/监管行动 |
| 7-8 | 重要产品更新/市场变化 |
| 5-6 | 一般新闻/常规更新 |
| 1-4 | 次要新闻 |

## 注意事项

1. **依赖安装**: 确保系统已安装 Python 3 和 Node.js
2. **权限设置**: 脚本需要执行权限，已自动设置
3. **日志查看**: 日志保存在 `logs/news_update.log`
4. **备份数据**: 建议定期备份 `src/data/newsData.ts`

## 故障排查

### 定时任务不执行

```bash
# 检查 crontab 是否正确设置
crontab -l | grep daily_news_check

# 检查脚本权限
ls -la scripts/daily_news_check.py

# 手动运行查看错误
python3 scripts/daily_news_check.py
```

### 构建失败

```bash
# 检查 Node.js 版本
node --version

# 重新安装依赖
npm install

# 手动构建查看错误
npm run build
```

## 高级用法

### 自定义搜索源

编辑 `daily_news_check.py`，在 `search_recent_news()` 函数中添加自定义搜索逻辑：

```python
def search_recent_news():
    # 调用新闻 API
    # 例如: NewsAPI, Google News API
    # 或使用爬虫抓取新闻网站
    pass
```

### 批量添加新闻

创建 `scripts/pending_news.json` 文件：

```json
[
  {
    "title": "新闻1",
    "source": "Source1",
    ...
  },
  {
    "title": "新闻2",
    "source": "Source2",
    ...
  }
]
```

然后运行：

```bash
python3 scripts/daily_news_check.py
```

## 联系支持

如有问题，请查看日志文件或联系开发者。

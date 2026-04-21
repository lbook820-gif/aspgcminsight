# 新闻自动更新系统

## 概述

本系统用于每天自动检索相关新闻并更新到网站中。

## 定时任务设置

### 1. 使用 Crontab (Linux/Mac)

```bash
# 编辑 crontab
crontab -e

# 添加以下行（每天北京时间 08:00 执行）
0 0 * * * cd /mnt/okcomputer/output/app && /usr/bin/python3 scripts/daily_news_check.py >> /mnt/okcomputer/output/app/logs/news_update.log 2>&1
```

### 2. 使用 systemd Timer (Linux)

创建服务文件 `/etc/systemd/system/news-update.service`:

```ini
[Unit]
Description=News Update Service
After=network.target

[Service]
Type=oneshot
WorkingDirectory=/mnt/okcomputer/output/app
ExecStart=/usr/bin/python3 scripts/daily_news_check.py
```

创建定时器文件 `/etc/systemd/system/news-update.timer`:

```ini
[Unit]
Description=Run News Update daily at 08:00 CST

[Timer]
OnCalendar=*-*-* 00:00:00
Persistent=true

[Install]
WantedBy=timers.target
```

启用并启动定时器:

```bash
sudo systemctl daemon-reload
sudo systemctl enable news-update.timer
sudo systemctl start news-update.timer
```

### 3. 使用 Windows 任务计划程序

1. 打开任务计划程序
2. 创建基本任务
3. 设置触发器：每天 08:00
4. 设置操作：启动程序
   - 程序: `python`
   - 参数: `scripts/daily_news_check.py`
   - 起始于: `/mnt/okcomputer/output/app`

## 手动添加新闻

### 方法1: 直接编辑 newsData.ts

直接编辑 `src/data/newsData.ts` 文件，添加新闻条目。

### 方法2: 使用 pending_news.json

1. 创建 `scripts/pending_news.json` 文件，格式如下:

```json
[
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
]
```

2. 运行更新脚本:

```bash
cd /mnt/okcomputer/output/app
python3 scripts/daily_news_check.py
```

### 方法3: 使用 news_updater.py

```bash
cd /mnt/okcomputer/output/app
python3 scripts/news_updater.py '{"title":"...","source":"...",...}'
```

## 新闻分类说明

- `dma`: DMA/数字市场法相关
- `appstore`: 苹果App Store相关
- `googleplay`: Google Play相关
- `thirdparty`: 第三方应用商店
- `huawei`: 华为相关
- `developer`: 开发者相关

## 评分标准

- 9-10分: 重大政策变化/监管行动
- 7-8分: 重要产品更新/市场变化
- 5-6分: 一般新闻/常规更新
- 1-4分: 次要新闻

## 日志查看

```bash
# 查看更新日志
tail -f /mnt/okcomputer/output/app/logs/news_update.log

# 查看定时任务日志
grep news-update /var/log/syslog
```

## 注意事项

1. 确保 Python 3 已安装
2. 确保 Node.js 和 npm 已安装
3. 确保有足够的磁盘空间
4. 建议先在测试环境验证

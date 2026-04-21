#!/bin/bash
# 快速添加新闻脚本
# 用法: ./quick_add.sh "新闻标题" "原文链接" "来源"

APP_DIR="/mnt/okcomputer/output/app"
SCRIPT_DIR="$APP_DIR/scripts"

# 检查参数
if [ $# -lt 2 ]; then
    echo "用法: $0 \"新闻标题\" \"原文链接\" [来源]"
    echo ""
    echo "示例:"
    echo "  $0 \"苹果发布新政策\" \"https://apple.com/news\" \"Apple\""
    exit 1
fi

TITLE="$1"
URL="$2"
SOURCE="${3:-Reuters}"
DATE=$(date +%Y-%m-%d)

# 创建临时 JSON 文件
TEMP_FILE=$(mktemp)
cat > "$TEMP_FILE" << EOF
[
  {
    "title": "$TITLE",
    "source": "$SOURCE",
    "sourceUrl": "$URL",
    "summary": "待补充摘要",
    "aiComment": {
      "overallImpact": "待补充整体影响分析",
      "huaweiImpact": "待补充对华为的影响分析"
    },
    "publishDate": "$DATE",
    "score": 7,
    "category": "appstore",
    "tags": ["苹果"]
  }
]
EOF

# 移动到 pending_news.json
mv "$TEMP_FILE" "$SCRIPT_DIR/pending_news.json"

echo "[INFO] 新闻已添加到待处理列表"
echo ""
echo "新闻信息:"
echo "  标题: $TITLE"
echo "  来源: $SOURCE"
echo "  链接: $URL"
echo "  日期: $DATE"
echo ""
echo "请编辑 pending_news.json 补充详细信息，然后运行:"
echo "  python3 $SCRIPT_DIR/daily_news_check.py"
echo ""
echo "或使用交互式工具:"
echo "  python3 $SCRIPT_DIR/add_news_interactive.py"
echo ""

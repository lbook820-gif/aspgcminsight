#!/bin/bash
# 设置定时任务脚本

APP_DIR="/mnt/okcomputer/output/app"
SCRIPT_DIR="$APP_DIR/scripts"
LOG_DIR="$APP_DIR/logs"

echo "=============================================="
echo "      新闻自动更新定时任务设置"
echo "=============================================="
echo ""

# 创建日志目录
mkdir -p "$LOG_DIR"

# 检查 Python
if ! command -v python3 &> /dev/null; then
    echo "[ERROR] 未找到 Python3，请先安装"
    exit 1
fi

echo "[INFO] Python3 已安装"

# 检查 Node.js
if ! command -v npm &> /dev/null; then
    echo "[ERROR] 未找到 npm，请先安装 Node.js"
    exit 1
fi

echo "[INFO] Node.js 已安装"

# 设置执行权限
chmod +x "$SCRIPT_DIR/daily_news_check.py"
chmod +x "$SCRIPT_DIR/add_news_interactive.py"
chmod +x "$SCRIPT_DIR/news_updater.py"

echo "[INFO] 脚本权限已设置"

# 添加定时任务
echo ""
echo "请选择定时任务设置方式:"
echo "  1. 每天北京时间 08:00 执行 (推荐)"
echo "  2. 每小时执行一次 (测试用)"
echo "  3. 自定义时间"
echo "  0. 跳过设置"
echo ""
read -p "请选择 [0-3]: " choice

case $choice in
    1)
        # 每天北京时间 08:00 = UTC 00:00
        CRON_LINE="0 0 * * * cd $APP_DIR && /usr/bin/python3 $SCRIPT_DIR/daily_news_check.py >> $LOG_DIR/news_update.log 2>&1"
        ;;
    2)
        # 每小时执行
        CRON_LINE="0 * * * * cd $APP_DIR && /usr/bin/python3 $SCRIPT_DIR/daily_news_check.py >> $LOG_DIR/news_update.log 2>&1"
        ;;
    3)
        read -p "请输入分钟 (0-59): " min
        read -p "请输入小时 (0-23, UTC时间): " hour
        CRON_LINE="$min $hour * * * cd $APP_DIR && /usr/bin/python3 $SCRIPT_DIR/daily_news_check.py >> $LOG_DIR/news_update.log 2>&1"
        ;;
    0)
        echo "[INFO] 跳过定时任务设置"
        exit 0
        ;;
    *)
        echo "[ERROR] 无效选择"
        exit 1
        ;;
esac

# 添加到 crontab
(crontab -l 2>/dev/null | grep -v "daily_news_check.py"; echo "$CRON_LINE") | crontab -

echo ""
echo "[SUCCESS] 定时任务已设置"
echo ""
echo "任务详情:"
echo "  命令: $CRON_LINE"
echo "  日志: $LOG_DIR/news_update.log"
echo ""
echo "查看定时任务:"
echo "  crontab -l"
echo ""
echo "查看日志:"
echo "  tail -f $LOG_DIR/news_update.log"
echo ""
echo "手动运行:"
echo "  python3 $SCRIPT_DIR/daily_news_check.py"
echo ""
echo "交互式添加新闻:"
echo "  python3 $SCRIPT_DIR/add_news_interactive.py"
echo ""

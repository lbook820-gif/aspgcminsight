#!/bin/bash

# 链接有效性验证脚本
# 用于在提交前验证所有新闻链接的有效性

echo "🔍 开始验证新闻链接..."
echo ""

# 定义颜色
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 计数器
VALID=0
INVALID=0
TOTAL=0

# 临时文件
TEMP_FILE=$(mktemp)

# 从 Home.tsx 提取所有链接
grep -oP "link:\s*'[^']+'" src/pages/Home.tsx | sed "s/link: '//g" | sed "s/'//g" > "$TEMP_FILE"

TOTAL=$(wc -l < "$TEMP_FILE")

echo "📋 共找到 $TOTAL 个链接需要验证"
echo ""

# 逐个验证链接
while IFS= read -r url; do
  # 跳过空行
  [ -z "$url" ] && continue
  
  # 显示进度
  CURRENT=$((VALID + INVALID + 1))
  echo -n "[$CURRENT/$TOTAL] 检查: $url ... "
  
  # 使用 curl 检查链接（只获取头部，跟随重定向）
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 -L "$url" 2>/dev/null)
  
  if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "301" ] || [ "$HTTP_CODE" = "302" ]; then
    echo -e "${GREEN}✅ OK ($HTTP_CODE)${NC}"
    VALID=$((VALID + 1))
  else
    echo -e "${RED}❌ FAILED ($HTTP_CODE)${NC}"
    INVALID=$((INVALID + 1))
    echo "   └─ 无效链接: $url" >> invalid-links.txt
  fi
  
  # 添加延迟避免请求过快
  sleep 0.5
  
done < "$TEMP_FILE"

# 清理临时文件
rm "$TEMP_FILE"

# 输出统计
echo ""
echo "========================================"
echo -e "${GREEN}✅ 有效链接: $VALID${NC}"
echo -e "${RED}❌ 无效链接: $INVALID${NC}"
echo ""

# 如果有无效链接，显示详情
if [ $INVALID -gt 0 ]; then
  echo -e "${RED}需要修复的链接:${NC}"
  cat invalid-links.txt
  rm invalid-links.txt
  exit 1
else
  echo -e "${GREEN}✅ 所有链接均有效！${NC}"
  exit 0
fi

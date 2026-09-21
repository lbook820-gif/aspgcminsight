#!/bin/bash
#
# 链接有效性验证脚本（薄封装）
#
# 实际逻辑统一由 scripts/validate-links.js 实现，避免两份实现口径不一致。
# 原实现只扫描 src/pages/Home.tsx，而新闻数据早已迁移到 src/data/news/*.ts，
# 导致脚本长期静默通过（假通过）。现已改为扫描全部数据源。
#
# 用法：
#   bash scripts/validate-links.sh              # 全量验证
#   bash scripts/validate-links.sh --limit 20   # 冒烟测试

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if ! command -v node >/dev/null 2>&1; then
  echo "❌ 未找到 node，请先安装 Node.js" >&2
  exit 1
fi

node "$SCRIPT_DIR/validate-links.js" "$@"

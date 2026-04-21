#!/usr/bin/env python3
"""
新闻自动更新器
每天检索相关新闻并更新到网站
"""

import os
import sys
import re
import json
import subprocess
from datetime import datetime, timedelta
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
DATA_FILE = PROJECT_ROOT / "src" / "data" / "newsData.ts"

def get_next_id():
    """获取下一个可用ID"""
    content = DATA_FILE.read_text(encoding='utf-8')
    ids = re.findall(r"id:\s*'(\d+)'", content)
    if not ids:
        return "1"
    return str(max(int(id) for id in ids) + 1)

def format_date(date_str):
    """格式化日期"""
    try:
        dt = datetime.strptime(date_str, "%Y-%m-%d")
        return dt.strftime("%Y-%m-%d")
    except:
        return datetime.now().strftime("%Y-%m-%d")

def add_news_item(news_data):
    """添加新闻到数据文件"""
    content = DATA_FILE.read_text(encoding='utf-8')
    
    # 转义特殊字符
    title = news_data['title'].replace("'", "\\'")
    source = news_data['source'].replace("'", "\\'")
    summary = news_data['summary'].replace("'", "\\'")
    overall = news_data['overallImpact'].replace("'", "\\'")
    huawei = news_data['huaweiImpact'].replace("'", "\\'")
    
    # 构建新闻条目
    news_entry = f"""  {{
    id: '{news_data['id']}',
    title: '{title}',
    source: '{source}',
    sourceUrl: '{news_data['sourceUrl']}',
    summary: '{summary}',
    aiComment: {{
      overallImpact: '{overall}',
      huaweiImpact: '{huawei}',
    }},
    publishDate: '{news_data['publishDate']}',
    score: {news_data['score']},
    category: '{news_data['category']}',
    tags: {json.dumps(news_data['tags'], ensure_ascii=False)},
  }},"""
    
    # 在数组末尾插入
    pattern = r"(  },\s*\n\];)"
    match = re.search(pattern, content)
    
    if match:
        new_content = content[:match.start()] + news_entry + "\n" + content[match.start():]
        DATA_FILE.write_text(new_content, encoding='utf-8')
        return True
    return False

def rebuild_site():
    """重新构建网站"""
    print("[INFO] 开始构建网站...")
    result = subprocess.run(
        ['npm', 'run', 'build'],
        cwd=PROJECT_ROOT,
        capture_output=True,
        text=True
    )
    
    if result.returncode == 0:
        print("[INFO] 构建成功")
        return True
    else:
        print(f"[ERROR] 构建失败: {result.stderr}")
        return False

def main():
    """主入口 - 供外部调用添加新闻"""
    if len(sys.argv) < 2:
        print("用法: python news_updater.py '<新闻JSON>'")
        sys.exit(1)
    
    try:
        news_json = sys.argv[1]
        news_data = json.loads(news_json)
        news_data['id'] = get_next_id()
        
        if add_news_item(news_data):
            print(f"[INFO] 新闻已添加，ID: {news_data['id']}")
            
            # 自动构建
            if rebuild_site():
                print("[INFO] 网站已更新")
            else:
                print("[ERROR] 网站构建失败")
        else:
            print("[ERROR] 添加新闻失败")
            
    except json.JSONDecodeError as e:
        print(f"[ERROR] JSON解析失败: {e}")
    except Exception as e:
        print(f"[ERROR] 错误: {e}")

if __name__ == '__main__':
    main()

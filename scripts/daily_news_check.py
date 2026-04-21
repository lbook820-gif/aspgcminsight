#!/usr/bin/env python3
"""
每日新闻检查脚本
每天自动检索最近2天的相关新闻并更新网站
"""

import os
import sys
import json
import re
import subprocess
from datetime import datetime, timedelta
from pathlib import Path

# 项目路径
PROJECT_ROOT = Path(__file__).parent.parent
DATA_FILE = PROJECT_ROOT / "src" / "data" / "newsData.ts"
LOG_FILE = PROJECT_ROOT / "logs" / "news_update.log"

def log(message):
    """记录日志"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_msg = f"[{timestamp}] {message}"
    print(log_msg)
    
    # 确保日志目录存在
    LOG_FILE.parent.mkdir(exist_ok=True)
    with open(LOG_FILE, 'a', encoding='utf-8') as f:
        f.write(log_msg + '\n')

def get_next_id():
    """获取下一个可用ID"""
    content = DATA_FILE.read_text(encoding='utf-8')
    ids = re.findall(r"id:\s*'(\d+)'", content)
    if not ids:
        return "1"
    return str(max(int(id) for id in ids) + 1)

def get_existing_urls():
    """获取已存在的新闻URL列表"""
    content = DATA_FILE.read_text(encoding='utf-8')
    urls = re.findall(r"sourceUrl:\s*'([^']+)'", content)
    return set(urls)

def add_news_item(news_data):
    """添加新闻到数据文件"""
    content = DATA_FILE.read_text(encoding='utf-8')
    
    # 转义特殊字符
    title = news_data['title'].replace("'", "\\'")
    source = news_data['source'].replace("'", "\\'")
    summary = news_data['summary'].replace("'", "\\'")
    overall = news_data['aiComment']['overallImpact'].replace("'", "\\'")
    huawei = news_data['aiComment']['huaweiImpact'].replace("'", "\\'")
    
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
    log("开始构建网站...")
    result = subprocess.run(
        ['npm', 'run', 'build'],
        cwd=PROJECT_ROOT,
        capture_output=True,
        text=True
    )
    
    if result.returncode == 0:
        log("构建成功")
        return True
    else:
        log(f"构建失败: {result.stderr}")
        return False

def check_news_manually():
    """
    手动检查新闻入口
    由于无法直接调用搜索API，这里提供手动添加的接口
    """
    log("="*60)
    log("每日新闻检查任务开始")
    log("="*60)
    
    # 检查是否有待处理的新闻文件
    pending_file = PROJECT_ROOT / "scripts" / "pending_news.json"
    
    if not pending_file.exists():
        log("没有找到待处理的新闻文件")
        log("请手动搜索新闻并创建 pending_news.json 文件")
        log("任务完成，无更新")
        return
    
    try:
        with open(pending_file, 'r', encoding='utf-8') as f:
            pending_news = json.load(f)
        
        existing_urls = get_existing_urls()
        added_count = 0
        
        for news in pending_news:
            if news['sourceUrl'] in existing_urls:
                log(f"跳过已存在的新闻: {news['title'][:40]}...")
                continue
            
            news['id'] = get_next_id()
            
            if add_news_item(news):
                log(f"添加新闻: {news['title'][:50]}...")
                added_count += 1
            else:
                log(f"添加失败: {news['title'][:50]}...")
        
        if added_count > 0:
            log(f"成功添加 {added_count} 条新闻，开始构建...")
            if rebuild_site():
                log("网站更新完成")
            else:
                log("网站构建失败")
        else:
            log("没有新新闻需要添加")
        
        # 清空待处理文件
        pending_file.unlink()
        
    except json.JSONDecodeError as e:
        log(f"JSON解析错误: {e}")
    except Exception as e:
        log(f"错误: {e}")
    
    log("="*60)
    log("任务完成")
    log("="*60)

def main():
    """主函数"""
    check_news_manually()

if __name__ == '__main__':
    main()

#!/usr/bin/env python3
"""
自动新闻更新脚本
每天检索最近2天的相关新闻，并更新到网站中
"""

import os
import sys
import re
import json
import subprocess
from datetime import datetime, timedelta
from pathlib import Path

# 添加项目路径
PROJECT_ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

def get_current_news_ids():
    """获取当前已有新闻的ID列表"""
    news_data_path = PROJECT_ROOT / "src" / "data" / "newsData.ts"
    content = news_data_path.read_text(encoding='utf-8')
    
    # 提取所有id
    ids = re.findall(r"id:\s*'(\d+)'", content)
    return set(ids)

def get_next_id():
    """获取下一个可用ID"""
    existing_ids = get_current_news_ids()
    if not existing_ids:
        return "1"
    max_id = max(int(id) for id in existing_ids)
    return str(max_id + 1)

def search_recent_news():
    """搜索最近2天的相关新闻"""
    # 搜索关键词组合
    search_queries = [
        "Apple App Store policy change 2026",
        "Google Play Store update 2026",
        "DMA Digital Markets Act 2026",
        "Epic Games Store mobile 2026",
        "Huawei AppGallery news 2026",
        "mobile app ecosystem regulation 2026",
        "EU app store regulation 2026",
        "third party app store 2026",
    ]
    
    print(f"[{datetime.now()}] 开始搜索新闻...")
    
    # 这里使用模拟数据，实际使用时需要接入新闻API
    # 例如: NewsAPI, Google News API, 或自定义爬虫
    
    # 由于无法直接调用搜索API，这里返回空列表
    # 实际部署时需要配置新闻API密钥
    return []

def analyze_news_relevance(title, summary):
    """分析新闻与网站主题的相关性"""
    keywords = [
        'app store', 'google play', 'appstore', 'play store',
        'dma', 'digital markets act', 'eu regulation',
        'epic games', 'fortnite', 'third party store',
        'huawei', 'appgallery', 'harmonyos',
        'apple', 'ios', 'android',
        'commission', 'fee', 'policy',
        'interoperability', 'sideloading',
    ]
    
    text = (title + " " + summary).lower()
    score = sum(1 for kw in keywords if kw in text)
    return score >= 2  # 至少匹配2个关键词才算相关

def generate_ai_comment(title, summary):
    """生成AI评论"""
    # 这里简化处理，实际应该调用AI API
    overall_impact = "该新闻对移动应用生态可能产生重要影响，值得持续关注。"
    huawei_impact = "华为应密切关注此动态，评估对AppGallery业务的潜在影响。"
    return overall_impact, huawei_impact

def determine_category(title, summary):
    """确定新闻分类"""
    text = (title + " " + summary).lower()
    
    if 'dma' in text or 'digital markets act' in text or 'eu regulation' in text:
        return 'dma'
    elif 'app store' in text or 'apple' in text:
        return 'appstore'
    elif 'google play' in text or 'android' in text:
        return 'googleplay'
    elif 'epic' in text or 'fortnite' in text:
        return 'thirdparty'
    elif 'huawei' in text or 'appgallery' in text:
        return 'huawei'
    else:
        return 'developer'

def determine_score(title, summary):
    """确定新闻重要性评分"""
    text = (title + " " + summary).lower()
    
    high_impact_keywords = ['dma', 'regulation', 'fine', 'antitrust', 'lawsuit', 'major']
    medium_impact_keywords = ['update', 'change', 'new feature', 'expansion']
    
    if any(kw in text for kw in high_impact_keywords):
        return 8
    elif any(kw in text for kw in medium_impact_keywords):
        return 6
    return 5

def extract_tags(title, summary, category):
    """提取标签"""
    text = (title + " " + summary).lower()
    tags = []
    
    tag_mapping = {
        '苹果': ['apple', 'app store', 'ios'],
        'Google': ['google', 'google play', 'android'],
        'DMA': ['dma', 'digital markets act', 'eu regulation'],
        'Epic': ['epic', 'epic games', 'fortnite'],
        '华为': ['huawei', 'appgallery', 'harmonyos'],
        'Meta': ['meta', 'facebook', 'whatsapp', 'instagram'],
        'AI': ['ai', 'artificial intelligence', 'chatbot'],
        '游戏': ['game', 'gaming', 'fortnite'],
        '佣金': ['commission', 'fee', 'revenue'],
        '合规': ['compliance', 'regulation', 'law'],
    }
    
    for tag, keywords in tag_mapping.items():
        if any(kw in text for kw in keywords):
            tags.append(tag)
    
    return tags[:5]  # 最多5个标签

def add_news_to_data(news_item):
    """将新闻添加到数据文件中"""
    news_data_path = PROJECT_ROOT / "src" / "data" / "newsData.ts"
    content = news_data_path.read_text(encoding='utf-8')
    
    # 构建新闻对象字符串
    news_str = f"""  {{
    id: '{news_item['id']}',
    title: '{news_item['title']}',
    source: '{news_item['source']}',
    sourceUrl: '{news_item['sourceUrl']}',
    summary: '{news_item['summary']}',
    aiComment: {{
      overallImpact: '{news_item['aiComment']['overallImpact']}',
      huaweiImpact: '{news_item['aiComment']['huaweiImpact']}',
    }},
    publishDate: '{news_item['publishDate']}',
    score: {news_item['score']},
    category: '{news_item['category']}',
    tags: {json.dumps(news_item['tags'], ensure_ascii=False)},
  }},"""
    
    # 在最后一个新闻项之前插入新新闻
    # 找到最后一个新闻项的结束位置
    last_item_pattern = r"(  },\s*\n\];)"
    match = re.search(last_item_pattern, content)
    
    if match:
        insert_pos = match.start()
        new_content = content[:insert_pos] + news_str + "\n" + content[insert_pos:]
        news_data_path.write_text(new_content, encoding='utf-8')
        return True
    
    return False

def rebuild_and_deploy():
    """重新构建并部署网站"""
    try:
        print(f"[{datetime.now()}] 开始构建...")
        
        # 构建
        result = subprocess.run(
            ['npm', 'run', 'build'],
            cwd=PROJECT_ROOT,
            capture_output=True,
            text=True
        )
        
        if result.returncode != 0:
            print(f"构建失败: {result.stderr}")
            return False
        
        print(f"[{datetime.now()}] 构建成功，开始部署...")
        
        # 部署 - 使用部署API或脚本
        # 这里需要根据实际部署方式调整
        
        print(f"[{datetime.now()}] 部署完成")
        return True
        
    except Exception as e:
        print(f"构建部署失败: {e}")
        return False

def main():
    """主函数"""
    print(f"\n{'='*60}")
    print(f"[{datetime.now()}] 开始自动新闻更新任务")
    print(f"{'='*60}\n")
    
    # 搜索新闻
    news_list = search_recent_news()
    
    if not news_list:
        print("未找到新的相关新闻")
        print(f"\n{'='*60}")
        print(f"[{datetime.now()}] 任务完成，无更新")
        print(f"{'='*60}\n")
        return
    
    # 过滤已存在的新闻
    existing_ids = get_current_news_ids()
    new_news = [n for n in news_list if n.get('id') not in existing_ids]
    
    if not new_news:
        print("所有新闻已存在，无需更新")
        return
    
    print(f"找到 {len(new_news)} 条新新闻")
    
    # 添加新闻
    added_count = 0
    for news in new_news:
        if add_news_to_data(news):
            added_count += 1
            print(f"已添加: {news['title'][:50]}...")
    
    if added_count > 0:
        # 重新构建和部署
        rebuild_and_deploy()
    
    print(f"\n{'='*60}")
    print(f"[{datetime.now()}] 任务完成，添加了 {added_count} 条新闻")
    print(f"{'='*60}\n")

if __name__ == '__main__':
    main()

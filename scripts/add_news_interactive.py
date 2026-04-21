#!/usr/bin/env python3
"""
交互式新闻添加工具
通过命令行交互方式添加新闻
"""

import json
import re
import subprocess
from datetime import datetime
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

def get_input(prompt, default=""):
    """获取用户输入"""
    if default:
        prompt = f"{prompt} [{default}]: "
    else:
        prompt = f"{prompt}: "
    
    value = input(prompt).strip()
    return value if value else default

def select_category():
    """选择分类"""
    categories = {
        '1': ('dma', 'DMA/数字市场法'),
        '2': ('appstore', '苹果App Store'),
        '3': ('googleplay', 'Google Play'),
        '4': ('thirdparty', '第三方应用商店'),
        '5': ('huawei', '华为相关'),
        '6': ('developer', '开发者相关'),
    }
    
    print("\n选择分类:")
    for key, (code, name) in categories.items():
        print(f"  {key}. {name}")
    
    choice = get_input("请选择", "2")
    return categories.get(choice, ('appstore', '苹果App Store'))[0]

def select_score():
    """选择评分"""
    print("\n选择重要性评分:")
    print("  9-10: 重大政策变化/监管行动")
    print("  7-8:  重要产品更新/市场变化")
    print("  5-6:  一般新闻/常规更新")
    print("  1-4:  次要新闻")
    
    score = get_input("评分", "7")
    try:
        return int(score)
    except:
        return 7

def select_tags():
    """选择标签"""
    all_tags = [
        "苹果", "Google", "Meta", "华为", "Epic Games",
        "App Store", "Google Play", "AppGallery",
        "DMA", "合规", "监管",
        "AI", "游戏", "佣金",
        "第三方商店", "互操作性", "隐私"
    ]
    
    print("\n可选标签:")
    for i, tag in enumerate(all_tags, 1):
        print(f"  {i}. {tag}")
    
    print("  0. 完成选择")
    
    selected = []
    while True:
        choice = get_input("选择标签编号 (0完成)")
        if choice == "0":
            break
        try:
            idx = int(choice) - 1
            if 0 <= idx < len(all_tags):
                tag = all_tags[idx]
                if tag not in selected:
                    selected.append(tag)
                    print(f"  已添加: {tag}")
        except:
            pass
    
    # 自定义标签
    custom = get_input("添加自定义标签 (用逗号分隔，无则留空)")
    if custom:
        selected.extend([t.strip() for t in custom.split(",") if t.strip()])
    
    return selected[:5]  # 最多5个

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
    print("\n[INFO] 开始构建网站...")
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
    """主函数"""
    print("="*60)
    print("      交互式新闻添加工具")
    print("="*60)
    
    # 收集信息
    print("\n请输入新闻信息:")
    
    title = get_input("标题")
    if not title:
        print("标题不能为空，退出")
        return
    
    source = get_input("来源", "Reuters")
    source_url = get_input("原文链接")
    summary = get_input("摘要")
    
    print("\n--- AI 分析 ---")
    overall_impact = get_input("整体影响分析")
    huawei_impact = get_input("对华为的影响分析")
    
    publish_date = get_input("发布日期 (YYYY-MM-DD)", datetime.now().strftime("%Y-%m-%d"))
    category = select_category()
    score = select_score()
    tags = select_tags()
    
    # 确认
    print("\n" + "="*60)
    print("请确认以下信息:")
    print("="*60)
    print(f"标题: {title}")
    print(f"来源: {source}")
    print(f"链接: {source_url}")
    print(f"分类: {category}")
    print(f"评分: {score}")
    print(f"标签: {', '.join(tags)}")
    
    confirm = get_input("\n确认添加? (y/n)", "y")
    if confirm.lower() != 'y':
        print("已取消")
        return
    
    # 构建新闻数据
    news_data = {
        'id': get_next_id(),
        'title': title,
        'source': source,
        'sourceUrl': source_url,
        'summary': summary,
        'aiComment': {
            'overallImpact': overall_impact,
            'huaweiImpact': huawei_impact,
        },
        'publishDate': publish_date,
        'score': score,
        'category': category,
        'tags': tags,
    }
    
    # 添加新闻
    if add_news_item(news_data):
        print(f"\n[SUCCESS] 新闻已添加，ID: {news_data['id']}")
        
        # 询问是否构建
        build = get_input("是否立即构建网站? (y/n)", "y")
        if build.lower() == 'y':
            if rebuild_site():
                print("\n[SUCCESS] 网站已更新完成!")
            else:
                print("\n[ERROR] 网站构建失败，请手动执行 npm run build")
    else:
        print("\n[ERROR] 添加新闻失败")

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n已取消")
    except Exception as e:
        print(f"\n[ERROR] 错误: {e}")

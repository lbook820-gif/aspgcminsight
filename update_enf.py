with open('src/pages/Enforcement.tsx', 'r') as f:
    content = f.read()

new_entries = """
  {
    id: 'e49',
    source: '欧盟委员会/新华网/新浪财经',
    date: '2026-06-12',
    heat: 9,
    title: '欧盟与巴西签署数字合作伙伴协议，DSA未成年人保护执法协作首次扩展至拉美',
    summary:
      '2026年6月12日，欧盟与巴西在巴西利亚正式签署数字合作伙伴协议（EU-Brazil Digital Partnership）。同日，欧盟委员会DSA执法部门与巴西国家数据保护局（ANPD）签署行政安排协议，聚焦未成年人网络保护执法协作。这是欧盟DSA执法框架首次与拉美主要经济体建立正式跨境合作机制。欧盟科技事务主管维尔库宁表示欧盟正通过深化与巴西、韩国等国的科技合作降低对美技术依赖。此前欧盟已于5月5日与日本签署类似合作协议。',
    overallImpact:
      '欧盟DSA全球合作网络加速成型，DSA监管标准正通过双边协议向全球输出，将合规要求从区域义务推向全球运营基线。',
    industryImpact:
      '在巴西运营的中国科技企业需关注DSA标准全球化趋势，巴西本地法（数字儿童保护法）与欧盟DSA标准叠加，合规要求持续升级。',
    tags: ['欧盟', '巴西', 'DSA', '未成年人保护', '国际合作', 'ANPD'],
    link: 'https://digital-strategy.ec.europa.eu/en/news',
    isNew: true,
  },
  {
    id: 'e48',
    source: 'ENISA/欧盟委员会',
    date: '2026-06-11',
    heat: 8,
    title: '欧盟举办Cyber Europe 2026网络安全演习，5000名专家测试关键交通基础设施抗攻击能力',
    summary:
      '2026年6月10-11日，欧盟网络安全局（ENISA）组织举办迄今规模最大的网络安全演习Cyber Europe 2026（第十届），约5000名专家参与模拟测试，重点检验欧洲关键交通基础设施（机场、港口、铁路、智能交通系统）遭受网络攻击时的跨成员国协同响应能力。',
    overallImpact:
      '5000人规模演习体现欧盟对关键基础设施网络安全的战略重视，与NIS2统一报告模板形成演练+标准化的闭环体系。',
    industryImpact:
      '在欧盟运营的企业需按NIS2模板建立24h/72h/1个月分步事件报告机制，加强供应链安全评估。',
    tags: ['ENISA', 'Cyber Europe', '网络安全', '交通运输', 'NIS2', '关键基础设施'],
    link: 'https://digital-strategy.ec.europa.eu/en/news',
    isNew: true,
  },
"""

# Find the unique insertion point - right before "id: 'e16'," that comes after e45
# Find the last occurrence of the sequence around e45 closing
target = "    link: 'https://news.qq.com/rain/a/20260605A092CE',\n    isNew: true,\n  },\n  {\n    id: 'e16',"
replacement = "    link: 'https://news.qq.com/rain/a/20260605A092CE',\n    isNew: true,\n  }," + new_entries + "  {\n    id: 'e16',"

if target in content:
    content = content.replace(target, replacement, 1)
    with open('src/pages/Enforcement.tsx', 'w') as f:
        f.write(content)
    print('Done. Found target and replaced.')
else:
    print('ERROR: Target not found!')
    # Debug: try finding parts
    idx = content.find("    link: 'https://news.qq.com/rain/a/20260605A092CE'")
    if idx >= 0:
        print(f"Found link at {idx}, context:")
        print(repr(content[idx:idx+120]))

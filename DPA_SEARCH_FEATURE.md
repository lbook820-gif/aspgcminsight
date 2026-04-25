# 各国监管机构页面搜索功能说明

## 功能概述

为 `/dpas` 页面新增了强大的搜索和筛选功能，支持用户快速定位特定监管机构的新闻动态。

## 新增功能

### 1. 关键词搜索
- **搜索范围**：标题、摘要、标签、来源、整体影响、行业影响
- **实时过滤**：输入即搜索，无需点击按钮
- **大小写不敏感**：自动处理大小写问题

**使用示例**：
- 搜索 "GDPR" → 显示所有涉及 GDPR 的新闻
- 搜索 "透明度" → 显示所有关于透明度义务的新闻
- 搜索 "AI" → 显示所有人工智能相关新闻

### 2. 机构筛选
- **下拉菜单**：选择特定监管机构
- **机构列表**：
  - 全部机构
  - EDPB - 欧洲数据保护委员会 (欧盟)
  - AI Office - 欧洲人工智能办公室 (欧盟)
  - ENISA - 欧洲网络安全局 (欧盟)
  - EBA - 欧洲银行管理局 (欧盟)
  - ICO - 英国信息专员办公室 (英国)
  - FDPIC - 瑞士联邦数据保护与信息专员 (瑞士)
  - BfDI - 德国联邦数据保护局 (德国)
  - KVKK - 土耳其个人数据保护局 (土耳其)
  - RK - 土耳其竞争管理局 (土耳其)

### 3. 快捷筛选标签
- **一键切换**：点击标签快速筛选常用机构
- **显示机构**：EDPB、AI Office、ENISA、EBA、ICO
- **清除筛选**：点击"清除筛选 ×"恢复全部显示

### 4. 搜索结果展示
- **结果计数**：显示当前筛选结果数量
- **筛选状态**：显示当前选中的机构名称
- **无结果提示**：友好提示未找到结果，提供清除筛选按钮

### 5. 排序功能
- **日期倒序**：最新新闻排在最前面
- **自动排序**：筛选后自动重新排序

## 界面设计

### 搜索栏布局
```
┌─────────────────────────────────────────────────────────┐
│  [搜索框: 搜索新闻标题、摘要、标签...]  [机构下拉菜单]  │
│                                                         │
│  [EDPB] [AI Office] [ENISA] [EBA] [ICO]  [清除筛选 ×]  │
└─────────────────────────────────────────────────────────┘
```

### 结果展示
```
机构动态与政策快讯                    共 3 条 · EDPB
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[新闻卡片 1]
[新闻卡片 2]
[新闻卡片 3]
```

### 无结果提示
```
未找到相关新闻 (关键词: "xxx") (机构: EDPB)
[清除所有筛选]
```

## 技术实现

### 核心组件
```typescript
// 状态管理
const [searchKeyword, setSearchKeyword] = useState('');
const [selectedAgency, setSelectedAgency] = useState('all');

// 过滤逻辑
const filteredUpdates = useMemo(() => {
  return filterDPAUpdates(dpaUpdates, searchKeyword, selectedAgency);
}, [searchKeyword, selectedAgency]);
```

### 过滤函数
```typescript
function filterDPAUpdates(
  updates: NewsItem[],
  keyword: string,
  agency: string
): NewsItem[] {
  let filtered = updates;

  // 按机构筛选
  if (agency && agency !== 'all') {
    filtered = filtered.filter((item) => {
      return item.source.includes(agency) || item.tags.includes(agency);
    });
  }

  // 按关键词搜索
  if (keyword.trim()) {
    const lowerKeyword = keyword.toLowerCase();
    filtered = filtered.filter((item) => {
      // 搜索多个字段
      return item.title.toLowerCase().includes(lowerKeyword) ||
             item.summary.toLowerCase().includes(lowerKeyword) ||
             item.tags.some(tag => tag.toLowerCase().includes(lowerKeyword));
    });
  }

  return filtered;
}
```

## 响应式设计

### 桌面端 (> 640px)
- 搜索框和下拉菜单横向排列
- 搜索框占据剩余空间
- 下拉菜单固定宽度 256px

### 移动端 (< 640px)
- 搜索框和下拉菜单纵向堆叠
- 各占一行，宽度 100%
- 快捷标签自动换行

## 性能优化

1. **useMemo 缓存**：避免不必要的重新计算
2. **实时搜索**：无需防抖，React 自动优化
3. **轻量级过滤**：纯前端实现，无网络请求

## 使用场景

### 场景一：查看特定机构动态
1. 打开 `/dpas` 页面
2. 点击机构下拉菜单
3. 选择 "EDPB"
4. 查看所有 EDPB 相关新闻

### 场景二：搜索特定主题
1. 打开 `/dpas` 页面
2. 在搜索框输入 "未成年人保护"
3. 查看所有相关新闻

### 场景三：组合筛选
1. 选择机构 "ICO"
2. 输入关键词 "年龄验证"
3. 查看 ICO 关于年龄验证的新闻

### 场景四：快速切换机构
1. 点击快捷标签 "AI Office"
2. 查看结果
3. 点击 "ENISA" 切换
4. 点击 "清除筛选" 恢复全部

## 后续优化建议

1. **高级搜索**：支持布尔运算符（AND、OR、NOT）
2. **日期范围**：添加日期选择器筛选特定时间段
3. **标签云**：显示热门标签，点击即可筛选
4. **搜索历史**：保存用户搜索记录
5. **导出功能**：导出筛选结果为 PDF 或 Excel
6. **订阅功能**：订阅特定机构的新闻推送

## 更新历史

- 2026-04-25：初始版本，支持关键词搜索和机构筛选
- 2026-04-25：新增快捷筛选标签和响应式设计

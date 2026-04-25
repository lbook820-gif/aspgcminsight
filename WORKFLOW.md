# ASPG 合规洞察项目工作流

## 项目概述
本项目旨在追踪全球（特别是欧盟）数字法规动态及大厂合规执法案例，为出海企业提供信息洞察。

## 每日执行流程

### 1. 新闻采集（由我执行）
- **时间**：每天北京时间 00:00（午夜）
- **方式**：OpenClaw Cron 任务（isolated session）
- **搜索的主要内容**
  关注欧盟数字法的合规动态，包括法律法规立法动态，执法案例，以及大厂企业的新闻
  大厂重点包括 Apple、Google、Meta、Amazon、Microsoft、ByteDance (TikTok)、Temu (Pinduoduo)、X 等
  也包括中国出海的大厂，如希音 (SHEIN)、小米、OPPO、vivo、传音等
  法律法规动态主要 GDPR, DMA, DSA, NIS2, AI Act, Data Act, 消费者权益等
  
  **监管机构官网动态检索（强制）**：
  每次执行必须访问以下监管机构官网获取最新动态：
  
  - **爱尔兰 DPC**：https://www.dataprotection.ie/en/news-media/latest-news
    - 重点：Meta、TikTok、X 等大型科技平台执法案例
    - 关注：数据跨境传输、数据泄露、透明度义务等
    
  - **EDPB**：https://www.edpb.europa.eu/news_en
    - 重点：协同执法行动、指导意见、一致性决定
    
  - **英国 ICO**：https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/
    - 重点：未成年人保护、年龄验证、数据泄露
    
  - **其他监管机构**：
    - AI Office: https://digital-strategy.ec.europa.eu/en/policies/ai-office
    - ENISA: https://www.enisa.europa.eu/news
    - EBA: https://www.eba.europa.eu/news-press
    - 瑞士 FDPIC: https://www.edoeb.admin.ch/edoeb/en/home/the-fdpic/links/news.html
    - 德国 BfDI: https://www.bfdi.bund.de/EN/Service/Press/Press_node.html
    - 土耳其 KVKK: https://www.kvkk.gov.tr/En/
    - 土耳其 RK: https://www.rekabet.gov.tr/en
  
  **重点领域**：
  - 数据合规：跨境传输 (TRA/SCCs), 透明度义务, 未成年人保护, 算法治理
  - 金融与市场：金融制裁 (OFSI), 反洗钱 (AML), 反垄断 (Antitrust), 支付互操作性
  **回溯范围**：保持对上述重点企业近 2 年内（2024-2026）所有重大处罚和调查案件的完整覆盖

### 2. 内容生成
- 读取 `src/pages/Home.tsx`, `src/pages/DPAs.tsx` 等文件，提取已有新闻去重
- **访问监管机构官网获取最新动态**：
  1. 使用 `web_fetch` 工具访问各监管机构官网新闻页面
  2. 提取最新发布的新闻和执法决定
  3. 优先使用官网链接，避免使用二手媒体报道
  4. 特别关注爱尔兰DPC的最新执法动态
- 搜索最新动态，按格式生成 JSON 对象
- **数据验证与链接检查**：
  - **新闻源核实**：必须优先采用官方机构（如欧委会 presscorner, 各国 DPA 官网）或顶级财经/科技媒体（路透社, TechCrunch, Politico）的源头报道
  - **链接有效性验证（强制）**：
    1. **新增新闻前验证**：每条新增新闻的链接必须先通过 `web_fetch` 工具验证，确保返回 200 状态码且有实际内容
    2. **批量验证脚本**：运行 `node scripts/validate-links.js` 进行全量链接检查
    3. **验证失败处理**：
       - 链接返回 404/403：必须搜索替代链接或删除该新闻
       - 链接超时/无响应：重试2次，仍失败则搜索替代链接
       - 内容不匹配：核实新闻真实性，必要时删除
    4. **禁止行为**：严禁挂载空白、失效、占位符或未经验证的链接
  - **去重与 ID 唯一性**：严禁出现重复的 `id`（如 `2026-003`），新增项需在现有最大 id 基础上递增，确保 ID 全局唯一
  - **日期准确性**：新闻日期必须与原始报道发布日期一致，不得使用当前日期填充
- 新新闻追加到数组末尾，id 递增
- **注意**：不收录纯华为产品报道，聚焦行业动态和监管政策

### 3. 构建与推送
- **链接验证（强制步骤，二选一）**：
  
  **方式一：使用 web_fetch 工具（推荐）**
  - 在添加每条新闻前，使用 `web_fetch` 工具验证链接
  - 确保返回 200 状态码且有实际内容
  - 示例：`web_fetch(url="https://example.com/news")`
  
  **方式二：使用验证脚本**
  ```bash
  # Bash 脚本（快速验证）
  bash scripts/validate-links.sh
  
  # 或 Node.js 脚本（详细报告）
  node scripts/validate-links.js
  ```
  
  **验证要求**：
  - 验证通过才可继续构建
  - 验证失败需修复所有无效链接后重新验证
  - 修复方法：搜索替代链接或删除该新闻条目
  
- `npm install`（如 node_modules 不存在）
- `npm run build` 验证构建（检查是否存在未闭合标签或类型错误）
- `git add .`
- `git commit -m "feat: daily update YYYY-MM-DD"`
- `git push origin main`

## 提交规范
- **表单字段**：标题、链接 (必须有效)、来源、摘要、整体影响、行业影响、标签、热度
- **排序要求**：所有页面（首页、执法、法律、监管局）的新闻列表必须按日期倒序排列（最新在前）

## 相关路径
- 本地仓库：`/home/sandbox/.openclaw/workspace/repo/aspgcminsight/`
- 远程仓库：`https://github.com/lbook820-gif/aspgcminsight`
- 网站地址：`https://lbook820-gif.github.io/aspgcminsight/`

## 更新历史
- 2026-04-21：初始化工作流
- 2026-04-23：更新搜索关键词，重点转向欧盟合规与大厂动态
- 2026-04-23：新增各国监管局（DPAs）频道，补充数据跨境传输（TRA/SCCs）专项合规洞察
- 2026-04-23：更新回溯范围，确保覆盖 Apple, Google, TikTok, Temu 近 2 年所有重大处罚与调查
- 2026-04-23：扩展监管机构名录（含 EDPB, AI Office, ICO, KVKK 等），增加金融与反垄断合规维度
- 2026-04-23：**强化链接有效性验证与 ID 唯一性审计，增加排序规范**
- 2026-04-25：**新增自动化链接验证脚本 `scripts/validate-links.js`，强制要求构建前验证所有链接**
- 2026-04-25：**增加日期准确性检查要求，禁止使用当前日期填充历史新闻**
- 2026-04-25：**新增监管机构官网动态检索要求，每次执行必须访问官网获取最新动态**
- 2026-04-25：**特别强调爱尔兰DPC官网检索，确保Meta、TikTok等执法案例及时更新**

## 常见问题与解决方案

### Q1: 链接验证失败怎么办？
**A:** 按以下步骤处理：
1. 使用 `web_fetch` 工具重新验证链接
2. 如果返回 404，使用搜索工具查找替代链接
3. 如果找不到有效链接，删除该新闻条目
4. 修复后重新运行 `node scripts/validate-links.js`

### Q2: 如何避免日期错误？
**A:** 
1. 搜索新闻时，仔细阅读原文发布日期
2. 不要假设新闻是"今天"发布的
3. 对于历史事件（如法案通过），核实实际通过日期
4. 使用官方来源确认时间线

### Q3: 链接验证脚本输出报告在哪里？
**A:** 
- 报告保存在 `scripts/invalid-links-report.json`
- 包含所有无效链接的详细信息
- 可用于批量修复问题链接

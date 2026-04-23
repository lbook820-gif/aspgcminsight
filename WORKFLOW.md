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
  **监管机构覆盖**：
  - 欧盟级别：EDPB (欧洲数据保护委员会), European AI Office (AI 办公室), ENISA (网安局), EBA (银行管理局)
  - 国家级别：英国 ICO, 瑞士 FDPIC, 德国 BfDI, 土耳其 KVKK (数据保护) 与 RK (竞争局)
  **重点领域**：
  - 数据合规：跨境传输 (TRA/SCCs), 透明度义务, 未成年人保护, 算法治理
  - 金融与市场：金融制裁 (OFSI), 反洗钱 (AML), 反垄断 (Antitrust), 支付互操作性
  **回溯范围**：保持对上述重点企业近 2 年内（2024-2026）所有重大处罚和调查案件的完整覆盖

### 2. 内容生成
- 读取 `src/pages/Home.tsx`, `src/pages/DPAs.tsx` 等文件，提取已有新闻去重
- 搜索最新动态，按格式生成 JSON 对象
- 新新闻追加到数组末尾，id 递增
- **注意**：不收录纯华为产品报道，聚焦行业动态和监管政策

### 3. 构建与推送
- `npm install`（如 node_modules 不存在）
- `npm run build` 验证构建
- `git add .`
- `git commit -m "feat: daily update YYYY-MM-DD"`
- `git push origin main`

## 提交规范
- **表单字段**：标题、链接、来源、摘要、整体影响、行业影响、标签、热度

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

# 制程缺陷耦合：厚度不均/毛刺/灰尘/吸水推向热失控前兆

```yaml
card_id: KC-BOOK-SAFE-PROCESS-001
title: "制程缺陷耦合：厚度不均/毛刺/灰尘/吸水推向热失控前兆"
phenomenon: |
  动力电芯安全失效追溯常见非材料本征，而是制造缺陷叠加（厚度不均、毛刺、松紧度、灰尘、吸水）。
causes:
  direct:
    - 极片厚度不均 → 局部过充析锂
    - 毛刺/灰尘 → 刺隔膜微短路发热
    - 吸水 → HF/产气/腐蚀
  indirect:
    - 自动化精度不足导致一致性差，短板单体在成组中过载
mechanism: |
  局部析锂与微短路提供持续热源，触发电解液/正极放氧等链式放热，越过散热能力即热失控。
  可检验预测：收紧涂布厚度 Cpk、毛刺粉尘门禁与露点后，滥用/针刺等安全项通过率应改善（需本厂验证）。
risk: |
  单体热失控蔓延至模组/车辆级事故。
countermeasures:
  - 工艺精密化与在线检（毛刺、粉尘、短路、水分）
  - 结构设计（安全阀/绝缘）与材料选择并行，但不替代制程控缺
  - 一致性筛选降低成组短板
upstream_links:
  - "涂布/辊压/分切/装配各卡 → 缺陷输入"
  - "MT.QA.SPC 失控 → 缺陷逃逸"
  - "成组一致性 → 短板放大"
downstream_links:
  - "微短路/析锂 → 热失控路径"
  - "成组失配 → 过充过放副反应"
  - "挂 MT.FAIL.SC 与 PACK 安全接口"
mechanism_node_id: MT.FAIL.SC
diagram_refs: []
verification_status: open
confidence: 0.62  # 教材归纳；未经本项目现场闭环
source: literature
sensitivity: public
sample: false
tags: [safety, thermal-runaway, process-defect, consistency]
evidence: |
  书卷4 §11.3.1–11.3.3 热失控与设备工艺安全（OCR 改写）。
```

> 说明：本卡为教材知识改写，`verification_status: open`；现场闭环后升 `verified`/`falsified`。

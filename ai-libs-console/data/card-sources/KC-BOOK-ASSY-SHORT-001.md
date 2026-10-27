# 装配短路隐患：异物/掉粉/隔膜破损与入壳压力

```yaml
card_id: KC-BOOK-ASSY-SHORT-001
title: "装配短路隐患：异物/掉粉/隔膜破损与入壳压力"
phenomenon: |
  卷绕/叠片后短路测试失败；或入壳后才暴露微短路；X-ray 见错位或异物。
causes:
  direct:
    - 金属异物、箔屑、涂层脱落、隔膜破损
    - 入壳压力过大：毛刺刺伤隔膜
  indirect:
    - 叠片负极包覆不足；贴胶缺失/错位
mechanism: |
  装配阶段把上游毛刺/粉尘与隔膜完整性耦合；压装减小间距使临界缺陷显形。
  可检验预测：加强除尘/贴胶与降低入壳峰值压力后短路率下降；解剖应对上异物或刺穿点。
risk: |
  内短路、漏检流入化成/出货。
countermeasures:
  - 短路测试仪+真空负压等组合；X-ray 结构检
  - 除粉除静电；极耳/危险部位贴胶
  - 控制入壳压力与对齐；负极包覆正极尺寸窗
upstream_links:
  - "分切毛刺粉尘 → 短路源"
  - "卷绕张力/纠偏 → 隔膜完整性"
  - "贴胶工艺 → 防护覆盖"
downstream_links:
  - "漏检短路 → 化成热/气异常"
  - "流入市场 → 安全事故"
  - "与 MT.FAIL.SC 卡片互指"
mechanism_node_id: MT.PROC.ASSY
diagram_refs: []
verification_status: open
confidence: 0.62  # 教材归纳；未经本项目现场闭环
source: literature
sensitivity: public
sample: false
tags: [assembly, short, foreign-matter, X-ray]
evidence: |
  书卷3 §8.3 装配质量检验与入壳压力叙述（OCR 改写）。
```

> 说明：本卡为教材知识改写，`verification_status: open`；现场闭环后升 `verified`/`falsified`。

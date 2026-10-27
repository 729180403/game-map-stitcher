# 预化成气路过大致化成不均与电解液损失

```yaml
card_id: KC-BOOK-FORM-GASPATH-001
title: "预化成气路过大致化成不均与电解液损失"
phenomenon: |
  预化成后极片见河流状气路；化成不均、气胀倾向、电解液溢出损失；软包更明显。
causes:
  direct:
    - 预化成电流过大，产气过快，气路面积大
    - 壳体夹紧力不足（软包>铝壳>钢壳气路面积递减）
  indirect:
    - 截止电压过低气体未充分逸出，封口后气胀；过高则时间长吸潮吸氧
mechanism: |
  气泡扩展连通形成稳定气路后气体逸出，但气路处反应暂停→化成不均；气泡占位导致电解液溢出。
  可检验预测：小电流+夹紧应减小气路面积并改善均匀性；软包夹具化成+抽气囊再二封。
risk: |
  SEI 疏松（大电流形核快）、气胀、电解液亏液、厚度超差。
countermeasures:
  - 小电流预化成；合适截止电压；软包夹紧
  - 二次补液或分步注液策略（按成本/工艺）
  - 化成温度约 20–35℃ 窗口，避免过热溶膜或过冷析锂（书述）
upstream_links:
  - "注液浸润状态 → 初始气核"
  - "壳体刚度/夹具 → 气路面积"
  - "电流制度 → 产气速率与 SEI 形貌"
downstream_links:
  - "气路 → 化成不均 / MT.FAIL.SWELL"
  - "软包厚度 → MT.PKG.AL.WRINKLE.POSTFILL 耦合"
  - "亏液 → 寿命与内阻"
mechanism_node_id: MT.PROC.FORM
diagram_refs: []
verification_status: open
confidence: 0.62  # 教材归纳；未经本项目现场闭环
source: literature
sensitivity: public
sample: false
tags: [formation, gas-path, SEI, pouch-clamp]
evidence: |
  书卷4 §10.2.2 预化成气路、电解液损失与制度原则（OCR 改写）。
```

> 说明：本卡为教材知识改写，`verification_status: open`；现场闭环后升 `verified`/`falsified`。

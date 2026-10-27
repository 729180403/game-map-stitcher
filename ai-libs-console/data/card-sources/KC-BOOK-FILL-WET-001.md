# 注液浸润不足：局部化成不均与气胀

```yaml
card_id: KC-BOOK-FILL-WET-001
title: "注液浸润不足：局部化成不均与气胀"
phenomenon: |
  注液后静置不足即化成；局部化成不足、封口后气胀、性能离散。
causes:
  direct:
    - 真空压差/保压时间不足；孔隙过小曲折度高使流量骤降
    - 毛细在变径/墨水瓶孔中阻滞
  indirect:
    - 过高压注导致壳体变形；极片过宽过厚高压实
mechanism: |
  注液=宏观充液+微观浸润；毛细与吸附可助可阻，微孔浸润极慢，必须静置。
  可检验预测：提高真空度/保压或降低压实/厚度应缩短充分浸润时间；浸润不足批次气胀与化成不均上升。
risk: |
  化成不均、气胀、界面阻抗高。
countermeasures:
  - 足够真空与静置；必要时分步注液
  - 设计端减宽/减厚/降压实/降曲折度促浸润
  - 避免注液管过压变形
upstream_links:
  - "MT.PROC.PRESS 压实/孔隙 → 浸润阻力"
  - "真空系统能力 → 压差动力"
  - "电解液粘度/润湿角 → 毛细行为"
downstream_links:
  - "浸润差 → MT.PROC.FORM 不均/气胀"
  - "气胀 → MT.FAIL.SWELL / 软包应力外观"
  - "性能离散 → 分容淘汰"
mechanism_node_id: MT.PROC.FILL
diagram_refs: []
verification_status: open
confidence: 0.62  # 教材归纳；未经本项目现场闭环
source: literature
sensitivity: public
sample: false
tags: [electrolyte-fill, wetting, gas, formation]
evidence: |
  书卷4 §10.2.1 注液与浸润（OCR 改写）。
```

> 说明：本卡为教材知识改写，`verification_status: open`；现场闭环后升 `verified`/`falsified`。

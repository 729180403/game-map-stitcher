# 涂布纵/横条道：毛细窗口与机械振动耦合

```yaml
card_id: KC-BOOK-COAT-RIBBON-001
title: "涂布纵/横条道：毛细窗口与机械振动耦合"
phenomenon: |
  纵向周期性竖条道，或沿宽度方向周期性横条道（遮盖率波动）。
causes:
  direct:
    - 纵条道：高毛细管数、涂层厚度/间隙比 h/G 过小、过高粘弹性
    - 横条道：片速/张力/弯液面波动、机械振动、气扰
  indirect:
    - 片幅自身纵/横条缺陷遗传
mechanism: |
  纵条道属涂布稳定性边界问题；横条道多为系统动力学扰动在弯液面上的调制。
  可检验预测：降速、增厚、增间隙、提高表面张力应抑纵条；减振/提负压/降速应抑横条。
risk: |
  面密度周期波动 → 压实与容量一致性；外观不可接受。
countermeasures:
  - 纵：低粘低速、高表面张力、厚涂层、大间隙；平衡供浆与涂布量
  - 横：减振防共振、稳张力/车速、提负压、减间隙、护弯液面
upstream_links:
  - "浆料粘弹性/表面张力 → 涂布窗口"
  - "设备振动与张力控制 → 弯液面调制"
  - "片幅质量 → 缺陷遗传"
downstream_links:
  - "周期面密度 → MT.PROC.PRESS 板形/色差"
  - "一致性差 → MT.FAIL.CAP / MT.QA.SPC"
  - "外观 → MT.FAIL.APPEAR"
mechanism_node_id: MT.PROC.COAT
diagram_refs: []
verification_status: open
confidence: 0.62  # 教材归纳；未经本项目现场闭环
source: literature
sensitivity: public
sample: false
tags: [coating, ribbing, vibration, capillary]
evidence: |
  书卷2 §5.4.3(2)(3) 纵条道/横条道（OCR 改写）。
```

> 说明：本卡为教材知识改写，`verification_status: open`；现场闭环后升 `verified`/`falsified`。

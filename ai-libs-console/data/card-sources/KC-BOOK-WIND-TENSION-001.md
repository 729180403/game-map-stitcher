# 卷绕张力失控致内部褶皱/螺旋/中心孔反弹

```yaml
card_id: KC-BOOK-WIND-TENSION-001
title: "卷绕张力失控致内部褶皱/螺旋/中心孔反弹"
phenomenon: |
  卷绕电芯内部褶皱、隔膜中心孔反弹、端面螺旋；方形片式卷针张力类正弦大幅波动。
causes:
  direct:
    - 张力过大：塑性拉伸、内部褶皱、中心孔反弹
    - 张力过小：松卷、无法正常卷绕
    - 纠偏失效：螺旋错位
  indirect:
    - 恒角速度片式卷针线速度波动大；未预留循环膨胀空间
mechanism: |
  方形卷绕几何导致线速度/张力周期尖峰；过大张力在电芯内部产生过压褶皱，纠偏差则轴向错层成螺旋。
  可检验预测：恒张力/逐圈减张力与数字张力控制应压低褶皱与螺旋 X-ray 不良率。
risk: |
  安全与空间利用率下降；负极包覆失效析锂；短路风险。
countermeasures:
  - 张力窗口（书述示例：隔膜约 0.3–1 N，极片约 0.4–1.5 N，需按本线标定）
  - 卷针公转/凸轮/数字控制抑波动；EPC 纠偏
  - 极耳/头尾贴胶防毛刺刺膜；短路在线检
upstream_links:
  - "MT.PROC.PRESS 极片强韧性 → 抗张力损伤"
  - "卷针几何与张力伺服 → 波动幅值"
  - "分切毛刺 → 贴胶防护需求"
downstream_links:
  - "褶皱/螺旋 → MT.FAIL.SC / 析锂"
  - "松紧度差 → 注液浸润与厚度一致性"
  - "X-ray 不良 → 报废"
mechanism_node_id: MT.PROC.ASSY.WIND
diagram_refs: []
verification_status: open
confidence: 0.62  # 教材归纳；未经本项目现场闭环
source: literature
sensitivity: public
sample: false
tags: [winding, tension, wrinkle, spiral]
evidence: |
  书卷3 §8.1.1 工艺参数与缺陷、图8-5/8-6（OCR 改写）。
```

> 说明：本卡为教材知识改写，`verification_status: open`；现场闭环后升 `verified`/`falsified`。

# 辊压板形缺陷：波浪/瓢曲/侧弯/褶皱/裂边

```yaml
card_id: KC-BOOK-PRESS-SHAPE-001
title: "辊压板形缺陷：波浪/瓢曲/侧弯/褶皱/裂边"
phenomenon: |
  辊压后极片出现波浪、瓢曲、侧弯、褶皱、翻边、裂边或起拱等板形不良。
causes:
  direct:
    - 辊缝不均/周期性变化；凸度与辊压力/张力失配；压下过大
    - 来料横向厚度或强度差；送料不正；卷取张力波动
  indirect:
    - 套筒不圆、轧辊粗糙度/温度不均诱发花纹与褶皱
mechanism: |
  纵横向变形不均产生残余拉压应力，薄带失稳起波/起皱；边部拉应力过大则裂边。
  可检验预测：均匀辊缝+合适凸度/张力应改善板形；降低压下、增大卷取张力使变形均匀可抑褶皱。
risk: |
  分切蛇形、卷绕褶皱、厚度 Cpk 失效；裂边掉粉刺隔膜。
countermeasures:
  - 高精度辊缝与来料厚度/强度一致性
  - 匹配辊凸度、辊压力、张力；控制套筒圆度
  - 辊压加热可减内应力反弹（书述）但需评估粘结剂窗口
upstream_links:
  - "MT.PROC.COAT 面密度/板形 → 辊压变形场"
  - "轧辊凸度与热平衡 → 横向压下分布"
  - "收放卷张力 → 失稳边界"
downstream_links:
  - "板形不良 → MT.PROC.ASSY 卷绕褶皱/螺旋"
  - "裂边毛刺 → MT.FAIL.SC"
  - "厚度不均 → MT.FAIL.CAP"
mechanism_node_id: MT.PROC.PRESS
diagram_refs: []
verification_status: open
confidence: 0.62  # 教材归纳；未经本项目现场闭环
source: literature
sensitivity: public
sample: false
tags: [calendering, flatness, wrinkle, edge-crack]
evidence: |
  书卷3 §6.8.1 表6-12 极片常见缺陷及防止措施（OCR 改写）。
```

> 说明：本卡为教材知识改写，`verification_status: open`；现场闭环后升 `verified`/`falsified`。

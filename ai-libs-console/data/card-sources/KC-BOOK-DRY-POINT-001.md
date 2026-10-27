# 干燥点过早/过晚破坏流平与粘结剂分布

```yaml
card_id: KC-BOOK-DRY-POINT-001
title: "干燥点过早/过晚破坏流平与粘结剂分布"
phenomenon: |
  烘道温度曲线显示干燥点相对预定位置前移或后移；伴随皱皮龟裂或流挂、粘结剂上下不均。
causes:
  direct:
    - 风温/风量/循环比与车速不匹配，恒速段终点偏离
  indirect:
    - 干燥过快：粘度飙升流平不足；过慢：流挂与效率下降
mechanism: |
  恒速段由外扩散控制，降速段由内扩散控制；干燥点位置决定流平时间与粘结剂随液迁移风险。
  可检验预测：提干球温度/风量或降车速应使干燥点前移；降速段宜低风速。
risk: |
  皱皮龟裂、粘结剂富集表面、涂层不均 → 掉粉与电性能波动。
countermeasures:
  - 用红外温度曲线标定干燥点；闭环调风与车速
  - 恒速段高风速、降速段低风速分段策略
  - 干燥能力与涂布产能匹配
upstream_links:
  - "涂布车速/湿厚 → 干燥负荷"
  - "送风干湿球与喷嘴布置 → 干燥场"
  - "浆料溶剂沸点 → 流平时间"
downstream_links:
  - "流平失败 → 外观弊病遗传至辊压"
  - "粘结剂迁移 → 剥离力/掉粉"
  - "残留溶剂 → 后续水分/产气耦合"
mechanism_node_id: MT.PROC.COAT
diagram_refs: []
verification_status: open
confidence: 0.62  # 教材归纳；未经本项目现场闭环
source: literature
sensitivity: public
sample: false
tags: [drying, drying-point, binder-migration]
evidence: |
  书卷2 §5.6.2–5.6.3 干燥点控制与流变缺陷预防（OCR 改写）。
```

> 说明：本卡为教材知识改写，`verification_status: open`；现场闭环后升 `verified`/`falsified`。

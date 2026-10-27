# 干燥缩孔/火山口与对流蜂窝由表面张力梯度驱动

```yaml
card_id: KC-BOOK-DRY-CRATER-001
title: "干燥缩孔/火山口与对流蜂窝由表面张力梯度驱动"
phenomenon: |
  湿膜干燥初期出现中心斑点、周围膜薄的火山口缩孔；或六角对流蜂窝纹理。
causes:
  direct:
    - 低表面张力污染点（油、脂、不溶硅、尘粒）引发径向铺展流
    - 蒸发致表面降温 → 密度/表面张力梯度 → 对流蜂窝
  indirect:
    - 表面活性剂过量超过溶解极限亦可致缩孔；层间表面张力差过大
mechanism: |
  流体自发从低表面张力区流向高张力区；薄涂层以张力梯度为主，厚涂层以密度梯度为主。
  可检验预测：清洁空气与抑尘降低孔洞；减薄/提粘/合适用表面活性剂降低缩孔；降干燥速率或改溶剂挥发序列抑蜂窝。
risk: |
  针孔/露底 → 腐蚀、短路、外观报废。
countermeasures:
  - 清洁空气；浆料消泡过滤；控制油污源
  - 合理表面活性剂用量（避免过量）；匹配层间张力
  - 调干燥速率与溶剂体系；提高表面/整体粘度
upstream_links:
  - "涂布后湿膜流平窗口 → 干燥前缺陷愈合"
  - "环境尘/油 → 成核点"
  - "干燥温度梯度 → 对流驱动力"
downstream_links:
  - "孔洞 → MT.FAIL.APPEAR / 局部露箔"
  - "针孔遗传 → 辊压凹陷、分切粉尘"
  - "短路风险 → MT.FAIL.SC"
mechanism_node_id: MT.PROC.COAT
diagram_refs: []
verification_status: open
confidence: 0.62  # 教材归纳；未经本项目现场闭环
source: literature
sensitivity: public
sample: false
tags: [drying, crater, Benard, surface-tension]
evidence: |
  书卷2 §5.6.3.2 表面张力弊病与对流蜂窝（OCR 改写）。
```

> 说明：本卡为教材知识改写，`verification_status: open`；现场闭环后升 `verified`/`falsified`。

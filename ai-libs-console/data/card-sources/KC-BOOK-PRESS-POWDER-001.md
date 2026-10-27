# 辊压掉粉粘辊与表面颗粒突起

```yaml
card_id: KC-BOOK-PRESS-POWDER-001
title: "辊压掉粉粘辊与表面颗粒突起"
phenomenon: |
  轧辊粘粉、极片表面颗粒突起/凹陷；刷粉吸尘后仍反复出现。
causes:
  direct:
    - 活性物质滑移/吸潮 + 辊面静电导致掉粉粘辊再转印
    - 粘结性不足或局部过厚导致辊压脱粉
  indirect:
    - 压下过大；辊面光洁度差
mechanism: |
  脱落粉体粘辊后周期性转印形成突起；漏涂/气泡区辊压后成凹陷。
  可检验预测：启用可靠刮粉/吸尘并提高粘结性后突起密度下降；故意提高压下应增多脱粉。
risk: |
  颗粒刺穿隔膜 → 自放电/内短路；容量与安全下降。
countermeasures:
  - 轧辊除粉装置（一体/分体刮粉）可靠压靠
  - 提高粘结性、辊面光洁；控制压下均匀
  - 分切前碳纤维毛刷+真空除尘
upstream_links:
  - "MT.MAT.ELEC.BIND 粘结力 → 抗掉粉"
  - "辊压静电/湿度 → 粘辊"
  - "涂布气泡/漏涂 → 凹陷源"
downstream_links:
  - "粉尘/突起 → MT.FAIL.SC / 自放电"
  - "表面缺陷 → 分切粉尘叠加"
  - "安全裕度下降 → MT.QA.OQC"
mechanism_node_id: MT.PROC.PRESS
diagram_refs: []
verification_status: open
confidence: 0.62  # 教材归纳；未经本项目现场闭环
source: literature
sensitivity: public
sample: false
tags: [calendering, powder-drop, dust, short-risk]
evidence: |
  书卷3 §6.7.2 刷粉吸尘与 §6.8.1 颗粒突起/粉体脱落（OCR 改写）。
```

> 说明：本卡为教材知识改写，`verification_status: open`；现场闭环后升 `verified`/`falsified`。

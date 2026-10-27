# 涂布拉丝/细条道（铅笔道）由颗粒或气泡污染弯液面

```yaml
card_id: KC-BOOK-COAT-STREAK-001
title: "涂布拉丝/细条道（铅笔道）由颗粒或气泡污染弯液面"
phenomenon: |
  沿涂布方向出现细条纹（拉丝/铅笔道）；与整体毛细稳定性无关的局部缺陷。
causes:
  direct:
    - 片幅/浆料/空气夹带颗粒或气泡污染涂布头表面或下游弯液面
    - 干粘结剂在条缝出口/间隙残留；涂布头缺口等效颗粒
  indirect:
    - 多层涂布相邻层流速差过大放大冲击
mechanism: |
  大颗粒/团聚体撞击下游弯液面，局部破坏膜厚连续性，沿机向拖出细条道。
  可检验预测：加强头前过滤与头清洁后条道密度应下降；故意引入标定颗粒应复现条道。
risk: |
  局部缺料/露箔 → 容量/安全；外观报废。
countermeasures:
  - 浆料过滤 + 涂布头处二次过滤；消泡；机头卫生防锈
  - 片幅清洁器；适当加宽条缝/间隙；减小层间流速差
  - 在线清除污染
upstream_links:
  - "MT.PROC.COAT 头几何/清洁度 → 弯液面完整性"
  - "浆料过滤/消泡 → 颗粒负荷"
  - "片幅来料清洁度 → 污染源"
downstream_links:
  - "条道 → MT.FAIL.APPEAR / 局部露箔"
  - "缺料区 → MT.FAIL.CAP / 短路风险点"
  - "不良流入辊压放大掉粉"
mechanism_node_id: MT.PROC.COAT
diagram_refs: []
verification_status: open
confidence: 0.62  # 教材归纳；未经本项目现场闭环
source: literature
sensitivity: public
sample: false
tags: [coating, streak, pencil-line, filter]
evidence: |
  书卷2 §5.4.3(1) 拉丝和细条道（OCR 改写）。
```

> 说明：本卡为教材知识改写，`verification_status: open`；现场闭环后升 `verified`/`falsified`。

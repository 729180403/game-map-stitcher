# 正极 NMP 浆料微量水分破坏分散电位窗口

```yaml
card_id: KC-BOOK-SLURRY-H2O-NMP-001
title: "正极 NMP 浆料微量水分破坏分散电位窗口"
phenomenon: |
  正极有机体系浆料出现异常增稠、聚团沉降或批次间流变漂移；无明显配方变更。
causes:
  direct:
    - 体系微量水分先升后降改变颗粒表面电位，越过稳定区
  indirect:
    - 溶剂/粉体吸潮；搅拌敞口；原料带水
mechanism: |
  非水体系中微量水离解吸附可先抬升表面电位（利于分散），过量后电位回落导致聚团沉降。
  可检验预测：同一浆料阶梯加湿，Zeta/流变应先稳后失稳；严格控水应压低漂移。
risk: |
  涂布窗口漂移、条道/气泡增多；极片导电网络与粘结一致性变差。
countermeasures:
  - 正极制浆严格控水（原料、溶剂、环境露点）
  - 浆料锅密封与恒温输送；IQC 溶剂水分
  - 异常增稠先查水分再改配方
upstream_links:
  - "MT.QA.IQC 溶剂/粉体水分 → 浆料电位"
  - "环境露点/敞口搅拌 → 吸潮速率"
  - "MT.MAT.ELEC.CAT 表面化学 → 对水敏感度"
downstream_links:
  - "失稳浆料 → MT.PROC.COAT 涂布弊病"
  - "团聚 → 辊压掉粉 / 面电阻升高"
  - "批次漂移 → MT.QA.SPC 告警"
mechanism_node_id: MT.PROC.COAT
diagram_refs: []
verification_status: open
confidence: 0.62  # 教材归纳；未经本项目现场闭环
source: literature
sensitivity: public
sample: false
tags: [slurry, NMP, moisture, cathode, dispersion]
evidence: |
  书卷2 第4章：水分对非水悬浮液电位及正极控水（OCR 改写）。
```

> 说明：本卡为教材知识改写，`verification_status: open`；现场闭环后升 `verified`/`falsified`。

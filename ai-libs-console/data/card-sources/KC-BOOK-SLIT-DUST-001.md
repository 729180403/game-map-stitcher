# 分切粉尘粒径控制与自放电

```yaml
card_id: KC-BOOK-SLIT-DUST-001
title: "分切粉尘粒径控制与自放电"
phenomenon: |
  分切后极片表面残留粉尘；自放电升高但未必立即硬短路。
causes:
  direct:
    - 剪切区拉伸使涂层边缘掉粉；毛刺/翻边伴生粉尘
    - 粘结性差、环境尘污染
  indirect:
    - 垂直/水平间隙不当延长撕裂区（翻边）
mechanism: |
  粉尘以突出点接触隔膜，反复膨胀收缩磨损/微短路，表现为自放电；过大颗粒可刺穿。
  可检验预测：刷粉+真空后残留最大粒径下降，自放电分布改善；书述卷绕前表面粉尘最大颗粒度控制示例约 <8 μm（须按本厂标校准）。
risk: |
  自放电批次；离子扩散路径增长降效率；极端刺穿短路。
countermeasures:
  - 提粘结、减毛刺翻边、环境洁净
  - 毛刷+真空除尘；粒径/数量抽检门禁
upstream_links:
  - "剪切间隙/刃态 → 掉粉量"
  - "涂层粘结性 → 粉尘源强度"
  - "环境洁净度 → 外源尘"
downstream_links:
  - "粉尘 → 自放电 / MT.FAIL.SC"
  - "层间距增大 → 倍率/效率下降"
  - "流入卷绕 → 装配短路检出"
mechanism_node_id: MT.FAIL.SC
diagram_refs: []
verification_status: open
confidence: 0.62  # 教材归纳；未经本项目现场闭环
source: literature
sensitivity: public
sample: false
tags: [slitting, dust, self-discharge, clean]
evidence: |
  书卷3 §7.6 粉尘与翻边及影响（OCR 改写）。
```

> 说明：本卡为教材知识改写，`verification_status: open`；现场闭环后升 `verified`/`falsified`。

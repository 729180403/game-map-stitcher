# 分切毛刺刺穿隔膜引发短路与自放电

```yaml
card_id: KC-BOOK-SLIT-BURR-001
title: "分切毛刺刺穿隔膜引发短路与自放电"
phenomenon: |
  分切后边缘毛刺超标；Hi-pot/导通检或搁置后自放电升高；严重者装壳即短路。
causes:
  direct:
    - 剪刃钝、润滑不良、水平间隙过大 → 撕裂面增大、毛刺增多
    - 单面涂或纯箔剪切毛刺更显著
  indirect:
    - 隔膜变薄、壳体压紧使临界毛刺高度下降
mechanism: |
  尖而薄毛刺垂直集流体平面更易刺隔膜；充放电膨胀/注液溶胀拉近极片-隔膜间距，使更短毛刺陆续导通。
  可检验预测：优化刃口与水平间隙后毛刺高度与自放电率应同降；水平间隙增大实验可见自放电趋势上升（书述）。
risk: |
  内短路、膨胀起火路径；高温下隔膜强度下降风险放大。
countermeasures:
  - 保持刃口锋利与润滑；合理水平/垂直间隙
  - 辊边压平、边缘涂胶/贴胶、等离子体去毛刺等后处理（按产线）
  - 导通/缝隙电流法抽检毛刺高度
upstream_links:
  - "MT.PROC.PRESS 板形/粘结 → 剪切断面质量"
  - "刀具间隙与刃态 → 毛刺形态"
  - "隔膜厚度/强度 → 刺穿阈值"
downstream_links:
  - "毛刺 → MT.FAIL.SC / 自放电"
  - "装壳后才暴露的微短路 → 老化筛选"
  - "安全事故链 → 热失控前兆"
mechanism_node_id: MT.FAIL.SC
diagram_refs: []
verification_status: open
confidence: 0.62  # 教材归纳；未经本项目现场闭环
source: literature
sensitivity: public
sample: false
tags: [slitting, burr, separator, short, self-discharge]
evidence: |
  书卷3 §7.6.1–7.6.2 毛刺成因、检测与影响（OCR 改写）。
```

> 说明：本卡为教材知识改写，`verification_status: open`；现场闭环后升 `verified`/`falsified`。

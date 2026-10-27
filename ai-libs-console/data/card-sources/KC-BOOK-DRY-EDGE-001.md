# 涂布干燥厚边/画框：边缘浓缩驱动物料外流

```yaml
card_id: KC-BOOK-DRY-EDGE-001
title: "涂布干燥厚边/画框：边缘浓缩驱动物料外流"
phenomenon: |
  间歇或条带涂布边缘超高（厚边/画框），中心相对变薄。
causes:
  direct:
    - 边缘弧形薄膜先浓缩，固体表面张力高于溶剂，物料向边缘迁移
  indirect:
    - 无量纲间隙过大扩大边缘影响区；干燥过快放大梯度
mechanism: |
  边缘先变薄→浓缩快→边缘表面张力升高→物料由低张力区流向边缘，正反馈形成厚边。
  可检验预测：提高粘度、减薄湿膜、表面活性剂抹平张力差应减弱厚边；减小无量纲间隙缩小影响宽度。
risk: |
  边缘超厚 → 辊压裂边/翻边；装配对齐与短路裕度恶化。
countermeasures:
  - 提粘、减湿厚、用表面活性剂
  - 优化模头间隙与边缘几何；匹配干燥速率
upstream_links:
  - "条缝模头间隙/拉伸比 → 边缘初形"
  - "浆料粘度与表面活性剂 → 流动阻力"
  - "干燥蒸发场 → 浓缩速率"
downstream_links:
  - "厚边 → MT.PROC.PRESS 裂边/翻边"
  - "边缘应力 → MT.PROC.ASSY 对齐风险"
  - "外观/尺寸 → MT.FAIL.APPEAR"
mechanism_node_id: MT.PROC.COAT
diagram_refs: []
verification_status: open
confidence: 0.62  # 教材归纳；未经本项目现场闭环
source: literature
sensitivity: public
sample: false
tags: [drying, thick-edge, picture-frame, slot-die]
evidence: |
  书卷2 §5.6.3 厚边与画框及条缝边缘实验叙述（OCR 改写）。
```

> 说明：本卡为教材知识改写，`verification_status: open`；现场闭环后升 `verified`/`falsified`。

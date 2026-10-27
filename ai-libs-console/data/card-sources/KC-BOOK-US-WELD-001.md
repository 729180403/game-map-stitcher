# 超声波极耳焊不足/过度：剥离失效模式

```yaml
card_id: KC-BOOK-US-WELD-001
title: "超声波极耳焊不足/过度：剥离失效模式"
phenomenon: |
  极耳-集流体超声焊剥离力偏低或焊点撕裂/粘连声极；出现焊不足或焊过度。
causes:
  direct:
    - 焊不足：功率/压力/时间/振幅不足，氧化膜未破、塑性流不足
    - 焊过度：静压过大或时间过长，压痕过深甚至熔化粘连撕裂
  indirect:
    - 异种材料硬度差；仅用最大剥离力无法区分有效连接
mechanism: |
  超声摩擦清膜→塑性咬合→原子扩散；能量不足则界面未结合，能量过量则上件损伤。
  可检验预测：按失效模式分类（未结合/部分黏附/撕裂/纽扣断裂等）调参，目标落在合格撕裂带（书表9-13 思路）。
risk: |
  内阻高、虚焊掉极耳、产线复焊损伤极片。
countermeasures:
  - 功率-压力-时间-振幅窗口化；软金属防过压
  - 用失效模式而非单点最大力判级
  - 薄件在上、硬度较低件接触上声极等工艺惯例（书述）
upstream_links:
  - "极耳/箔材硬度匹配 → 焊接性"
  - "声极状态与平行度 → 能量耦合"
  - "表面氧化/油污 → 焊不足"
downstream_links:
  - "虚焊 → 内阻/断路"
  - "过焊损伤 → 毛刺与短路风险"
  - "挂 MT.PROC.ASSY.TAB"
mechanism_node_id: MT.PROC.ASSY.TAB
diagram_refs: []
verification_status: open
confidence: 0.62  # 教材归纳；未经本项目现场闭环
source: literature
sensitivity: public
sample: false
tags: [ultrasonic-weld, tab, underweld, overweld]
evidence: |
  书卷3 §9.3.5 缺陷及预防与表9-13 失效模式（OCR 改写）。
```

> 说明：本卡为教材知识改写，`verification_status: open`；现场闭环后升 `verified`/`falsified`。

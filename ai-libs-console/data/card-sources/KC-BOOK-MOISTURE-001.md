# 制程水分：HF 腐蚀与枝晶内短路路径

```yaml
card_id: KC-BOOK-MOISTURE-001
title: "制程水分：HF 腐蚀与枝晶内短路路径"
phenomenon: |
  注液前干燥后残留水偏高；化成产气异常、循环差；极端出现腐蚀与内短路。
causes:
  direct:
    - 原材料/极片/环境吸水进入电解液
    - 干燥后转运暴露再吸潮
  indirect:
    - 装配露点失控
mechanism: |
  水与锂盐反应生成强腐蚀性 HF 等，破坏 SEI/产气；杂质与水相关路径可促进枝晶生长致内短路（书安全章叙述）。
  可检验预测：提高装配控湿+缩短干极片暴露+加深注液前真空干燥，应降低化成气量与早期失效。
risk: |
  产气鼓胀、腐蚀铝塑膜内侧、枝晶短路、安全失效。
countermeasures:
  - 极片真空干燥（书示例正/负极温度时间窗，需按材料重标）
  - 分批快转装配注液；控制环境湿度
  - 降低原材料含水量；干燥前尽量少带入水
upstream_links:
  - "环境露点/包装 → 吸潮"
  - "干燥工艺能力 → 残留水"
  - "电解液盐体系 → 对水敏感性"
downstream_links:
  - "HF/产气 → MT.FAIL.SWELL / CORRODE"
  - "枝晶 → MT.FAIL.SC"
  - "与化成 SEI 质量强耦合"
mechanism_node_id: MT.PROC.FORM
diagram_refs: []
verification_status: open
confidence: 0.62  # 教材归纳；未经本项目现场闭环
source: literature
sensitivity: public
sample: false
tags: [moisture, HF, SEI, safety]
evidence: |
  书卷4 §10.3 与 §11.3.3 极片吸水安全叙述（OCR 改写）。
```

> 说明：本卡为教材知识改写，`verification_status: open`；现场闭环后升 `verified`/`falsified`。

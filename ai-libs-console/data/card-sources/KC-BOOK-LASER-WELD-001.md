# 激光焊气孔/裂纹/未焊透/咬边（壳盖封口）

```yaml
card_id: KC-BOOK-LASER-WELD-001
title: "激光焊气孔/裂纹/未焊透/咬边（壳盖封口）"
phenomenon: |
  壳盖激光焊缝出现气孔、热裂纹、未焊透/未熔合、咬边；气密失败。
causes:
  direct:
    - 气孔：铝合金表面水分解氢、低熔点元素蒸发；冷却过快来不及逸出
    - 未焊透：速度过快、功率不足、油污氧化膜
    - 咬边：过快/间隙过大/功率过高或保护气过大、收弧能量骤降
  indirect:
    - 装配间隙与高度差超限（书述经验：间隙小于熔深约15%、高度差小于熔深约25%量级）
mechanism: |
  高反射/高导热铝需足够起始功率，熔化后吸收骤增；冶金气体与应力在快速凝固中被冻结为缺陷。
  可检验预测：烘干清洁+惰保+优化脉冲波形应降气孔塌陷；降速增功率清表面应消未焊透。
risk: |
  漏液、壳体强度不足、内部热损伤隔膜。
countermeasures:
  - 焊前烘干清洁；惰性保护；控间隙用工装点固
  - 规范功率/速度/离焦；防咬边在焊透前提下采用较小功率较高焊速
upstream_links:
  - "材料焊接性（Al/不锈钢）→ 缺陷倾向"
  - "装配间隙/夹具 → 热传导路径"
  - "表面水分/油污 → 气孔源"
downstream_links:
  - "焊缝缺陷 → MT.FAIL.LEAK"
  - "热输入过大 → 内部材料损伤"
  - "气密门禁失败 → 报废"
mechanism_node_id: MT.FAIL.LEAK
diagram_refs: []
verification_status: open
confidence: 0.62  # 教材归纳；未经本项目现场闭环
source: literature
sensitivity: public
sample: false
tags: [laser-weld, porosity, crack, can-seal]
evidence: |
  书卷3 §9.2.5–9.2.6 焊接性与缺陷预防（OCR 改写）。
```

> 说明：本卡为教材知识改写，`verification_status: open`；现场闭环后升 `verified`/`falsified`。

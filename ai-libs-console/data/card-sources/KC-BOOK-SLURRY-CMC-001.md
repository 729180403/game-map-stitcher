# 负极水性浆料 CMC 窗口失稳导致凝胶/沉降

```yaml
card_id: KC-BOOK-SLURRY-CMC-001
title: "负极水性浆料 CMC 窗口失稳导致凝胶/沉降"
phenomenon: |
  石墨水性浆料在放置或涂布前出现凝胶化、沉降或粘度失控；涂布后局部面密度波动。
causes:
  direct:
    - CMC 浓度过低：石墨疏水聚集形成颗粒凝胶
    - CMC 浓度过高：聚合物自身网络凝胶，浆料假塑性异常
  indirect:
    - SBR/CMC 竞争吸附；静置过久粘结剂网络破坏、炭黑再团聚
mechanism: |
  CMC 在石墨表面吸附产生静电/空间斥力，存在「过低聚团—适中分散—过高聚合物凝胶」窗口。
  可检验预测：在固定固含量下扫描 CMC 质量分数，流变从凝胶→类液体→再凝胶，形貌应同步变化。
risk: |
  涂布条纹/面密度波动 → 压实与容量一致性差；局部导电网络断裂抬升内阻。
countermeasures:
  - 固定剪切历史后做 CMC DOE，锁定分散窗口而非抄配方百分比
  - 控制浆料静置时间；超时复检粘度/沉降
  - 监控 SBR 与 CMC 配比，避免高 CMC 置换导致 SBR 游离
upstream_links:
  - "MT.MAT.ELEC.AN / BIND 表面极性与助剂选择 → 分散稳定性"
  - "干混/分步加溶剂工艺 → 初始网络均匀性"
  - "环境温度 → 粘度与沉降动力学"
downstream_links:
  - "浆料失稳 → MT.PROC.COAT 面密度/外观缺陷"
  - "导电网络破坏 → MT.FAIL.CAP 内阻/容量漂移"
  - "局部团聚颗粒 → 辊压掉粉风险上升"
mechanism_node_id: MT.MAT.ELEC.BIND
diagram_refs: []
verification_status: open
confidence: 0.62  # 教材归纳；未经本项目现场闭环
source: literature
sensitivity: public
sample: false
tags: [slurry, CMC, gel, anode, aqueous]
evidence: |
  书卷2 第4章 4.6.3：石墨/CMC/SBR 浓度窗口叙述（OCR 改写）。
```

> 说明：本卡为教材知识改写，`verification_status: open`；现场闭环后升 `verified`/`falsified`。

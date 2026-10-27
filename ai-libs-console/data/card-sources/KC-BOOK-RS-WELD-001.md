# 电阻点焊飞溅/缩孔/虚焊/粘连

```yaml
card_id: KC-BOOK-RS-WELD-001
title: "电阻点焊飞溅/缩孔/虚焊/粘连"
phenomenon: |
  极耳-端子电阻点焊出现内部/外部飞溅、缩孔裂纹、电极粘连、虚焊弱焊、压痕过深或焊穿。
causes:
  direct:
    - 飞溅：热输入过大、电极压力不足、塑性环被熔核赶上
    - 缩孔：断电后过早卸压，中心凝固缺补缩
    - 虚焊：电流密度不足（分流、电极过大、压力过大降接触电阻等）
    - 粘连：电极-工件局部接触电阻过高
  indirect:
    - 表面异物、电极尖、冷却不足
mechanism: |
  点焊靠接触+体内电阻热成核；塑性环密封熔核，规范失稳则喷溅/缩孔/粘连。
  可检验预测：保压延长/提电极力抑缩孔；适度降电流时间+提压力抑飞溅；增电流时间或减压力/点距纠虚焊。
risk: |
  连接强度不足、表面烧蚀污染、后续封装漏液路径。
countermeasures:
  - 表面清理与预热；硬规范匹配材料
  - 电极平行光洁冷却；点距足够防分流
  - 外观+破坏性抽检识别虚焊（塑性环不完整等）
upstream_links:
  - "材料电阻率/导热 → 生热散热"
  - "电极几何与冷却 → 电流密度场"
  - "表面态 → 接触电阻"
downstream_links:
  - "虚焊 → 内阻/断路"
  - "飞溅异物 → MT.FAIL.SC"
  - "压痕过深 → 疲劳薄弱"
mechanism_node_id: MT.PROC.ASSY.TAB
diagram_refs: []
verification_status: open
confidence: 0.62  # 教材归纳；未经本项目现场闭环
source: literature
sensitivity: public
sample: false
tags: [resistance-weld, splash, cold-weld, tab]
evidence: |
  书卷3 §9.4.5 缺陷及预防（OCR 改写）。
```

> 说明：本卡为教材知识改写，`verification_status: open`；现场闭环后升 `verified`/`falsified`。

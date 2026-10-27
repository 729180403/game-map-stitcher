# 铝塑膜热封窗口失配致虚封/过熔漏液

```yaml
card_id: KC-BOOK-SEAL-WINDOW-001
title: "铝塑膜热封窗口失配致虚封/过熔漏液"
phenomenon: |
  软包热封后拉力不足、漏液、封边变形烧焦或半切断；极耳处更易出问题。
causes:
  direct:
    - T/P/t 低于窗口：CPP 未充分熔合
    - 温度近上限或超时：PP 过熔溢出、微裂纹、烧焦变形
    - 压力过低强度不够；过高挤走热封料形成半切断
  indirect:
    - 注液残留污染封口；极耳被电解液长期腐蚀；层间粘结不足分层
mechanism: |
  热量经 ON→Al→CPP/极耳胶传递，封头显示温度通常高于界面实际约 10℃ 量级（书述）；
  窗口内大分子扩散缠结成封，窗外则虚封或过熔。
  可检验预测：在熔限内扫描 T 应出现拉力峰后回落；顶封因极耳胶需更高设定（书示例侧/底约 185℃、顶约 215±5℃，须按本厂膜材重标定）。
risk: |
  MT.FAIL.LEAK；短路（极耳触 Al）；客户漏液投诉。
countermeasures:
  - 按 DSC/TG 定熔限再 DOE 拉力窗口；宁低时长短热辐射影响
  - 凹凸模控封后厚度，防极耳触铝箔短路
  - 清洁封口、控预留位；铁氟龙/硅胶条保护封头
upstream_links:
  - "MT.PKG.AL.STACK / MAT.ALF CPP 熔限 → 窗口"
  - "封头温度场与压力均匀性 → 局部虚封"
  - "注液污染/极耳胶 → 顶封难点"
downstream_links:
  - "虚封/过熔 → MT.FAIL.LEAK / CORRODE"
  - "半切断 → 绝缘失效短路"
  - "挂 MT.PKG.AL.SEALIF 与 MT.PKG.SEAL.*"
mechanism_node_id: MT.PKG.AL.SEALIF
diagram_refs:
  - media/li-ion-diagrams/al-laminate-cross-section-v0.svg
verification_status: open
confidence: 0.62  # 教材归纳；未经本项目现场闭环
source: literature
sensitivity: public
sample: false
tags: [heat-seal, pouch, CPP, leak, peel-strength]
evidence: |
  书卷3 §9.5 热封装原理、窗口、拉力与漏液原因（OCR 改写）。
```

> 说明：本卡为教材知识改写，`verification_status: open`；现场闭环后升 `verified`/`falsified`。

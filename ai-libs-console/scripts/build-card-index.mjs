#!/usr/bin/env node
/**
 * Build data/card-index.json from store book cards (paraphrased panels).
 * Prefer AI-LIBS_STORE_CARDS / relative store path; fall back to bundled sources.
 */
import { readdir, readFile, writeFile, access } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outPath = join(root, "data", "card-index.json");
const bundledDir = join(root, "data", "card-sources");

const STORE_CANDIDATES = [
  process.env.AI_LIBS_STORE_CARDS,
  "/cursor/stores/bc-3f217468-becb-43a9-8969-3cd20dcacf05/docs/books/li-ion-mfg-process/cards",
  resolve(root, "../../cursor/stores/bc-3f217468-becb-43a9-8969-3cd20dcacf05/docs/books/li-ion-mfg-process/cards"),
  bundledDir
].filter(Boolean);

const DIAGRAM_ELECTRODE = "assets/diagrams/electrode-coat-dry-press-wind-v0.svg";
const DIAGRAM_FILL = "assets/diagrams/electrolyte-fill-wetting-v1.svg";
const DIAGRAM_SEAL = "assets/diagrams/al-laminate-cross-section-v0.svg";

/** @type {Record<string, { src: string, title: string, caption: string }>} */
const DIAGRAM_BY_PREFIX = {
  "MT.PROC.FILL": {
    src: DIAGRAM_FILL,
    title: "注液与浸润示意（书对齐 v1）",
    caption: "流体输送 → 毛细/吸附浸润 → 注液量窗口。挂载 FILL 系节点。"
  },
  "MT.PKG.AL": {
    src: DIAGRAM_SEAL,
    title: "铝塑膜截面与热封界面示意",
    caption: "多层铝塑截面；热封窗口与虚封/过熔对照。挂载 PKG.AL / SEALIF。"
  },
  "MT.PROC.COAT": {
    src: DIAGRAM_ELECTRODE,
    title: "极片涂布—干燥—辊压—卷绕主线",
    caption: "涂布/干燥弊病与下游辊压卷绕遗传。挂载 COAT 系。"
  },
  "MT.PROC.PRESS": {
    src: DIAGRAM_ELECTRODE,
    title: "极片涂布—干燥—辊压—卷绕主线",
    caption: "辊压板形/掉粉落在主线中段。挂载 PRESS。"
  },
  "MT.PROC.ASSY.WIND": {
    src: DIAGRAM_ELECTRODE,
    title: "极片涂布—干燥—辊压—卷绕主线",
    caption: "卷绕张力与褶皱落在主线末端。挂载 ASSY.WIND。"
  },
  "MT.PROC.ASSY": {
    src: DIAGRAM_ELECTRODE,
    title: "极片涂布—干燥—辊压—卷绕主线",
    caption: "装配短路/极耳焊：复用极片主线作工艺上下文（暂无专图）。"
  },
  "MT.PROC.FORM": {
    src: DIAGRAM_FILL,
    title: "注液与浸润示意（书对齐 v1）",
    caption: "化成/水分与注液浸润强耦合；暂复用注液示意作上下文。"
  },
  "MT.FAIL.SC": {
    src: DIAGRAM_ELECTRODE,
    title: "极片涂布—干燥—辊压—卷绕主线",
    caption: "毛刺/粉尘/制程耦合短路：复用极片主线（分切—卷绕区）。"
  },
  "MT.FAIL.LEAK": {
    src: DIAGRAM_SEAL,
    title: "铝塑膜截面与热封界面示意",
    caption: "激光焊/漏液：复用铝塑截面示意作封装气密上下文。"
  },
  "MT.MAT.ELEC": {
    src: DIAGRAM_ELECTRODE,
    title: "极片涂布—干燥—辊压—卷绕主线",
    caption: "浆料粘结剂窗口：复用极片主线上游涂布入口。"
  }
};

/** Fallback Chinese keyword bags (search aliases). */
const EXTRA_KEYWORDS = {
  "KC-BOOK-SLURRY-CMC-001": ["浆料", "制浆", "CMC", "凝胶", "沉降", "负极", "水性", "粘度", "SBR"],
  "KC-BOOK-SLURRY-H2O-NMP-001": ["浆料", "NMP", "正极", "水分", "分散", "增稠", "聚团", "露点"],
  "KC-BOOK-COAT-STREAK-001": ["涂布", "拉丝", "铅笔道", "细条道", "弯液面", "过滤", "气泡"],
  "KC-BOOK-COAT-RIBBON-001": ["涂布", "纵条道", "横条道", "条道", "振动", "毛细", "面密度"],
  "KC-BOOK-DRY-CRATER-001": ["干燥", "缩孔", "火山口", "蜂窝", "表面张力", "针孔"],
  "KC-BOOK-DRY-EDGE-001": ["干燥", "厚边", "画框", "边缘", "条缝", "辊压裂边"],
  "KC-BOOK-DRY-POINT-001": ["干燥点", "流平", "粘结剂迁移", "烘道", "车速"],
  "KC-BOOK-PRESS-SHAPE-001": ["辊压", "板形", "波浪", "瓢曲", "侧弯", "褶皱", "裂边", "辊缝"],
  "KC-BOOK-PRESS-POWDER-001": ["辊压", "掉粉", "粘辊", "颗粒突起", "刷粉", "吸尘"],
  "KC-BOOK-SLIT-BURR-001": ["分切", "毛刺", "隔膜", "短路", "自放电", "刃口", "Hi-pot"],
  "KC-BOOK-SLIT-DUST-001": ["分切", "粉尘", "粒径", "自放电", "除尘", "刷粉"],
  "KC-BOOK-WIND-TENSION-001": ["卷绕", "张力", "褶皱", "螺旋", "中心孔", "纠偏", "X-ray"],
  "KC-BOOK-ASSY-SHORT-001": ["装配", "短路", "异物", "掉粉", "隔膜破损", "入壳", "贴胶"],
  "KC-BOOK-LASER-WELD-001": ["激光焊", "气孔", "裂纹", "未焊透", "咬边", "壳盖", "气密"],
  "KC-BOOK-US-WELD-001": ["超声波", "极耳焊", "剥离", "焊不足", "焊过度", "虚焊"],
  "KC-BOOK-RS-WELD-001": ["电阻焊", "点焊", "飞溅", "缩孔", "虚焊", "粘连", "极耳"],
  "KC-BOOK-SEAL-WINDOW-001": ["热封", "铝塑", "虚封", "过熔", "拉力", "窗口", "漏液", "二封"],
  "KC-BOOK-FILL-WET-001": ["注液", "浸润", "电解液", "真空", "静置", "气胀", "化成"],
  "KC-BOOK-FORM-GASPATH-001": ["化成", "预化成", "气路", "SEI", "夹紧", "软包", "产气"],
  "KC-BOOK-MOISTURE-001": ["水分", "吸水", "HF", "露点", "干燥", "枝晶", "腐蚀"],
  "KC-BOOK-SAFE-PROCESS-001": ["安全", "热失控", "厚度不均", "毛刺", "灰尘", "吸水", "一致性"]
};

const VM_POOLS = {
  slurry: [
    { id: "VM-SLURRY-01", name: "黏度法表征分散", use: "固定剪切下粘度趋势；分散不足 vs 固含量漂移" },
    { id: "VM-SLURRY-02", name: "刮板细度 / 粒度", use: "团聚/硬颗粒上限；涂布拉丝前筛查" },
    { id: "VM-SLURRY-03", name: "同高度固含量沉降", use: "静置稳定性与持浆窗口" },
    { id: "VM-SLURRY-04", name: "真空脱气与过滤关卡", use: "气泡/ grit 门禁；头前二次过滤" }
  ],
  coat: [
    { id: "VM-COAT-01", name: "涂布弊病分型点检", use: "拉丝/纵横条道/气泡分型与机向判定" },
    { id: "VM-COAT-02", name: "润湿与流平窗口", use: "接触角与流平；缩孔前兆" },
    { id: "VM-COAT-03", name: "缩孔/蜂窝/画框筛查", use: "干燥张力梯度类缺陷" },
    { id: "VM-COAT-04", name: "面密度点检", use: "条道/厚边导致的面密度波动" }
  ],
  press: [
    { id: "VM-PRESS-01", name: "辊缝弹跳厚度控制", use: "厚度 SPC 与弹跳补偿" },
    { id: "VM-PRESS-02", name: "压实密度/空隙窗口", use: "压实 vs 孔隙 → 下游浸润" },
    { id: "VM-PRESS-04", name: "板形/表面缺陷标准板", use: "波浪/褶皱/突起对照" },
    { id: "VM-EL-ADH-01", name: "剥离/划格/超声掉粉", use: "粘结不足 → 掉粉粘辊" }
  ],
  slit: [
    { id: "VM-SLIT-01", name: "毛刺与切口质量", use: "毛刺高度/形貌；间隙与刃态" },
    { id: "VM-SHORT-01", name: "卷绕后短路/绝缘", use: "毛刺粉尘导致的微短路门禁" },
    { id: "VM-FORM-01", name: "老化电压降甄别", use: "自放电批次筛选" },
    { id: "VM-SAFE-01", name: "安全抽检入口", use: "短路风险升安全项" }
  ],
  wind: [
    { id: "VM-ASSY-01", name: "微焦 X 射线覆盖/对齐", use: "褶皱/螺旋/错位" },
    { id: "VM-SHORT-01", name: "卷绕后短路/绝缘", use: "张力失控致刺膜风险" },
    { id: "VM-CONS-01", name: "一致性指标", use: "松紧度差异批次" }
  ],
  assy: [
    { id: "VM-SHORT-01", name: "卷绕后短路/绝缘", use: "装配短路抽检" },
    { id: "VM-ASSY-01", name: "微焦 X 射线覆盖/对齐", use: "异物/错位/破膜" },
    { id: "VM-SAFE-01", name: "安全抽检入口", use: "漏检短路升安全项" }
  ],
  weld: [
    { id: "VM-WELD-01", name: "盖板/极耳焊接剥离", use: "焊不足/过焊失效模式" },
    { id: "VM-LEAK-01", name: "气密性筛查", use: "壳盖焊漏液" },
    { id: "VM-SHORT-01", name: "短路/绝缘", use: "飞溅异物短路" }
  ],
  seal: [
    { id: "VM-PEEL-SEAL-01", name: "铝塑热封拉力", use: "虚封/过熔窗口峰" },
    { id: "VM-PEEL-SEAL-05", name: "热封窗口 DOE", use: "T/P/t 扫描与侧底顶差异" },
    { id: "VM-LEAK-01", name: "气密性筛查", use: "漏液放行" }
  ],
  fill: [
    { id: "VM-FILL-MASS-01", name: "注液称重 SPC", use: "注液量窗口" },
    { id: "VM-FILL-VAC-01", name: "真空曲线 / 壳体变形点检", use: "Δp 与过压变形" },
    { id: "VM-FILL-WET-01", name: "静置×真空 DOE + 剖检", use: "浸润不足证伪" },
    { id: "VM-H2O-01", name: "水分与露点", use: "气胀根因分流" }
  ],
  form: [
    { id: "VM-H2O-01", name: "水分与露点", use: "产气/HF 路径" },
    { id: "VM-FORM-01", name: "老化电压降甄别", use: "化成后自放电" },
    { id: "VM-GRADE-01", name: "分容全检", use: "容量/IR/厚度/外观" },
    { id: "VM-SAFE-01", name: "安全抽检入口", use: "水分/枝晶安全项" }
  ],
  safe: [
    { id: "VM-SAFE-01", name: "安全抽检入口", use: "热失控前兆筛查" },
    { id: "VM-CONS-01", name: "一致性指标", use: "短板放大风险" },
    { id: "VM-SLIT-01", name: "毛刺与切口", use: "制程缺陷输入" },
    { id: "VM-H2O-01", name: "水分与露点", use: "吸水耦合" }
  ]
};

function pickVmPool(cardId, nodeId) {
  if (cardId.includes("SLURRY")) return VM_POOLS.slurry;
  if (cardId.includes("COAT") || cardId.includes("DRY")) return VM_POOLS.coat;
  if (cardId.includes("PRESS")) return VM_POOLS.press;
  if (cardId.includes("SLIT")) return VM_POOLS.slit;
  if (cardId.includes("WIND")) return VM_POOLS.wind;
  if (cardId.includes("ASSY")) return VM_POOLS.assy;
  if (cardId.includes("LASER") || cardId.includes("US-WELD") || cardId.includes("RS-WELD")) return VM_POOLS.weld;
  if (cardId.includes("SEAL")) return VM_POOLS.seal;
  if (cardId.includes("FILL")) return VM_POOLS.fill;
  if (cardId.includes("MOISTURE") || cardId.includes("FORM")) return VM_POOLS.form;
  if (cardId.includes("SAFE")) return VM_POOLS.safe;
  if (nodeId.startsWith("MT.PROC.FILL")) return VM_POOLS.fill;
  if (nodeId.startsWith("MT.PKG")) return VM_POOLS.seal;
  if (nodeId.includes("COAT") || nodeId.includes("PRESS")) return VM_POOLS.coat;
  return VM_POOLS.assy;
}

function pickDiagram(nodeId) {
  const keys = Object.keys(DIAGRAM_BY_PREFIX).sort((a, b) => b.length - a.length);
  for (const key of keys) {
    if (nodeId === key || nodeId.startsWith(`${key}.`) || nodeId.startsWith(key)) {
      return { ...DIAGRAM_BY_PREFIX[key], nodeId };
    }
  }
  return {
    src: DIAGRAM_ELECTRODE,
    title: "极片涂布—干燥—辊压—卷绕主线",
    caption: "暂无精确专图；复用极片主线作工艺上下文（命中卡片时四栏不空白）。",
    nodeId
  };
}

async function pathExists(p) {
  try {
    await access(p, constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

async function resolveCardsDir() {
  for (const p of STORE_CANDIDATES) {
    if (await pathExists(p)) return p;
  }
  if (await pathExists(bundledDir)) return bundledDir;
  throw new Error("No card sources found (store path or data/card-sources)");
}

function extractYaml(md) {
  const m = md.match(/```yaml\n([\s\S]*?)\n```/);
  if (!m) throw new Error("missing yaml block");
  return m[1];
}

function scalar(yaml, key) {
  const multi = yaml.match(new RegExp(`^${key}:\\s*\\|\\s*\\n((?:[ \\t].*\\n?)*)`, "m"));
  if (multi) {
    return multi[1]
      .split("\n")
      .map((l) => l.replace(/^[ \\t]{2}/, ""))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  }
  const quoted = yaml.match(new RegExp(`^${key}:\\s*\"([^\"]*)\"`, "m"));
  if (quoted) return quoted[1].trim();
  const plain = yaml.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
  if (!plain) return "";
  return plain[1].replace(/\s+#.*$/, "").trim().replace(/^"|"$/g, "");
}

function listUnder(yaml, parentKey, childKey) {
  // Stop at next top-level key (column-0). Avoid bare `$` with /m (it matches EOL).
  const parent = yaml.match(
    new RegExp(`^${parentKey}:\\s*\\n([\\s\\S]*?)(?=\\n[a-z_][a-z0-9_]*:)`, "m")
  );
  if (!parent) return [];
  const block = parent[1];
  if (childKey) {
    const child = block.match(
      new RegExp(`^  ${childKey}:\\s*\\n((?:[ ]{4}- .*\\n?)*)`, "m")
    );
    if (!child) return [];
    return [...child[1].matchAll(/^\s+- (.+)$/gm)].map((m) => m[1].trim());
  }
  return [...block.matchAll(/^\s+- (.+)$/gm)].map((m) => m[1].trim());
}

function topList(yaml, key) {
  const m = yaml.match(new RegExp(`^${key}:\\s*\\n((?:  - .*\\n?)*)`, "m"));
  if (!m) return [];
  return [...m[1].matchAll(/^\s+- (.+)$/gm)].map((x) => x[1].trim().replace(/^"|"$/g, ""));
}

function tagsOf(yaml) {
  const m = yaml.match(/^tags:\s*\[([^\]]*)\]/m);
  if (!m) return [];
  return m[1]
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function uniq(arr) {
  return [...new Set(arr.map((x) => String(x).trim()).filter(Boolean))];
}

function clip(s, n = 160) {
  const t = String(s || "").replace(/\s+/g, " ").trim();
  if (t.length <= n) return t;
  return `${t.slice(0, n - 1)}…`;
}

function buildKeywords(card) {
  const extras = EXTRA_KEYWORDS[card.card_id] || [];
  const fromTitle = card.title
    .split(/[：:、/（）()\s·\-]+/)
    .filter((w) => w.length >= 2);
  return uniq([
    ...extras,
    ...fromTitle,
    ...card.tags,
    card.mechanism_node_id,
    card.card_id,
    card.card_id.replace(/^KC-BOOK-/, "").replace(/-\d+$/, "")
  ]);
}

function buildPanels(card) {
  const diagram = pickDiagram(card.mechanism_node_id);
  const methods = pickVmPool(card.card_id, card.mechanism_node_id);
  const failLinks = uniq(
    [...card.downstream, ...card.upstream]
      .map((s) => {
        const m = String(s).match(/MT\.[A-Z0-9.]+/);
        return m ? m[0] : null;
      })
      .filter(Boolean)
  ).slice(0, 6);

  const why = [
    clip(card.mechanism, 180),
    ...(card.countermeasures || []).slice(0, 2)
  ];

  return {
    mechanism: {
      title: `机理 · ${card.title.split("：")[0]}`,
      summary: clip(card.mechanism, 220),
      chain: [
        {
          id: card.mechanism_node_id,
          name: card.title.split("：")[0],
          def: clip(card.mechanism, 200),
          vars: (EXTRA_KEYWORDS[card.card_id] || card.tags || []).slice(0, 5)
        },
        ...(card.upstream || []).slice(0, 2).map((u, i) => ({
          id: `UP.${i + 1}`,
          name: "上游耦合",
          def: clip(String(u).replace(/^"|"$/g, ""), 160),
          vars: []
        }))
      ],
      whyFast: why,
      hint: `推理先落点 ${card.mechanism_node_id}，再沿上下游链路展开；本面板为书源卡改写摘要。`
    },
    diagram: {
      title: diagram.title,
      caption: `${diagram.caption} · 对应卡 ${card.card_id}`,
      src: diagram.src,
      nodeId: diagram.nodeId || card.mechanism_node_id,
      mapped: true
    },
    card: {
      title: "知识卡片 / 失效挂钩",
      sample: false,
      provenance: `${card.card_id} · 教材改写`,
      card: {
        card_id: card.card_id,
        title: card.title,
        phenomenon: card.phenomenon,
        causes: card.causes.length ? card.causes : (card.upstream || []).slice(0, 3).map((u) => clip(String(u).replace(/^"|"$/g, ""), 120)),
        mechanism: card.mechanism,
        risk: card.risk,
        countermeasures: card.countermeasures,
        mechanism_node_id: card.mechanism_node_id,
        verification_status: card.verification_status || "open",
        confidence: card.confidence ?? 0.62,
        source: "literature-book-round1"
      },
      failLinks: failLinks.length ? failLinks : [card.mechanism_node_id]
    },
    verify: {
      title: "检测验证与管理",
      sourceNote: "方法 stub 对齐 verification-methods-from-book-v1 家族；按 mechanism_node / 卡族映射，非现场实测。",
      methods,
      management: [
        ...(card.countermeasures || []).slice(0, 2),
        `证据锚点：${clip(card.evidence || "book-round1 OCR 改写", 100)}`,
        "验证状态 open：现场闭环后升 verified/falsified"
      ]
    }
  };
}

function parseCardMarkdown(md, file) {
  const yaml = extractYaml(md);
  const card_id = scalar(yaml, "card_id") || file.replace(/\.md$/, "");
  const title = scalar(yaml, "title");
  const phenomenon = scalar(yaml, "phenomenon");
  const mechanism = scalar(yaml, "mechanism");
  const risk = scalar(yaml, "risk");
  const mechanism_node_id = scalar(yaml, "mechanism_node_id");
  const verification_status = scalar(yaml, "verification_status") || "open";
  const confidence = Number(scalar(yaml, "confidence")) || 0.62;
  const evidence = scalar(yaml, "evidence");
  const tags = tagsOf(yaml);
  const causes = uniq([...listUnder(yaml, "causes", "direct"), ...listUnder(yaml, "causes", "indirect")]);
  const countermeasures = topList(yaml, "countermeasures");
  const upstream = topList(yaml, "upstream_links");
  const downstream = topList(yaml, "downstream_links");
  return {
    card_id,
    title,
    phenomenon,
    mechanism,
    risk,
    causes,
    countermeasures,
    mechanism_node_id,
    verification_status,
    confidence,
    evidence,
    tags,
    upstream,
    downstream
  };
}

const cardsDir = await resolveCardsDir();
const files = (await readdir(cardsDir))
  .filter((f) => f.startsWith("KC-BOOK-") && f.endsWith(".md"))
  .sort();

if (files.length !== 21) {
  console.warn(`Expected 21 cards, found ${files.length} in ${cardsDir}`);
}

const cards = [];
for (const file of files) {
  const md = await readFile(join(cardsDir, file), "utf8");
  const parsed = parseCardMarkdown(md, file);
  const keywords = buildKeywords(parsed);
  const panels = buildPanels(parsed);
  cards.push({
    id: parsed.card_id,
    card_id: parsed.card_id,
    title: parsed.title,
    short: parsed.title.split("：")[0],
    mechanism_node: parsed.mechanism_node_id,
    tags: parsed.tags,
    keywords,
    excerpts: {
      mechanism: clip(parsed.mechanism, 140),
      diagram: clip(panels.diagram.caption, 120),
      card: clip(parsed.phenomenon, 140),
      verify: clip(panels.verify.methods.map((m) => m.name).join(" / "), 120)
    },
    nodes: uniq([parsed.mechanism_node_id, ...panels.card.failLinks]).slice(0, 6),
    panels
  });
}

const index = {
  meta: {
    product: "AI-LiBs",
    version: "v1-card-search",
    count: cards.length,
    note: "Search index over 21 book knowledge cards — paraphrased excerpts for four panels; not verbatim book text.",
    generatedBy: "scripts/build-card-index.mjs",
    sourceDir: cardsDir,
    storeRefs: [
      "docs/books/li-ion-mfg-process/cards/",
      "docs/verification-methods-from-book-v1.md",
      "media/li-ion-diagrams/"
    ]
  },
  cards
};

await writeFile(outPath, `${JSON.stringify(index, null, 2)}\n`, "utf8");
console.log(`Wrote ${outPath} (${cards.length} cards) from ${cardsDir}`);

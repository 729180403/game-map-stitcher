const PANEL_IDS = ["mechanism", "diagram", "card", "verify"];

/** @type {{ questions: any[] } | null} */
let demo = null;
/** @type {{ cards: any[] } | null} */
let cardIndex = null;
let activeQuestionId = null;
/** @type {"sample" | "card" | null} */
let activeKind = null;

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

async function loadDemo() {
  const res = await fetch("data/demo.json");
  if (!res.ok) throw new Error(`Failed to load demo.json (${res.status})`);
  demo = await res.json();
}

async function loadCardIndex() {
  const res = await fetch("data/card-index.json");
  if (!res.ok) throw new Error(`Failed to load card-index.json (${res.status})`);
  cardIndex = await res.json();
}

function renderSampleList() {
  const list = $("#sample-list");
  list.innerHTML = "";
  for (const q of demo.questions) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "sample-btn";
    btn.dataset.id = q.id;
    btn.setAttribute("role", "listitem");
    btn.innerHTML = `<span class="short">${escapeHtml(q.short)}</span>${escapeHtml(q.label)}`;
    btn.addEventListener("click", () => {
      clearSearchHits();
      selectQuestion(q.id);
    });
    list.appendChild(btn);
  }
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function selectQuestion(id, { scroll = true } = {}) {
  const q = demo.questions.find((x) => x.id === id);
  if (!q) return;
  activeQuestionId = id;
  activeKind = "sample";

  $$(".sample-btn").forEach((b) => b.classList.toggle("active", b.dataset.id === id));
  $$(".search-hit").forEach((b) => b.classList.remove("active"));
  $("#ask-input").value = q.label;
  $("#answer-title").textContent = q.short;
  $("#empty-hint").hidden = true;

  renderNodeChips(q.nodes);
  renderMechanism(q.panels.mechanism);
  renderDiagram(q.panels.diagram);
  renderCard(q.panels.card);
  renderVerify(q.panels.verify);

  showPanel("mechanism");
  if (scroll) $("#console")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function selectCard(cardId, { scroll = true, queryText = null } = {}) {
  const card = cardIndex?.cards?.find((c) => c.id === cardId || c.card_id === cardId);
  if (!card) return;
  activeQuestionId = card.id;
  activeKind = "card";

  $$(".sample-btn").forEach((b) => b.classList.remove("active"));
  $$(".search-hit").forEach((b) => b.classList.toggle("active", b.dataset.id === card.id));
  if (queryText != null) $("#ask-input").value = queryText;
  else if (!$("#ask-input").value.trim()) $("#ask-input").value = card.title;
  $("#answer-title").textContent = card.short || card.title;
  $("#empty-hint").hidden = true;

  renderNodeChips(card.nodes);
  renderMechanism(card.panels.mechanism);
  renderDiagram(card.panels.diagram);
  renderCard(card.panels.card);
  renderVerify(card.panels.verify);

  showPanel("mechanism");
  if (scroll) $("#console")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderNodeChips(nodes) {
  const el = $("#node-chips");
  el.hidden = !nodes?.length;
  el.innerHTML = (nodes || [])
    .map((n) => `<span class="chip">${escapeHtml(n)}</span>`)
    .join("");
}

function renderMechanism(p) {
  const root = $("#panel-mechanism");
  const chain = (p.chain || [])
    .map(
      (c) => `<li>
        <span class="nid">${escapeHtml(c.id)}</span>
        <span class="name">${escapeHtml(c.name)}</span>
        <p class="def">${escapeHtml(c.def)}</p>
        <p class="def">Vars: ${(c.vars || []).map(escapeHtml).join(" · ") || "—"}</p>
      </li>`
    )
    .join("");
  const why = (p.whyFast || []).map((w) => `<li>${escapeHtml(w)}</li>`).join("");
  root.innerHTML = `
    <h3>${escapeHtml(p.title)}</h3>
    <p class="summary">${escapeHtml(p.summary)}</p>
    <ul class="chain">${chain}</ul>
    <h4 style="margin:1.1rem 0 0.4rem;font-size:0.9rem;color:var(--accent-soft)">要点</h4>
    <ul class="why-list">${why}</ul>
    ${p.hint ? `<div class="hint-box">${escapeHtml(p.hint)}</div>` : ""}
  `;
}

function renderDiagram(p) {
  const root = $("#panel-diagram");
  root.innerHTML = `
    <h3>${escapeHtml(p.title)}</h3>
    <p class="summary">挂载 <code class="chip" style="display:inline">${escapeHtml(p.nodeId)}</code>${
      p.mapped ? ` <span class="chip map-chip">按节点映射</span>` : ""
    }</p>
    <div class="diagram-frame">
      <object type="image/svg+xml" data="${escapeHtml(p.src)}" title="${escapeHtml(p.title)}">
        <img src="${escapeHtml(p.src)}" alt="${escapeHtml(p.title)}" />
      </object>
    </div>
    <p class="diagram-caption">${escapeHtml(p.caption)}</p>
  `;
}

function renderCard(p) {
  const root = $("#panel-card");
  const c = p.card;
  const causes = (c.causes || []).map((x) => `<li>${escapeHtml(x)}</li>`).join("");
  const cm = (c.countermeasures || []).map((x) => `<li>${escapeHtml(x)}</li>`).join("");
  const fails = (p.failLinks || []).map((f) => `<span class="chip">${escapeHtml(f)}</span>`).join(" ");
  const badge = p.sample
    ? `<span class="badge">SAMPLE · mock</span>`
    : `<span class="badge book">BOOK · ${escapeHtml(p.provenance || c.card_id || "round1")}</span>`;
  root.innerHTML = `
    <h3>${escapeHtml(p.title)}</h3>
    <div class="card-block">
      ${badge}
      <h4 style="margin:0 0 0.4rem;font-family:var(--font-display);font-size:1.05rem">${escapeHtml(c.title)}</h4>
      <p class="summary" style="margin-bottom:0.6rem"><strong style="color:var(--ink)">现象</strong> — ${escapeHtml(c.phenomenon)}</p>
      <p class="summary" style="margin-bottom:0.4rem"><strong style="color:var(--ink)">机理</strong></p>
      <p class="summary">${escapeHtml(c.mechanism)}</p>
      <p class="summary" style="margin:0.75rem 0 0.25rem"><strong style="color:var(--ink)">诱因</strong></p>
      <ul class="cause-list">${causes}</ul>
      <p class="summary" style="margin:0.75rem 0 0.25rem"><strong style="color:var(--ink)">风险</strong> — ${escapeHtml(c.risk)}</p>
      <p class="summary" style="margin:0.75rem 0 0.25rem"><strong style="color:var(--ink)">对策</strong></p>
      <ul class="cause-list">${cm}</ul>
      <div class="meta-row">
        <span>status: ${escapeHtml(c.verification_status)}</span>
        <span>confidence: ${escapeHtml(String(c.confidence))}</span>
        <span>node: ${escapeHtml(c.mechanism_node_id)}</span>
        <span>id: ${escapeHtml(c.card_id)}</span>
      </div>
      <div style="margin-top:0.75rem">${fails}</div>
    </div>
  `;
}

function renderVerify(p) {
  const root = $("#panel-verify");
  const rows = (p.methods || [])
    .map(
      (m) => `<tr>
        <td><code>${escapeHtml(m.id)}</code></td>
        <td>${escapeHtml(m.name)}</td>
        <td>${escapeHtml(m.use)}</td>
      </tr>`
    )
    .join("");
  const mgmt = (p.management || []).map((x) => `<li>${escapeHtml(x)}</li>`).join("");
  const note =
    p.sourceNote ||
    "方法条目来自 Verification Methods Catalog；书源轮次可深填判据。";
  root.innerHTML = `
    <h3>${escapeHtml(p.title)}</h3>
    <p class="summary">${escapeHtml(note)}</p>
    <table class="method-table">
      <thead><tr><th>ID</th><th>方法</th><th>用途</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <h4 style="margin:1.1rem 0 0.4rem;font-size:0.9rem;color:var(--accent-soft)">管理要点</h4>
    <ul class="mgmt-list">${mgmt}</ul>
  `;
}

function showPanel(name) {
  if (!PANEL_IDS.includes(name)) return;
  $$(".tab").forEach((t) => {
    const on = t.dataset.panel === name;
    t.classList.toggle("active", on);
    t.setAttribute("aria-selected", on ? "true" : "false");
  });
  $$(".panel").forEach((p) => {
    const on = p.dataset.panel === name;
    p.hidden = !on;
    p.classList.toggle("active", on);
  });
}

const SAMPLE_KEYWORD_HINTS = [
  "注液",
  "吸入",
  "浸润",
  "电解液",
  "真空",
  "热封",
  "铝塑",
  "二封",
  "拉力",
  "虚封",
  "过熔",
  "窗口",
  "涂布",
  "拉丝",
  "铅笔道",
  "弯液面",
  "过滤",
  "fill",
  "seal",
  "coat",
  "wetting"
];

function matchQuestion(text) {
  const t = text.trim().toLowerCase();
  if (!t) return null;
  const scored = demo.questions.map((q) => {
    const hay = `${q.label} ${q.short} ${(q.nodes || []).join(" ")} ${q.id}`.toLowerCase();
    let score = 0;
    if (hay.includes(t) || t.includes(q.short.toLowerCase())) score += 5;
    for (const key of SAMPLE_KEYWORD_HINTS) {
      if (t.includes(key) && hay.includes(key)) score += 2;
    }
    return { q, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.score > 0 ? scored[0].q : null;
}

function scoreCard(card, raw) {
  const t = raw.trim().toLowerCase();
  if (!t) return 0;
  const tokens = t.split(/[\s,，、;/|]+/).filter((x) => x.length >= 1);
  const hay = [
    card.title,
    card.short,
    card.card_id,
    card.mechanism_node,
    ...(card.keywords || []),
    ...(card.tags || []),
    card.excerpts?.mechanism,
    card.excerpts?.card,
    card.excerpts?.verify
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  let score = 0;
  if (hay.includes(t)) score += 8;
  if (card.card_id.toLowerCase() === t || card.id.toLowerCase() === t) score += 20;
  for (const tok of tokens) {
    if (tok.length < 1) continue;
    if (hay.includes(tok)) score += tok.length >= 2 ? 3 : 1;
    for (const kw of card.keywords || []) {
      const k = String(kw).toLowerCase();
      if (k === tok) score += 5;
      else if (k.includes(tok) || tok.includes(k)) score += 2;
    }
  }
  return score;
}

function searchCards(text, limit = 8) {
  if (!cardIndex?.cards?.length) return [];
  const scored = cardIndex.cards
    .map((c) => ({ c, score: scoreCard(c, text) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.c.id.localeCompare(b.c.id));
  return scored.slice(0, limit);
}

function clearSearchHits() {
  const box = $("#search-hits");
  if (!box) return;
  box.hidden = true;
  box.innerHTML = "";
}

function renderSearchHits(hits, query) {
  const box = $("#search-hits");
  if (!box) return;
  if (!hits.length) {
    box.hidden = true;
    box.innerHTML = "";
    return;
  }
  box.hidden = false;
  box.innerHTML = `
    <p class="search-hits-label">知识卡命中 ${hits.length} / 索引 ${cardIndex?.meta?.count ?? 21}</p>
    <div class="search-hit-list" role="list"></div>
  `;
  const list = box.querySelector(".search-hit-list");
  for (const { c, score } of hits) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "search-hit";
    btn.dataset.id = c.id;
    btn.setAttribute("role", "listitem");
    const kw = (c.keywords || []).slice(0, 4).join(" · ");
    btn.innerHTML = `
      <span class="short">${escapeHtml(c.card_id)} · ${escapeHtml(c.mechanism_node || "")}</span>
      <span class="hit-title">${escapeHtml(c.title)}</span>
      <span class="hit-excerpt">${escapeHtml(c.excerpts?.card || c.excerpts?.mechanism || "")}</span>
      <span class="hit-meta">${escapeHtml(kw)} · score ${score}</span>
    `;
    btn.addEventListener("click", () => selectCard(c.id, { queryText: query }));
    list.appendChild(btn);
  }
}

function clearPanels() {
  activeQuestionId = null;
  activeKind = null;
  PANEL_IDS.forEach((id) => {
    $(`#panel-${id}`).innerHTML = "";
    $(`#panel-${id}`).hidden = true;
  });
  $("#node-chips").hidden = true;
  $$(".sample-btn").forEach((b) => b.classList.remove("active"));
}

function onAsk() {
  const text = $("#ask-input").value;
  const cardHits = searchCards(text);
  renderSearchHits(cardHits, text);

  if (cardHits.length) {
    selectCard(cardHits[0].c.id, { queryText: text });
    return;
  }

  const hit = matchQuestion(text);
  if (hit) {
    clearSearchHits();
    selectQuestion(hit.id);
    return;
  }

  clearSearchHits();
  $("#empty-hint").hidden = false;
  const n = cardIndex?.meta?.count ?? 0;
  const s = demo?.questions?.length ?? 0;
  $("#empty-hint").textContent = `未命中。可搜 21 张书源卡关键词（如「辊压」「毛刺」「水分」），或点选 ${s} 条样例。当前索引 ${n} 张卡。`;
  clearPanels();
}

function onLiveSearch() {
  const text = $("#ask-input").value.trim();
  if (text.length < 1) {
    clearSearchHits();
    return;
  }
  const hits = searchCards(text, 6);
  renderSearchHits(hits, text);
}

function wireUi() {
  $("#btn-ask").addEventListener("click", onAsk);
  $("#ask-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") onAsk();
  });
  $("#ask-input").addEventListener("input", onLiveSearch);

  $$(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      if (!activeQuestionId) {
        $("#empty-hint").hidden = false;
        return;
      }
      showPanel(tab.dataset.panel);
    });
  });

  $$("[data-prompt]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!activeQuestionId) {
        if (demo.questions[0]) selectQuestion(demo.questions[0].id);
      }
      const target = btn.dataset.prompt === "diagram" ? "diagram" : "verify";
      showPanel(target);
      $("#console")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  $("#btn-sample-fill").addEventListener("click", () => {
    clearSearchHits();
    const fill = demo.questions.find((q) => q.id === "q-fill") || demo.questions[0];
    selectQuestion(fill.id);
  });
}

async function main() {
  try {
    await Promise.all([loadDemo(), loadCardIndex()]);
    renderSampleList();
    wireUi();
    const note = $(".mock-note");
    if (note && cardIndex?.meta?.count) {
      note.innerHTML = `当前为 <strong>book-round1 + 卡检索</strong>：保留 3 条样例；另可关键词检索 <strong>${cardIndex.meta.count}</strong> 张书源知识卡（改写摘要 / 示意图映射 / VM stub）。`;
    }
  } catch (err) {
    console.error(err);
    $("#empty-hint").hidden = false;
    $("#empty-hint").textContent = `加载数据失败：${err.message}。请用本地静态服务器打开（npm start），勿直接 file:// 拦 fetch。`;
  }
}

main();

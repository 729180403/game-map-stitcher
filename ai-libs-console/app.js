const PANEL_IDS = ["mechanism", "diagram", "card", "verify"];

/** @type {{ questions: any[] } | null} */
let demo = null;
let activeQuestionId = null;

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

async function loadDemo() {
  const res = await fetch("data/demo.json");
  if (!res.ok) throw new Error(`Failed to load demo.json (${res.status})`);
  demo = await res.json();
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
    btn.addEventListener("click", () => selectQuestion(q.id));
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

  $$(".sample-btn").forEach((b) => b.classList.toggle("active", b.dataset.id === id));
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
        <p class="def">Vars: ${(c.vars || []).map(escapeHtml).join(" · ")}</p>
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
    <p class="summary">挂载 <code class="chip" style="display:inline">${escapeHtml(p.nodeId)}</code></p>
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
  root.innerHTML = `
    <h3>${escapeHtml(p.title)}</h3>
    <div class="card-block">
      ${p.sample ? `<span class="badge">SAMPLE · mock</span>` : ""}
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
  root.innerHTML = `
    <h3>${escapeHtml(p.title)}</h3>
    <p class="summary">方法条目来自 Verification Methods Catalog v0（stub）；书 PDF 后可深填判据。</p>
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

function matchQuestion(text) {
  const t = text.trim().toLowerCase();
  if (!t) return null;
  const scored = demo.questions.map((q) => {
    const hay = `${q.label} ${q.short} ${(q.nodes || []).join(" ")}`.toLowerCase();
    let score = 0;
    if (hay.includes(t) || t.includes(q.short.toLowerCase())) score += 5;
    for (const key of ["注液", "吸入", "浸润", "电解液", "横纹", "铝塑", "二封", "拉力", "fill", "wrinkle"]) {
      if (t.includes(key) && hay.includes(key)) score += 2;
    }
    return { q, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.score > 0 ? scored[0].q : null;
}

function onAsk() {
  const text = $("#ask-input").value;
  const hit = matchQuestion(text);
  if (hit) {
    selectQuestion(hit.id);
    return;
  }
  $("#empty-hint").hidden = false;
  $("#empty-hint").textContent =
    "v0 仅覆盖 2 条样例（注液吸入、铝塑膜横纹）。请点选样例，或输入含「注液」「横纹」等关键词。";
  activeQuestionId = null;
  PANEL_IDS.forEach((id) => {
    $(`#panel-${id}`).innerHTML = "";
    $(`#panel-${id}`).hidden = true;
  });
  $("#node-chips").hidden = true;
}

function wireUi() {
  $("#btn-ask").addEventListener("click", onAsk);
  $("#ask-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") onAsk();
  });

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
        selectQuestion(demo.questions[0].id);
      }
      const target = btn.dataset.prompt === "diagram" ? "diagram" : "verify";
      showPanel(target);
      $("#console")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  $("#btn-sample-fill").addEventListener("click", () => {
    const fill = demo.questions.find((q) => q.id === "q-fill") || demo.questions[0];
    selectQuestion(fill.id);
  });
}

async function main() {
  try {
    await loadDemo();
    renderSampleList();
    wireUi();
  } catch (err) {
    console.error(err);
    $("#empty-hint").hidden = false;
    $("#empty-hint").textContent = `加载 demo 数据失败：${err.message}。请用本地静态服务器打开（npm start），勿直接 file:// 拦 fetch。`;
  }
}

main();

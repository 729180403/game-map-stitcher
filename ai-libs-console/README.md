# AI-LiBs Console（book-round1 + 卡检索）

可点击网页问答原型：机理 / 示意图 / 知识卡片·失效 / 检测验证·管理。  
保留 3 条书源样例，并支持对 **21** 张 `KC-BOOK-*` 知识卡做中文关键词检索。

## 运行

```bash
cd ai-libs-console
npm start
```

浏览器打开提示的地址（默认 `http://localhost:5173`）。

也可：

```bash
npm run build     # build:cards + build:demo
npx --yes serve -l 5173 .
# 或 python3 -m http.server 5173
```

> 需 HTTP 源以加载 `data/demo.json` 与 `data/card-index.json`；不建议直接双击 `file://`。

## 内容

- 样例问题 3 条：注液浸润、铝塑热封窗口、涂布拉丝（`data/excerpts/*.json`）
- 卡检索：`data/card-index.json`（`npm run build:cards`，源为 store cards 或 `data/card-sources/`）
- 示意图：`assets/diagrams/`（注液 v1 / 铝塑截面 / 涂辊卷绕主线）
- 试搜：`辊压`、`毛刺`、`水分`

## 说明

面板文案为书源结构化改写摘要，非 PDF 原文。示意图与 VM 按 `mechanism_node` / 卡族映射，命中时四栏不空白。

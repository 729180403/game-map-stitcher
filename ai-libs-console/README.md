# AI-LiBs Console（book-round1）

可点击网页问答原型：机理 / 示意图 / 知识卡片·失效 / 检测验证·管理。  
样例四栏由 **book-round1** 书源改写供数（非薄 mock、非原文整段粘贴）。

## 运行

```bash
cd ai-libs-console
npm start
```

浏览器打开提示的地址（默认 `http://localhost:5173`）。

也可任意静态服务器：

```bash
npm run build:demo   # 从 data/excerpts/* 生成 data/demo.json
npx --yes serve -l 5173 .
# 或 python3 -m http.server 5173
```

> 需 HTTP 源以加载 `data/demo.json`；不建议直接双击 `file://`。

## 内容

- 样例问题 3 条：注液浸润、铝塑热封窗口、涂布拉丝
- 摘录源：`data/excerpts/*.json` → `npm run build:demo` → `data/demo.json`
- 示意图：`assets/diagrams/`（含 `electrolyte-fill-wetting-v1.svg`、`electrode-coat-dry-press-wind-v0.svg`）
- 卡片 ID：`KC-BOOK-FILL-WET-001` / `KC-BOOK-SEAL-WINDOW-001` / `KC-BOOK-COAT-STREAK-001`

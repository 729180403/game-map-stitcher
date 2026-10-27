# AI-LiBs Console（v0）

可点击网页问答原型：机理 / 示意图 / 知识卡片·失效 / 检测验证·管理。

## 运行

```bash
cd ai-libs-console
npm start
```

浏览器打开提示的地址（默认 `http://localhost:5173`）。

也可任意静态服务器：

```bash
npx --yes serve -l 5173 .
# 或 python3 -m http.server 5173
```

> 需 HTTP 源以加载 `data/demo.json`；不建议直接双击 `file://`。

## 内容

- 样例问题 2 条：注液快速吸入、铝塑膜横纹/二封
- 演示数据：`data/demo.json`（mock，来自 Project store 文档）
- 示意图：`assets/diagrams/*.svg`

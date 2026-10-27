#!/usr/bin/env node
/**
 * Assemble data/demo.json from curated book-round1 excerpts.
 * Excerpts are paraphrased / structured rewrites — not wholesale book text.
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const excerptsDir = join(root, "data", "excerpts");
const outPath = join(root, "data", "demo.json");

const ORDER = ["q-fill", "q-seal", "q-coat"];

const files = (await readdir(excerptsDir)).filter((f) => f.endsWith(".json"));
const byId = new Map();
for (const file of files) {
  const raw = await readFile(join(excerptsDir, file), "utf8");
  const q = JSON.parse(raw);
  if (!q.id) throw new Error(`${file}: missing id`);
  byId.set(q.id, q);
}

const questions = [];
for (const id of ORDER) {
  if (!byId.has(id)) throw new Error(`Missing excerpt for ${id}`);
  questions.push(byId.get(id));
  byId.delete(id);
}
for (const [, q] of [...byId.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
  questions.push(q);
}

const demo = {
  meta: {
    product: "AI-LiBs",
    version: "v1-book-round1",
    note: "Generated from data/excerpts/* — curated paraphrases of book-round1 store cards / mechanism / VM / diagrams. Not verbatim copyrighted book text.",
    generatedBy: "scripts/build-demo.mjs",
    storeRefs: [
      "docs/book-ingest-round1-summary.md",
      "docs/mechanism-tree-from-book-v1.md",
      "docs/books/li-ion-mfg-process/cards/",
      "docs/verification-methods-from-book-v1.md",
      "media/li-ion-diagrams/"
    ]
  },
  questions
};

await writeFile(outPath, `${JSON.stringify(demo, null, 2)}\n`, "utf8");
console.log(`Wrote ${outPath} (${questions.length} questions)`);

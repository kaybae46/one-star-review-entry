// One-Star Review of Something Essential — entry program.
//
// Writes one deadpan one-star review of an everyday essential to
// /output/entry.txt (the grader sets OUTPUT_DIR; default /output).
// Gate: UTF-8 text of 1-160 characters, a single line, not only
// whitespace, no trailing newline.
//
// The review: sleep. Everyone needs it, nobody can return it, and it
// arrives in fragments while still charging the full nightly price.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REVIEW =
  "Sleep: eight hours required, delivered in fragments, and it still charges full price every single night.";

const MIN_CHARS = 1;
const MAX_CHARS = 160;
const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const text = REVIEW.trim();
if (text.length < MIN_CHARS || text.length > MAX_CHARS) {
  throw new Error(`entry out of gate: ${text.length} characters`);
}
if (/\n/.test(text)) {
  throw new Error("entry out of gate: must be a single line");
}
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, text, "utf8");
// Read back: the file must hold exactly the validated review, no
// trailing newline, no extra bytes.
if (readFileSync(outPath, "utf8") !== text) {
  throw new Error("entry.txt does not match the validated review");
}
console.log(`Wrote ${text.length} characters to ${outPath}`);

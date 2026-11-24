// One-Star Review of Something Essential
// Writes a one-line review of sleep to /output/entry.txt (no trailing newline).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Sleep: eight hours required, delivered in fragments, and it still charges full price every single night.";

const MIN_CHARS = 1;
const MAX_CHARS = 160;

const chars = [...ENTRY].length;
if (chars < MIN_CHARS || chars > MAX_CHARS) {
  throw new Error(`entry length ${chars} outside ${MIN_CHARS}-${MAX_CHARS}`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be whitespace-only");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read-back self-check: what landed on disk must match exactly.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  throw new Error("read-back mismatch: output differs from entry");
}
console.log(`Wrote ${chars} characters`);

#!/usr/bin/env node
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const src = join(root, "node_modules/@electric-sql/pglite/dist");
const dest = join(root, ".vercel/output/functions/__server.func/_libs");

if (!existsSync(dest)) {
  console.warn("[pglite] no Vercel function output — skip");
  process.exit(0);
}

mkdirSync(dest, { recursive: true });
for (const name of ["pglite.data", "pglite.wasm", "initdb.wasm"]) {
  const from = join(src, name);
  if (!existsSync(from)) {
    console.error("[pglite] missing", from);
    process.exit(1);
  }
  copyFileSync(from, join(dest, name));
  console.log("[pglite] copied", name);
}

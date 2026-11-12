// Fails (exit 1) when messages/en.json and messages/id.json do not have the
// exact same set of keys. Run with `bun run i18n:check`.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const LOCALES = ["en", "id"];

function flatten(value, prefix = "", out = new Set()) {
  if (value !== null && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      flatten(child, prefix ? `${prefix}.${key}` : key, out);
    }
  } else {
    out.add(prefix);
  }
  return out;
}

const keys = Object.fromEntries(
  LOCALES.map((locale) => {
    const file = fileURLToPath(
      new URL(`../messages/${locale}.json`, import.meta.url),
    );
    return [locale, flatten(JSON.parse(readFileSync(file, "utf8")))];
  }),
);

let failed = false;
for (const a of LOCALES) {
  for (const b of LOCALES) {
    if (a === b) continue;
    const missing = [...keys[a]].filter((key) => !keys[b].has(key)).sort();
    if (missing.length) {
      failed = true;
      console.error(
        `\n${missing.length} key(s) in ${a}.json missing from ${b}.json:`,
      );
      for (const key of missing) console.error(`  - ${key}`);
    }
  }
}

if (failed) {
  console.error("\ni18n key parity check failed.");
  process.exit(1);
}
console.log(
  `i18n key parity OK (${keys.en.size} keys in ${LOCALES.join(", ")}).`,
);

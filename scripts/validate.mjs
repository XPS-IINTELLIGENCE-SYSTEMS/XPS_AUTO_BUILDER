import fs from "node:fs";
import path from "node:path";
import { getValidationSnapshot } from "../src/lib/store.mjs";

const report = {
  generatedAt: new Date().toISOString(),
  summary: getValidationSnapshot()
};

const outFile = path.resolve(process.cwd(), "docs/validation/local-validation-report.json");
fs.writeFileSync(outFile, JSON.stringify(report, null, 2));
console.log(`Wrote ${outFile}`);


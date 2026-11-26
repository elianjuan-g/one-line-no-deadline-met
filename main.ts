import { mkdirSync, writeFileSync } from "node:fs";

const line =
  "My excuse for missing the deadline took so long to write, it became the reason I missed it.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");

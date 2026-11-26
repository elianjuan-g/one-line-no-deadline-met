import { mkdirSync, writeFileSync } from "node:fs";

const line =
  "I missed the deadline because I was busy writing the apology for missing the deadline.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const expected =
  "My excuse for missing the deadline took so long to write, it became the reason I missed it.";

execFileSync("node", ["main.ts"], { stdio: "inherit" });

const buf = readFileSync("/output/entry.txt");
const text = buf.toString("utf8");

if (buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) {
  throw new Error("UTF-8 BOM present");
}
if (text !== expected) {
  throw new Error("entry text does not match the chosen line");
}
if (Buffer.from(text, "utf8").toString("utf8") !== text) {
  throw new Error("invalid UTF-8");
}
if (text.endsWith("\n") || text.endsWith("\r")) {
  throw new Error("trailing newline");
}
if (/[\n\r]/.test(text)) {
  throw new Error("line break inside entry");
}
if (!/\S/.test(text)) {
  throw new Error("entry is blank");
}
const chars = [...text].length;
if (chars < 1 || chars > 200) {
  throw new Error("character count out of range: " + chars);
}
console.log(
  `OK: ${chars} chars, ${buf.length} bytes, single line, no trailing newline`,
);

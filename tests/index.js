import fs from "fs";
import assert from "assert";
import { WASI } from "wasi";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const binary = fs.readFileSync(join(__dirname, "index.wasm"));
const wasi = new WASI({
  args: ["1", "2", "3"],
  env: {
    "a": 97,
    "b": 98,
    "c": 99
  },
  returnOnExit: true,
  version: "preview1"
});
const { instance } = await WebAssembly.instantiate(binary, {
  "wasi_snapshot_preview1": wasi.wasiImport
});
const exitCode = wasi.start(instance) || 0;
assert(exitCode == 42);

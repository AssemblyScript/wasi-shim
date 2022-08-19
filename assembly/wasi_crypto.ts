import {
  errnoToString,
  random_get
} from "./bindings/wasi_snapshot_preview1";

export namespace wasi_crypto {
  export function getRandomValues(array: Uint8Array): void {
    let err = random_get(changetype<usize>(array.buffer) + <usize>array.byteOffset, <usize>array.byteLength);
    if (err) throw new Error(errnoToString(err));
  }
}

import {
  clock_time_get,
  clockid,
  errnoToString
} from "./bindings/wasi_snapshot_preview1";

import {
  tempbuf
} from "./wasi_internal";

export namespace wasi_performance {
  export function now(): f64 {
    let err = clock_time_get(clockid.MONOTONIC, 1000, tempbuf); // TODO: more precision?
    if (err) throw new Error(errnoToString(err));
    return <f64>load<u64>(tempbuf) / 1000000;
  }
}

import {
  clockid,
  clock_time_get,
  errnoToString
} from "./bindings/wasi_snapshot_preview1";

import {
  tempbuf
} from "./wasi_internal";

import {
  Date
} from "date";

export class wasi_Date extends Date {
  static now(): i64 {
    let err = clock_time_get(clockid.REALTIME, 1000000, tempbuf);
    if (err) throw new Error(errnoToString(err));
    return load<u64>(tempbuf) / 1000000;
  }
}

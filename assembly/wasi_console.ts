import {
  wasi_process
} from "./wasi_process";

// @ts-ignore: decorator
@lazy var timers = new Map<string,u64>();

export namespace wasi_console {

  export function assert<T>(condition: T, message: string = ""): void {
    if (!condition) {
      let stderr = wasi_process.stderr;
      stderr.write("Assertion failed: ");
      stderr.write(message);
      stderr.write("\n");
    }
  }

  export function log(message: string = ""): void {
    let stdout = wasi_process.stdout;
    stdout.write(message);
    stdout.write("\n");
  }

  export function debug(message: string = ""): void {
    let stdout = wasi_process.stdout;
    stdout.write("Debug: ");
    stdout.write(message);
    stdout.write("\n");
  }

  export function info(message: string = ""): void {
    let stdout = wasi_process.stdout;
    stdout.write("Info: ");
    stdout.write(message);
    stdout.write("\n");
  }

  export function warn(message: string = ""): void {
    let stdout = wasi_process.stdout;
    stdout.write("Warning: ");
    stdout.write(message);
    stdout.write("\n");
  }

  export function error(message: string = ""): void {
    let stdout = wasi_process.stdout;
    stdout.write("Error: ");
    stdout.write(message);
    stdout.write("\n");
  }

  export function time(label: string = "default"): void {
    let stdout = wasi_process.stdout;
    if (timers.has(label)) {
      stdout.write("Warning: Label '");
      stdout.write(label);
      stdout.write("' already exists for console.time()\n");
      return;
    }
    timers.set(label, wasi_process.hrtime());
  }

  export function timeLog(label: string = "default"): void {
    let stdout = wasi_process.stdout;
    if (!timers.has(label)) {
      stdout.write("Warning: No such label '");
      stdout.write(label);
      stdout.write("' for console.timeLog()\n");
      return;
    }
    timeLogImpl(label);
  }

  export function timeEnd(label: string = "default"): void {
    let stdout = wasi_process.stdout;
    if (!timers.has(label)) {
      stdout.write("Warning: No such label '");
      stdout.write(label);
      stdout.write("' for console.timeEnd()\n");
      return;
    }
    timeLogImpl(label);
    timers.delete(label);
  }
}

function timeLogImpl(label: string): void {
  var start = changetype<u64>(timers.get(label));
  var end = wasi_process.hrtime();
  var nanos = end - start;
  var millis = nanos / 1000000;
  var millisStr = millis.toString();
  var stdout = wasi_process.stdout;
  stdout.write(label);
  stdout.write(": ");
  stdout.write(millisStr);
  stdout.write("ms\n");
}

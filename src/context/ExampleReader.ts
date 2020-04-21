// Taken from https://docs.marblejs.com/http/context

import { createContextToken, reader } from "@marblejs/core";
import { pipe } from "fp-ts/lib/pipeable";
import * as Reader from "fp-ts/lib/Reader";
import * as Option from "fp-ts/lib/Option";

export const d1Token = createContextToken<string>("d1Token");
export const d2Token = createContextToken<string>("d2Token");

// Here we pass in the value "Hello" into our Reader
export const d1 = pipe(
  reader,
  Reader.map(() => "Hello")
);

// Here we pass in the value "Hello World" into our Reader
export const d2 = pipe(
  reader,
  Reader.map((ask) =>
    pipe(
      // This is lazily computed
      // When we ask for the "d2Token" in our app this will be computed
      // 1. Ask for the value from the "d1Token" in our context. Returns Option.some("Hello")
      // 2. Map over Option.some("Hello") & add ", world!" to it
      // 3. Either return the value "Hello, world!" or ""
      ask(d1Token),
      Option.map((v) => v + ", world!"),
      Option.getOrElse(() => "")
    )
  )
);

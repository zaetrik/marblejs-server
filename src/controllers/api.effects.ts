import { r, combineRoutes } from "@marblejs/core";
import { users$ } from "./users.effects";
import { mapTo, map } from "rxjs/operators";
import { d2Token, d1Token } from "../context/ExampleReader";
import { pipe } from "fp-ts/lib/pipeable";
import * as Option from "fp-ts/lib/Option";

// Here we get data from the context; see /src/context/ExampleReader & dependencies in /src/index for implementation details
// Taken from https://docs.marblejs.com/http/context
export const context$ = r.pipe(
  r.matchPath("/context"),
  r.matchType("GET"),
  r.useEffect((req$, ctx) => {
    const d2 = pipe(
      ctx.ask(d2Token),
      Option.getOrElse(() => "")
    );

    const d1 = pipe(
      ctx.ask(d1Token),
      Option.getOrElse(() => "")
    );

    return req$.pipe(
      mapTo(d2),
      map((body) => ({ body }))
    );
  })
);

// returns request body
const body$ = r.pipe(
  r.matchPath("/body"),
  r.matchType("GET"),
  r.useEffect((req$) => req$.pipe(map((request) => ({ body: request }))))
);

// returns query
const query$ = r.pipe(
  r.matchPath("/query"),
  r.matchType("GET"),
  r.useEffect((req$) =>
    req$.pipe(
      map((request) => ({
        body: { request: { query: request.query } },
      }))
    )
  )
);

// returns params
const params$ = r.pipe(
  r.matchPath("/params/:first/:second"),
  r.matchType("GET"),
  r.useEffect((req$) =>
    req$.pipe(
      map((request) => ({
        body: { request: { params: request.params } },
      }))
    )
  )
);

export const api$ = combineRoutes("/api/v1", [
  body$,
  query$,
  params$,
  context$,
  users$,
]);

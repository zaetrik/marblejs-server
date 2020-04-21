import { httpListener } from "@marblejs/core";
import { logger$ } from "@marblejs/middleware-logger";
import { bodyParser$ } from "@marblejs/middleware-body";
import { api$ } from "./controllers/api.effects";

const middlewares = [
  logger$(),
  bodyParser$(),
  // middleware3$
  // middleware4$
  // ...
];

// Here we register our route handlers
const effects = [
  api$,
  // endpoint2$
  // endpoint3$
  // ...
];

export const listener = httpListener({
  middlewares,
  effects,
});

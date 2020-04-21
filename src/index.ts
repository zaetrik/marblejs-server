import { createServer, bindTo } from "@marblejs/core";
import { IO } from "fp-ts/lib/IO";
import { listener } from "./http.listener";
import { d1, d2, d1Token, d2Token } from "./context/ExampleReader";

const server = createServer({
  port: 1337,
  hostname: "127.0.0.1",
  // listener includes all our routes and middleware
  listener,
  // Here we bind our data from the reader to the context
  dependencies: [bindTo(d1Token)(d1), bindTo(d2Token)(d2)],
});

const main: IO<void> = async () => await (await server)();

// Call main() to start the server
main();

import { use, r, combineRoutes } from "@marblejs/core";
import { requestValidator$, t } from "@marblejs/middleware-io";
import { UserDto } from "../repository/DTO/user.dto";
import { map, mapTo, tap } from "rxjs/operators";
import { repository } from "../repository/repository";

// Validators for incoming requests
const postUserValidator$ = requestValidator$({
  body: UserDto,
});
const userIdValidator$ = requestValidator$({
  params: t.type({
    userId: t.string,
  }),
});

/**
 * Route handlers
 */

const postUser$ = r.pipe(
  r.matchPath("/"),
  r.matchType("POST"),
  r.useEffect((req$) =>
    req$.pipe(
      use(postUserValidator$),
      tap((req) => repository.insert(req.body)),
      map((req) => ({
        body: req.body,
      }))
    )
  )
);

const getUser$ = r.pipe(
  r.matchPath("/:userId"),
  r.matchType("GET"),
  r.useEffect((req$) =>
    req$.pipe(
      use(userIdValidator$),
      map((request) => ({
        body: repository.getUser(request.params.userId),
      }))
    )
  )
);

const getUsers$ = r.pipe(
  r.matchPath("/"),
  r.matchType("GET"),
  r.useEffect((req$) => req$.pipe(mapTo({ body: { users: repository.get() } })))
);

const deleteUser$ = r.pipe(
  r.matchPath("/:userId"),
  r.matchType("DELETE"),
  r.useEffect((req$) =>
    req$.pipe(
      use(userIdValidator$),
      tap((request) => repository.delete(request.params.userId)),
      map((id) => ({
        body: `DELETED USER WITH ID ${id}`,
      }))
    )
  )
);

// Combine our routes under /users => / becomes /users
export const users$ = combineRoutes("/users", [
  getUsers$,
  postUser$,
  getUser$,
  deleteUser$,
]);

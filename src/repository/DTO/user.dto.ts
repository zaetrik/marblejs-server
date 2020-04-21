import { t } from "@marblejs/middleware-io";

// Taken from https://docs.marblejs.com/http/advanced/validation
export const UserDto = t.type({
  id: t.string,
  firstName: t.string,
  lastName: t.string,
  roles: t.array(t.union([t.literal("ADMIN"), t.literal("GUEST")])),
});

export type UserDto = t.TypeOf<typeof UserDto>;

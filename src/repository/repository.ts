import { UserDto } from "./DTO/user.dto";

interface Store {
  users: UserDto[];
}

// Create a simple store, just to simulate a simple DB
const store: Store = {
  users: [],
};

export const repository = {
  get: () => store.users,
  getUser: (id: string) => store.users.filter((user) => id === user.id),
  insert: (user: UserDto) => store.users.push(user),
  delete: (id: string) =>
    (store.users = store.users.filter((user) => id !== user.id)),
};

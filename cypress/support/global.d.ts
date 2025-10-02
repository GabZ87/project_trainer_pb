import { User } from "./types/user";

declare global {
  namespace Cypress {
    interface Chainable {
      registerUser(user: User): Chainable<void>;
      login(username: string, password: string): Chainable<void>;
    }
  }
}

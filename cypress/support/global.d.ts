import { User } from "cypress/support/types/user";

declare global {
  namespace Cypress {
    interface Chainable {
      registerUser(user: User): Chainable<void>;
      login(user: User): Chainable<void>;
    }
  }
}
import { User } from "cypress/support/types/user";

declare global {
  namespace Cypress {
    interface Chainable {
      registerUser(): Chainable<User>;
    }
  }
}
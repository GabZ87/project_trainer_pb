import { User } from "cypress/support/types/user";

declare namespace Cypress {
  interface Chainable {
    registerUser(user: User): Chainable<User>;
  }
}
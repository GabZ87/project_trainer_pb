import { User } from "./types/user";

declare namespace Cypress {

  interface Chainable {
    login(username: string, password: string): Chainable<void>;
  }

  interface Chainable {
    /**
     * Custom command to register a user and save details
     * @example cy.registerUser()
     */
    registerUser(user: User): Chainable<User>;
  }

  interface Chainable {
    /**
     * Custom task to get user files as a string array
     * @example cy.task('getUserFiles')
     */
    task(event: 'getUserFiles'): Chainable<string[]>;
  }
}

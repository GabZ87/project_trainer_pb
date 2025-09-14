declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to register a user and save details
     * @example cy.registerUser()
     */
    registerUser(): Chainable<void>;
  }
}

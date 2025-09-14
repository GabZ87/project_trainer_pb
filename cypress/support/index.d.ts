declare namespace Cypress {
  interface Chainable {
    /**
     * Custom task to get user files as a string array
     * @example cy.task('getUserFiles')
     */
    task(event: 'getUserFiles'): Chainable<string[]>;
  }
}

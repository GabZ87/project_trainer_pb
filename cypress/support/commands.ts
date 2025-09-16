// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


import { userData } from '../fixtures/testdata';
import { User } from '../support/types/user';
import { userFactory } from '../support/utils/user-factory';

// Extend Cypress' Chainable interface to include the custom command
declare global {
  namespace Cypress {
    interface Chainable {
      registerUser(user: User): Chainable<User>;
    }
  }
}

function registerUserHelper(): Cypress.Chainable<User> {
  const newUser = userFactory();
  cy.get('input.button').contains('Log In').should('exist');
  cy.get('a').contains('Register').should('be.visible').click();

  Object.values(userData).forEach((field: { input: string; type: string }) => {
    cy.get(`input[id="${field.input}"]`).type((newUser as any)[field.type]);
  });

  cy.get('input.button').contains('Register').click();

  return cy.get('body').then($body => {
    if ($body.text().includes('This username already exists.')) {
      cy.log('Username exists, retrying registration...');
      return registerUserHelper();
    } else {
      cy.contains('Your account was created successfully. You are now logged in.').should('be.visible');
      return cy.wrap(newUser);
    }
  });
}

Cypress.Commands.add('registerUser', (user: User) => {
  return registerUserHelper();
});
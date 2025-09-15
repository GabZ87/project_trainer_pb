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

import { faker } from '@faker-js/faker';
import { userData } from '../fixtures/testdata';
import { User } from './types/user';

// below is registerUser command

import { userFactory } from '../support/utils/user-factory';

function registerUserHelper() {
  const newUser = userFactory();
  cy.get('input.button').contains('Log In').should('exist');
  cy.get('a').contains('Register').should('be.visible').click();

  Object.values(userData).forEach((field: { input: string; type: string }) => {
    cy.get(`input[id="${field.input}"]`).type((newUser as any)[field.type]);
  });

  cy.get('input.button').contains('Register').click();

  cy.get('body').then($body => {
    if ($body.text().includes('This username already exists.')) {
      cy.log('Username exists, retrying registration...');
      registerUserHelper();
    } else {
      cy.contains('Your account was created successfully. You are now logged in.').should('be.visible');
    }
  });
}

Cypress.Commands.add('registerUser', () => {
  registerUserHelper();
});
//   cy.get('input.button').contains('Log In').should('exist');
//   cy.get('a').contains('Register').should('be.visible').click();

//     Object.values(userData).forEach((field: { input: string; type: string }) => {
//     cy.get(`input[id="${field.input}"]`).type(user[field.type]);
//   });

//   cy.get('input.button').contains('Register').click();
// });


// above is registerUser command
// below is login command

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit('/login'); // or your login page URL
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

// above is login command
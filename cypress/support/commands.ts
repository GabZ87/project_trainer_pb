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

import { User } from './types/user';

Cypress.Commands.add('registerUser', (user: User) => {
  cy.get('input.button').contains('Log In').should('exist');
  cy.get('a').contains('Register').should('be.visible').click();

  cy.get(`input[id="customer.firstName"]`).type(user.firstName);
  cy.get(`input[id="customer.lastName"]`).type(user.lastName);
  cy.get(`input[id="customer.address.street"]`).type(user.address);
  cy.get(`input[id="customer.address.city"]`).type(user.city);
  cy.get(`input[id="customer.address.state"]`).type(user.state);
  cy.get(`input[id="customer.address.zipCode"]`).type(user.zipCode);
  cy.get(`input[id="customer.phoneNumber"]`).type(user.phoneNumber);
  cy.get(`input[id="customer.ssn"]`).type(user.ssn);
  cy.get(`input[id="customer.username"]`).type(user.username);
  cy.get(`input[id="customer.password"]`).type(user.password);
  cy.get(`input[id="repeatedPassword"]`).type(user.password);

  cy.get('input.button').contains('Register').click();

  cy.get('body').then($body => {
    if ($body.text().includes('This username already exists.')) {
      cy.log('Registration failed.');
      throw new Error('Username already exists. Please try again with a different username.');
          } else {
      cy.contains('Your account was created successfully. You are now logged in.').should('be.visible');
      cy.log('Registration successful.');
    }
  });
});

Cypress.Commands.add('login', (username: string, password: string) => {
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('input.button[type="submit"]').click();
});

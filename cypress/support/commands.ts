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

function registerUserHelper(): Cypress.Chainable<{ [key: string]: string }> {
  const randomNum = Math.floor(Math.random() * 10000);
  const randomString = faker.string.alphanumeric(3);
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const username = `${firstName}${lastName}${randomNum}${randomString}`;
  const password = faker.internet.password({ length: 12 });
  const user: { [key: string]: string } = {
    firstName,
    lastName,
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phoneNumber: faker.phone.number(),
    ssn: faker.string.alphanumeric(9),
    username,
    password
  };

  cy.visit('https://parabank.parasoft.com/parabank/index.htm');
  cy.get('input.button').contains('Log In').should('exist');
  cy.get('a').contains('Register').should('be.visible').click();

  Object.values(userData).forEach((field: { input: string; type: string }) => {
    cy.get(`input[id="${field.input}"]`).type(user[field.type]);
  });

  cy.get('input.button').contains('Register').click();

  return cy.get('body').then($body => {
    if ($body.text().includes('This username already exists.')) {
      cy.log('Username exists, retrying registration...');
      return registerUserHelper(); // Recursively try again with a new user
    } else {
      cy.writeFile(`cypress/fixtures/userlogin/${username}.json`, user);
      cy.contains('Your account was created successfully. You are now logged in.').should('be.visible');
      return cy.wrap(user);
    }
  });
}

// above is registerUser code
// below is registerUser command

Cypress.Commands.add('registerUser', () => {
  return registerUserHelper();
});

declare global {
  namespace Cypress {
    interface Chainable {
      registerUser(): Chainable<{ [key: string]: string }>;
    }
  }
}

// above is registerUser command
// below is login command

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit('/login'); // or your login page URL
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

// above is login command
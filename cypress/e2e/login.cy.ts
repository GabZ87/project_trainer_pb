import { faker } from '@faker-js/faker';
import {userData} from '../fixtures/testdata';
import { userFactory } from '../support/utils/user-factory';

describe('Register user and save details', () => {
  beforeEach(() => {
    cy.visit('https://parabank.parasoft.com/parabank/index.htm');
  });

it('should register with a details:', () => {
  
  function registerUser() {
    const newUser = userFactory();
    cy.get('input.button').contains('Log In').should('exist');
    cy.get('a').contains('Register').should('be.visible').click();

    Object.values(userData).forEach((field) => {
        cy.get(`input[id="${field.input}"]`).type((newUser as any)[field.type]);
    });

    cy.get('input.button').contains('Register').click();

    cy.get('body').then($body => {
        if ($body.text().includes('This username already exists.')) {
          cy.log('Username exists, retrying registration...');
          registerUser(); // Recursively try again with a new user
        } else {
          cy.writeFile(`cypress/fixtures/userlogin/${newUser.username}.json`, newUser);
          cy.contains('Your account was created successfully. You are now logged in.').should('be.visible');
          cy.get('a').contains('Log Out').should('be.visible').click();
        }
      });
    } 

 registerUser();
  });
});



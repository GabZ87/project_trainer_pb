import { faker } from '@faker-js/faker';
import {userData} from '../fixtures/testdata';
import { userFactory } from '../support/utils/user-factory';
import { User } from '../support/types/user';


describe('Register user and save details', () => {
  beforeEach(() => {
    cy.visit('https://parabank.parasoft.com/parabank/index.htm');
  });

  it('should register with details', () => {
    cy.registerUser().then((user) => {
      cy.writeFile(`cypress/fixtures/userlogin/${user.username}.json`, user);
      cy.contains('Your account was created successfully. You are now logged in.').should('be.visible');
      cy.get('a').contains('Log Out').should('be.visible').click();
    });
  });
});
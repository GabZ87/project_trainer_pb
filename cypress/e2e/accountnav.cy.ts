
import {accountMenuItems} from '../fixtures/testdata';
import { userFactory } from '../support/utils/user-factory';

describe('Navigation Tests', () => {
  
    it('account navigation buttons exist and are functional', () => {
      const user = userFactory();
      cy.registerUser(user);
      Object.values(accountMenuItems).forEach((item: { title: string; url: string; page: string; }) => {
        cy.get('#leftPanel')
        .contains('a', item.title)
        .should('have.attr', 'href', item.url)
        // .find(`a:contains("${item.title}")`)
        // .should('have.attr', 'href')
        // .and('include', item.url)
        .click();

        if (item.page === '?') {
            cy.url().should('include', 'https://parabank.parasoft.com/parabank/index.htm');
            cy.get('h2').should('contain.text', 'Customer Login');
        } else {
            cy.get('h1').should('contain.text', item.page);
        }
      });
    });
  });

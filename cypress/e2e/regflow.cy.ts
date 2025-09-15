// uses login.cy.ts to make user registration and save details
// logs into the same user just created
// then verifies logged into the user
// checks accounts overview page to find the account created during registration, record the avaliable funds using sibling elements and store fund amount for later use
// click to request a loan
// fill out the loan request form using more than the available funds as down payment and submit
// verify the loan was denied
// fill out the loan request form using exactly the available funds as down payment but a loan amount of 10000 and submit
// verify the loan was denied
// fill out the loan request form using exactly the available funds as down payment but a loan amount of 1000 and submit
// verify the loan was approved
// verify the new loan appears in the accounts overview page

import { userFactory } from '../support/utils/user-factory';
describe('Register user and save details', () => {
  before(() => {
    //use login.cy.ts to register a new user and save details
    cy.visit('https://parabank.parasoft.com/parabank/index.htm');
    const newUser = userFactory();
    cy.registerUser().then((user) => {
      cy.wrap(user).as('newUser');
    });
  });

    it('should be logged in with the newly registered user and verify account creation, request loans and verify loan status', function() {

        cy.get('@newUser').then((user: any) => {
        cy.get('a').contains('Accounts Overview').should('be.visible').click();
        cy.get('#accountTable tbody tr').first().find('td').first().should('be.visible').then($accountCell => {
          const accountNumber = $accountCell.text().trim();
          cy.log(`Account Number: ${accountNumber}`);
          cy.get('#accountTable tbody tr').first().find('td').next().should('be.visible').then($amountCell => {
            const availableAmountText = $amountCell.text().trim().replace('$', '').replace(',', '');
            const availableAmount = parseFloat(availableAmountText);
            cy.log(`Available Amount: ${availableAmount}`);
            // Request a loan with more than available funds as down payment
            cy.get('a').contains('Request Loan').should('be.visible').click();
            cy.get('#amount').type('1000');
            cy.get('#downPayment').type((availableAmount + 100).toString());
            cy.get('#fromAccountId').select(accountNumber);
            cy.get('input.button').should('have.value', 'Apply Now').click();
            cy.get('#loanStatus').contains('Denied');
            // Request a loan with exactly available funds as down payment but a high loan amount
            cy.get('a').contains('Request Loan').should('be.visible').click();
            cy.get('#amount').type('10000');
            cy.get('#downPayment').type(availableAmount.toString());
            cy.get('#fromAccountId').select(accountNumber);
            cy.get('input.button').should('have.value', 'Apply Now').click();
            cy.get('#loanStatus').contains('Denied');
            // Request a loan with exactly available funds as down payment and a reasonable loan amount
            cy.get('a').contains('Request Loan').should('be.visible').click();
            cy.get('#amount').type('1000');
            cy.get('#downPayment').type(availableAmount.toString());
            cy.get('#fromAccountId').select(accountNumber);
            cy.get('input.button').should('have.value', 'Apply Now').click();
            cy.get('#loanStatus').contains('Approved');
            cy.contains('Congratulations, your loan has been approved.').should('be.visible');
            cy.get('#newAccountId').invoke('text').then((loanAccountId) => {
            cy.log(`New Loan Account ID: ${loanAccountId}`);
            // Verify the new loan appears in the accounts overview page
            cy.get('a').contains('Accounts Overview').should('be.visible').click();
            cy.get('#accountTable tbody tr').contains('td', loanAccountId).parent('tr').within(() => {
              cy.get('td').eq(1).then($amountCell => {
                const loanAmountText = $amountCell.text().trim().replace('$', '').replace(',', '');
                const loanAmount = parseFloat(loanAmountText);
                cy.log(`Loan Amount for Account ${loanAccountId}: ${loanAmount}`);  
              });
            });
          });
        });
      });
    });
    });
});



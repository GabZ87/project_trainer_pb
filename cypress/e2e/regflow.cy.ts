import { userFactory } from '../support/utils/user-factory';

describe('Register user and save details', () => {
  it('should be logged in with the newly registered user and verify account creation, request loans and verify loan status', () => {
    const user = userFactory();
    cy.registerUser(user);

    cy.get('a').contains('Accounts Overview').should('be.visible').click();
    cy.get('#accountTable tbody tr')
      .first()
      .find('td')
      .first()
      .should('be.visible')
      .then(($accountCell) => {
        const accountNumber = $accountCell.text().trim();
        cy.log(`Account Number: ${accountNumber}`);
        cy.get('#accountTable tbody tr')
          .first()
          .find('td')
          .next()
          .should('be.visible')
          .then(($amountCell) => {
            const availableAmountText = $amountCell.text().trim().replace('$', '').replace(',', '');
            const availableAmount = parseFloat(availableAmountText);
            cy.log(`Available Amount: ${availableAmount}`);

            cy.log('Request a loan with more than available funds as down payment');
            cy.get('a').contains('Request Loan').should('be.visible').click();
            cy.get('#amount').type('1000');
            cy.get('#downPayment').type((availableAmount + 100).toString());
            cy.get('#fromAccountId').select(accountNumber);
            cy.get('input.button').should('have.value', 'Apply Now').click();
            cy.get('#loanStatus').contains('Denied');

            cy.log('Request a loan with exactly available funds as down payment but a high loan amount');
            cy.get('a').contains('Request Loan').should('be.visible').click();
            cy.get('#amount').type('10000');
            cy.get('#downPayment').type(availableAmount.toString());
            cy.get('#fromAccountId').select(accountNumber);
            cy.get('input.button').should('have.value', 'Apply Now').click();
            cy.get('#loanStatus').contains('Denied');

            cy.log('Request a loan with exactly available funds as down payment and a reasonable loan amount');
            cy.get('a').contains('Request Loan').should('be.visible').click();
            cy.get('#amount').type('1000');
            cy.get('#downPayment').type(availableAmount.toString());
            cy.get('#fromAccountId').select(accountNumber);
            cy.get('input.button').should('have.value', 'Apply Now').click();
            cy.get('#loanStatus').contains('Approved');
            cy.contains('Congratulations, your loan has been approved.').should('be.visible');
            cy.get('#newAccountId')
              .invoke('text')
              .then((loanAccountId) => {
                cy.log(`New Loan Account ID: ${loanAccountId}`);

                cy.log('Verify the new loan appears in the accounts overview page');
                cy.get('a').contains('Accounts Overview').should('be.visible').click();
                cy.get('#accountTable tbody tr')
                  .contains('td', loanAccountId)
                  .parent('tr')
                  .within(() => {
                    cy.get('td')
                      .eq(1)
                      .then(($amountCell) => {
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



describe('Account Types Test Suite', () => {
  beforeEach(() => {
    cy.visit('https://parabank.parasoft.com/parabank/index.htm');
    cy.task('getUserFiles').then((userFiles) => {
      if (!userFiles.length) throw new Error('No user files found');
      const randomFile = userFiles[Math.floor(Math.random() * userFiles.length)];
      cy.log(`Using user file: ${randomFile}`);
      cy.fixture(`userlogin/${randomFile}`).then((user: { username: string; password: string }) => {
        cy.get('input[name="username"]').type(user.username);
        cy.get('input[name="password"]').type(user.password);
        cy.get('input.button').contains('Log In').click();
        cy.get('a').contains('Log Out').should('be.visible');
      });
    });
  });

  it('should open a new account of type SAVINGS', () => {

    cy.get('a').contains('Open New Account').click();
    cy.get('h1').contains('Open New Account').should('be.visible');
    cy.get('select#type').should('exist').select('SAVINGS');
    cy.get('select#fromAccountId').should('exist').select(0);

    cy.intercept('POST', '/parabank/services_proxy/bank/createAccount*').as('openAccount');

    cy.get('input.button[value="Open New Account"]').should('be.visible').click();
    cy.get('h1').contains('Account Opened!').should('be.visible');
    cy.contains('Congratulations, your account is now open.').should('be.visible');
    cy.wait('@openAccount').its('response.statusCode').should('eq', 200);

  });

    it('should open a new account of type CHECKING', () => {
      cy.get('a').contains('Open New Account').click();
      cy.get('h1').contains('Open New Account').should('be.visible');
      cy.get('select#type').should('exist').select('CHECKING');
      cy.get('select#fromAccountId').should('exist').select(0);

      cy.intercept('POST', '/parabank/services_proxy/bank/createAccount*').as('openAccount');

      cy.get('input.button[value="Open New Account"]').should('be.visible').click();
      cy.get('h1').contains('Account Opened!').should('be.visible');
      cy.contains('Congratulations, your account is now open.').should('be.visible');
      cy.wait('@openAccount').its('response.statusCode').should('eq', 200);
    });
});

describe('Reset Password', () => {
  it('should reset password successfully', () => {
    cy.visit('https://parabank.parasoft.com/parabank/index.htm');
    cy.get('input.button').contains('Log In').should('exist');
    cy.contains('Forgot login info?').should('be.visible');
    cy.get('a').contains('Forgot login info?').click();
    cy.get('input.button').contains('Find My Login Info').should('be.visible');
    cy.task('getUserFiles').then((userFiles) => {
      if (!userFiles.length) throw new Error('No user files found');
      const randomFile = userFiles[Math.floor(Math.random() * userFiles.length)];
      cy.log(`Using user file: ${randomFile}`);
      cy.fixture(`userlogin/${randomFile}`).then((user: { [key: string]: string }) => {
        cy.get('input[id="firstName"]').type(user.firstName);
        cy.get('input[id="lastName"]').type(user.lastName);
        cy.get('input[id="address.street"]').type(user.address);
        cy.get('input[id="address.city"]').type(user.city);
        cy.get('input[id="address.state"]').type(user.state);
        cy.get('input[id="address.zipCode"]').type(user.zipCode);
        cy.get('input[id="ssn"]').type(user.ssn);
        cy.get('input.button').contains('Find My Login Info').click();
        cy.contains('Your login information was located successfully. You are now logged in.').should('be.visible');
        cy.get('p').contains(user.password).should('be.visible');
        cy.get('p').contains(user.username).should('be.visible');
      });
    });
  });
});
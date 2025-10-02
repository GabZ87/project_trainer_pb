import { basicUser } from '../support/users/basicUser';

describe('Register user and save details', () => {
  it('should login with basic user details', () => {
    cy.login(basicUser.username, basicUser.password);
    cy.get('a').contains('Log Out').should('be.visible').click();
  });
});
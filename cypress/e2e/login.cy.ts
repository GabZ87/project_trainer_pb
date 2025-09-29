import { basicUser } from '../support/users/basicUser';

describe('Register user and save details', () => {
  it('should login with basic user details', () => {
    const user = basicUser;
    cy.login(user);
    cy.get('a').contains('Log Out').should('be.visible').click();
  });
});
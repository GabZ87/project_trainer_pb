import { basicUser } from '../support/users/basicUser';

describe('Register user and save details', () => {
  it('should login with basic user details', () => {
    const user = basicUser;
    cy.get('input[name="username"]').type(user.username);
    cy.get('input[name="password"]').type(user.password);
    cy.get('input.button[type="submit"]').click();
    cy.get('body').should('contain.text', `Welcome ${user.firstName} ${user.lastName}`);
    cy.get('a').contains('Log Out').should('be.visible').click();
  });
});
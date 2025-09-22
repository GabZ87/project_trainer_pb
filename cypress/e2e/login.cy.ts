import { userFactory } from '../support/utils/user-factory';

describe('Register user and save details', () => {
  it('should register with details', () => {
    const user = userFactory();
        cy.registerUser(user);
        cy.log(`Registered user: ${user.username}`);
        cy.get('body').should('contain.text', `Welcome ${user.username}`);
        cy.get('a').contains('Log Out').should('be.visible').click();
  });
});
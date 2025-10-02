//import { basicUser } from '../support/users/basicUser';
import { userFactory } from '../support/utils/user-factory';

describe('Register user and save details', () => {
  it('should login with basic user details', () => {
    //cy.login(basicUser.username, basicUser.password);

    const user = userFactory();
      cy.registerUser(user);
      cy.get('a').contains('Log Out').should('be.visible').click();
      cy.login(user.username, user.password);

    cy.get('a').contains('Log Out').should('be.visible').click();
  });
});
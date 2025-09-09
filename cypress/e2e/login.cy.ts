import { faker } from '@faker-js/faker';
import {userData} from '../fixtures/testdata';

describe('Register user and save details', () => {
  beforeEach(() => {
    cy.visit('https://parabank.parasoft.com/parabank/index.htm');
  });

it('should register with a details:', () => {

  function registerUser() {

    const randomNum:number = Math.floor(Math.random() * 10000);
    const randomString:string = faker.string.alphanumeric(3);
    const firstName:string = faker.person.firstName();
    const lastName:string = faker.person.lastName();
    const username:string = `${firstName}${lastName}${randomNum}${randomString}`;
    const password:string = faker.internet.password({ length: 12 });
    const user: { [key: string]: string } = {
        firstName: firstName,
        lastName: lastName,
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        phoneNumber: faker.phone.number(),
        ssn: faker.string.alphanumeric(9), // Social Security Number
        username: username,
        password: password
    };

    cy.get('input.button').contains('Log In').should('exist');
    cy.get('a').contains('Register').should('be.visible').click();

    Object.values(userData).forEach((field) => {
        cy.get(`input[id="${field.input}"]`).type(user[field.type]);
    });

    cy.get('input.button').contains('Register').click();

    cy.get('body').then($body => {
        if ($body.text().includes('This username already exists.')) {
          cy.log('Username exists, retrying registration...');
          registerUser(); // Recursively try again with a new user
        } else {
          cy.writeFile(`cypress/fixtures/userlogin/${username}.json`, user);
          cy.contains('Your account was created successfully. You are now logged in.').should('be.visible');
          cy.get('a').contains('Log Out').should('be.visible').click();
        }
      });
    } 

 registerUser();
  });
});



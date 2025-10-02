import { faker } from '@faker-js/faker';
import { User } from '../types/user';

export const userFactory = (): User => {
  const date: number = Date.now();
  const firstName: string = faker.person.firstName().slice(0, 5); // Limit to 5 characters
  const lastName: string = faker.person.lastName().slice(0, 5); // Limit to 5 characters

  const user: User = {
    firstName,
    lastName,
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phoneNumber: faker.phone.number(),
    ssn: faker.string.alphanumeric(9), // Social Security Number
    username: `${firstName}${lastName}${date}`.slice(0, 20),
    password: faker.internet.password({ length: 12 })
  };

  return user;
};
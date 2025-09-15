import { faker } from '@faker-js/faker';
import { User } from '../types/user';

export const userFactory = (): User => {
  const randomNum: number = Math.floor(Math.random() * 10000);
  const randomString: string = faker.string.alphanumeric(3);
  const firstName: string = faker.person.firstName();
  const lastName: string = faker.person.lastName();

  const user: User = {
    firstName,
    lastName,
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phoneNumber: faker.phone.number(),
    ssn: faker.string.alphanumeric(9), // Social Security Number
    username: `${firstName}${lastName}${randomNum}${randomString}`,
    password: faker.internet.password({ length: 12 })
  };

  return user;
};
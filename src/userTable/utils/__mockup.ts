import { faker } from "@faker-js/faker";
import { User } from "./type";

export const user = (): User => ({
  firstName: faker.person.fullName(),
  lastName: faker.person.lastName(),
  age: faker.number.int({ min: 10, max: 100 }),
  visits: faker.number.int(1000),
  status: faker.helpers.shuffle<User["status"]>([
    "relationship",
    "complicated",
    "single",
  ])[0]!,
  progress: faker.number.int(100),
});

export const generateUsers = (num: number) =>
  Array.from({ length: num }, () => user());

import { faker } from "@faker-js/faker";

export const STORAGE_KEY = "USERS";

export const bulkCreateUsers = (data) => {
  const updatedUsers = [...getAllUsers(), ...data];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));
  return true;
};

export const generateRandomUser = () => {
  const sex = faker.person.sexType();
  return {
    id: faker.string.uuid(),
    email: faker.internet.email().toLowerCase(),
    address: faker.location.streetAddress(true),
    age: 28,
    firstName: faker.person.firstName(sex),
    gender: sex,
    lastName: faker.person.lastName(sex),
    note: faker.lorem.words(25),
    createdAt: faker.date.past(),
    updatedAt: Date.now(),
  };
};

export const getUserById = (id) => {
  const userData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  return userData?.find((user) => user.id === id) || null;
};

export const getAllUsers = () => {
  const userData = localStorage.getItem(STORAGE_KEY);
  return userData ? JSON.parse(userData) : [];
};

export const generateRandomUsers = (count) => {
  const randomUsers = [];
  Array(count)
    .fill()
    .forEach(() => {
      randomUsers.push(generateRandomUser());
    });
  return randomUsers;
};

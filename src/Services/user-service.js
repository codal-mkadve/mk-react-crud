import { faker } from "@faker-js/faker";
import * as Yup from "yup";

const errorMessages = {
  required: "Required",
  valueInvalid: "Value is invalid",
  invalidEmail: "Invalid email",
  confirmPassword: "Passwords must match",
  passwordLength: "Password must be at least 6 characters",
};

export const isAlphabetic = (value) => /^[a-zA-Z]+$/.test(value);

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
    age: faker.datatype.number({ min: 18, max: 80 }),
    firstName: faker.person.firstName(sex),
    gender: sex,
    lastName: faker.person.lastName(sex),
    note: faker.lorem.words(25),
    status: Math.floor(Math.random() * 2) ? "active" : "inactive",
    createdAt: faker.date.past(),
    updatedAt: Date.now(),
  };
};

export const getUserById = (id) => {
  const userData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  return userData?.find((user) => user.id === id) || null;
};

export const createUser = (data) => {
  const newUser = {
    ...data,
    id: faker.string.uuid(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const users = getAllUsers();
  users.push(newUser);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  return true;
};

export const updateUser = (id, data) => {
  const users = getAllUsers();
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    users[index] = {
      ...data,
      updatedAt: new Date().toISOString(),
      id,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    return true;
  }

  return false;
};

export const getFilteredListData = (filterObj) => {
  const globalSearch = filterObj.globalSearch;
  const {
    id = "",
    email = "",
    firstName = "",
    lastName = "",
    createdAt = "",
    status = "",
  } = filterObj.columnFilter || {};
  console.log("getAllUsers()", getAllUsers(), filterObj.columnFilter);
  return getAllUsers()
    .filter((user) => {
      const emailMatch = !email || search(user.email, email);
      const firstNameMatch = !firstName || search(user.firstName, firstName);
      const idMatch = !id || search(user.id, id);
      const lastNameMatch = !lastName || search(user.lastName, lastName);
      const createdAtMatch = !createdAt || search(user.createdAt, createdAt);
      const statusMatch = !status || user.status === status;
      return (
        emailMatch &&
        firstNameMatch &&
        idMatch &&
        lastNameMatch &&
        createdAtMatch &&
        statusMatch
      );
    })
    .sort((a, b) => {
      const valueA = a[filterObj.sortColumn];
      const valueB = b[filterObj.sortColumn];
  
      // If the sort column is invalid or missing, return 0 (no change in position)
      if (!valueA || !valueB) return 0;
  
      // Compare the values based on the sorting order
      return filterObj.sortBy === "DESC"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
  })
};

export const search = (columnName, searchValue) => {
  return columnName?.toLowerCase().includes(searchValue?.toLowerCase());
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

export const getErrorMessage = (key) => errorMessages?.[key] ?? key;

export const validator = (type) => {
  switch (type) {
    case "onlyString":
      return Yup.string()
        .required(getErrorMessage("required"))
        .test("isAlphabetic", getErrorMessage("invalidValue"), (value) =>
          value !== undefined ? isAlphabetic(value) : true
        );

    case "notRequired":
      return Yup.string().notRequired();
    case "notRequiredDate":
      return Yup.date().notRequired();

    case "requiredDate":
      return Yup.date().required(getErrorMessage("required"));

    case "required":
      return Yup.string().required(getErrorMessage("required"));

    case "email":
      return Yup.string()
        .required(getErrorMessage("required"))
        .email(getErrorMessage("invalidEmail"));

    case "password":
      return Yup.string()
        .required(getErrorMessage("required"))
        .min(6, getErrorMessage("passwordLength"));

    default:
      return Yup.string().required(getErrorMessage("required"));
  }
};

export const userFormValidation = () =>
  Yup.object().shape({
    firstName: validator("required"),
    lastName: validator("required"),
    email: validator("email"),
    gender: validator("onlyString"),
    status: validator("onlyString"),
  });

export const deleteUserById = (id) => {
  const allUsers = getAllUsers().filter((user) => user.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allUsers));
  return true;
};

export const deleteAllUsers = () => {
  const allUsers = [];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allUsers));
  return true;
};

export const paginateTable = (array, perPage, pageIndex) => {
  const startIndex = (pageIndex - 1) * perPage;
  return array.slice(startIndex, pageIndex * perPage);
};

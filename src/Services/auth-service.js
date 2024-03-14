import axios from 'axios';
import environment from '../environment';

export const storageKey = "AUTH_TOKEN";


export const logout = () => {
    localStorage.removeItem(storageKey);
};


export const login = async (email, password) => {
  try {
    const response = await axios.post(environment.login, {
      email,
      password,
    });
    const { token } = response.data;
    localStorage.setItem(storageKey, token); // Storing the token
    return true; // Login successful
  } catch (error) {
    console.error('Login error:', error);
    return false; // Login failed
  }
};

export const isLoggedIn = () => {
  return !!localStorage.getItem(storageKey);
};

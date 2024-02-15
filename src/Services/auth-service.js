export const storageKey = "AUTH_TOKEN";


export const logout = () => {
    localStorage.removeItem(storageKey);
};

export const login = () => {
    localStorage.setItem(storageKey, "LoggedIn");
};

export const isLoggedIn = () => {
  return !!localStorage.getItem(storageKey);
};

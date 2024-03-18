const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api/';
const LOGIN_ENDPOINT = process.env.REACT_APP_LOGIN_ENDPOINT || 'users/login';

const environment = {
    baseURL: API_BASE_URL,
    login: `${API_BASE_URL}${LOGIN_ENDPOINT}`,
};

export default environment;

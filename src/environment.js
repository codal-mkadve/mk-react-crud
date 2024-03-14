const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';
const LOGIN_ENDPOINT = process.env.REACT_APP_LOGIN_ENDPOINT || '/api/users/login';

const environment = {
    login: `${API_BASE_URL}${LOGIN_ENDPOINT}`,
};

export default environment;

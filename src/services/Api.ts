import axios from "axios";

function getTokenFromLocalStorage() {
  const token = localStorage.getItem('token');
  return token ? JSON.parse(token) : null;
}

function getCustomerTokenFromLocalStorage() {
  const token = localStorage.getItem('tokenCustomer');
  return token ? JSON.parse(token) : null;
}

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': '',
    'Access-Control-Expose-Headers': '*',
  },
});

api.interceptors.request.use(config => {
  const token = getTokenFromLocalStorage() ? getTokenFromLocalStorage() : getCustomerTokenFromLocalStorage();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
import axios from 'axios';
const service = axios.create({
  baseURL: 'http://localhost:8081/api',
  timeout: 6000,
});
export default service;


import axios from 'axios';
import { STUDENT } from '@constants/student';

const apiClient = axios.create({
    baseURL: 'https://fakestoreapi.com',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});
apiClient.interceptors.request.use(config => {
    config.headers['X-Student-Id'] = STUDENT.mssv;
    return config;
});
export default apiClient;

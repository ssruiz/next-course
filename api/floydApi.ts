import axios from 'axios';

const floydApi = axios.create({
  baseURL: '/api',
});

export default floydApi;

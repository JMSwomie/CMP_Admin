import axios from 'axios';

export const sysApi = axios.create({
  baseURL: 'https://ze2i0ioucf.execute-api.us-west-2.amazonaws.com/dev'
});

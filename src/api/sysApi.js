import axios from 'axios';

export const sysApi = axios.create({
  baseURL: 'https://25uro5b9e4.execute-api.us-west-2.amazonaws.com/dev'
});

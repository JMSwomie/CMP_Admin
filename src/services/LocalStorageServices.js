export const storeToken = (value) => {
  localStorage.setItem('token', value);
};

export const storeRole = (value) => {
  localStorage.setItem('role', value);
};

export const getToken = () => {
  const token = localStorage.getItem('token');
  return token;
};

export const getUserId = () => {
  const resp = localStorage.getItem('user');
  return JSON.parse(resp);
};

export const removeToken = (value) => {
  localStorage.removeItem(value);
};

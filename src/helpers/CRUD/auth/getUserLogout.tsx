import { getLogout } from '../..';
import { getToken, removeToken } from '../../../services';

export const getUserLogout = async () => {
  const token: any = getToken();
  const resp = await getLogout(token);

  localStorage.removeItem('expireTime');
  localStorage.removeItem('user');
  localStorage.removeItem('selected');
  removeToken('token');

  window.location.reload();

  return resp;
};

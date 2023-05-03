import { LOGOUT_URL, sysApi } from '../../../api';

export const getLogout = async (token: string) => {
  try {
    const resp = await sysApi.post(
      LOGOUT_URL,
      {},
      {
        headers: { authorization: `Bearer ${token}` },
      },
    );

    return resp.data;
  } catch (err) {
    return err;
  }
};

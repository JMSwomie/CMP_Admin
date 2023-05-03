import { LOGIN_URL, sysApi } from '../../../api';
import { GetLoginInterface } from '../../../interfaces';

export const getLogin = async (
  email: string,
  password: string,
): Promise<GetLoginInterface> => {
  try {
    const resp = await sysApi.post<GetLoginInterface>(
      LOGIN_URL,
      { email, password },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    return resp.data;
  } catch (err: any) {
    return err;
  }
};

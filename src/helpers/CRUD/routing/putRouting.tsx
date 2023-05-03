import { ROUTING_URL, sysApi } from '../../../api';
import { RoutingInterface } from '../../../interfaces';

export const putRouting = async (
  token: string,
  id: number,
  code: string,
  name: string,
  status: string,
): Promise<RoutingInterface> => {
  const PRODUCT_URL = `${ROUTING_URL}/${id}`;

  try {
    const resp = await sysApi.put<RoutingInterface>(
      PRODUCT_URL,
      {
        code,
        name,
        status,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      },
    );

    return resp.data;
  } catch (err: any) {
    return err;
  }
};

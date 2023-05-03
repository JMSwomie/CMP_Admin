import { ROUTING_URL, sysApi } from '../../../api';
import { RoutingInterface } from '../../../interfaces';

export const getRouting = async (token: string) => {
  try {
    const resp = await sysApi.get<RoutingInterface>(ROUTING_URL, {
      headers: { authorization: `Bearer ${token}` },
    });

    return resp.data;
  } catch (err: any) {
    return err;
  }
};

import { ROUTING_URL, sysApi } from '../../../api';
import { RoutingInterface } from '../../../interfaces';

export const getRouting = async (accessToken: string) => {
   try {
      const resp = await sysApi.get<RoutingInterface>(ROUTING_URL, {
         headers: { Authorization: `${accessToken}` },
      });

      return resp;
   } catch (err: any) {
      return err;
   }
};

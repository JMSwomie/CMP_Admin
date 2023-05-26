import { ROUTING_POST_URL, sysApi } from '../../../api';
import { RoutingInterface } from '../../../interfaces';

export const postRouting = async (
   accessToken: string,
   Name: string,
   RecNum: number,
   Language: string,
   RolloutFlag: boolean
): Promise<RoutingInterface> => {
   const Params = {
      Name,
      RecNum,
      Language,
      RolloutFlag,
   };

   const Config = {
      headers: {
         Accept: '*/*',
         Authorization: `${accessToken}`,
      },
   };

   try {
      const resp = await sysApi.put<RoutingInterface>(
         ROUTING_POST_URL, Params, Config
      );

      return resp.data;
   } catch (err: any) {
      return err;
   }
};

import { ROUTING_POST_URL, sysApi } from '../../../api';
import { RoutingInterface } from '../../../interfaces';

export const postRouting = async (
   accessToken: string,
   Name: string,
   RecNum: number,
   Language: string,
   Content: string,
   RolloutFlag: boolean
): Promise<RoutingInterface> => {
   const Params = {
      Name,
      RecNum,
      Language,
      Content,
      RolloutFlag,
   };

   const Config = {
      headers: {
         Accept: '*/*',
         Authorization: `${accessToken}`,
      },
      params: Params,
   };

   try {
      const resp = await sysApi.post<RoutingInterface>(
         ROUTING_POST_URL, {}, Config
      );

      return resp.data;
   } catch (err: any) {
      return err;
   }
};

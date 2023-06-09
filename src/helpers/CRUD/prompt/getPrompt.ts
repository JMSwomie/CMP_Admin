import { PROMPT_URL, sysApi } from '../../../api';
import { RoutingInterface,  } from '../../../interfaces';

export const getPrompt = async (accessToken: string) => {
   try {
      const resp = await sysApi.get<RoutingInterface>(PROMPT_URL, {
         headers: { Authorization: `${accessToken}`, Accept: '*/*' },
      });

      return resp.data;
   } catch (err: any) {
      return err;
   }
};

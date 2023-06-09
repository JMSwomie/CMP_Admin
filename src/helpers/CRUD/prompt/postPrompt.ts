import { PROMPT_POST_URL, sysApi } from '../../../api';
import { RoutingInterface } from '../../../interfaces';

export const postPrompt = async (
   accessToken: string,
   Id: string,
   Language: string,
   newContent: string
): Promise<RoutingInterface> => {
   const Params = {
      Id,
      Language,
      new_content: newContent,
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
         PROMPT_POST_URL, {}, Config
      );

      return resp.data;
   } catch (err: any) {
      return err;
   }
};

import { PROMPT_AUDIO_URL, sysApi } from '../../../api';

export const postPromptAudio = async (
   accessToken: string,
   text: string,
   voice: string
): Promise<any> => {
   const Params = {
      text,
      voice,
   };

   const Config = {
      headers: {
         Accept: 'audio/mpeg',
         Authorization: `${accessToken}`,
      },
      params: Params,
      responseType: 'arraybuffer' as 'json',
   };

   try {
      const resp = await sysApi.post<ArrayBuffer>(PROMPT_AUDIO_URL, {}, Config);

      const audioData = new Uint8Array(resp.data);
      const blob = new Blob([audioData], { type: 'audio/mpeg' });

      return blob;
   } catch (err: any) {
      return err;
   }
};

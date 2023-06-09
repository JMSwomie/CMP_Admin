import { Auth } from 'aws-amplify';

export const getLogout = async () => {
   try {
      const res = await Auth.signOut();
      return res;
   } catch (err) {
      throw new Error(`Fail to logout, ${err}`);
   }
};

const awsExports = {
   Auth: {
      region: 'us-west-2',
      userPoolId: 'us-west-2_tnF21pSSA',
      userPoolWebClientId: '6e86t9qc9i2kp48hanna2bfgi8',
      oauth: {
         domain: 'sync-dev.auth.us-west-2.amazoncognito.com',
         scope: ['email', 'openid'],
         redirectSignIn: 'http://localhost:3000/',
         redirectSignOut: 'http://localhost:3000/',
         responseType: 'code',
      },
   },
};

export default awsExports;

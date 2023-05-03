const RULES = {
   OFF: 'off',
   WARN: 'warn',
   ERR: 'error',
};

module.exports = {
   env: {
      browser: true,
      es2021: true,
   },
   extends: ['plugin:react/recommended', 'standard', 'prettier'],
   parser: '@typescript-eslint/parser',
   parserOptions: {
      ecmaFeatures: {
         jsx: true,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
   },
   plugins: ['react', '@typescript-eslint'],
   settings: {
      react: {
         version: 'detect',
      },
   },
   rules: {
      'react/display-name': RULES.OFF,
      'react/prop-types': RULES.OFF,
      'react/react-in-jsx-scope': RULES.OFF,
   },
};

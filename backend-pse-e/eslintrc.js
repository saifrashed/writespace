module.exports = {
    env: {
      browser: true,
      commonjs: true,
      es2021: true,
      jest: true, // Added for testing
    },
    extends: 'airbnb',
    parserOptions: {
      ecmaVersion: 'latest',
    },
    "rules": {
      "indent": ["error", 4]
    },
  };
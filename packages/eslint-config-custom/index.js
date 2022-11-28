module.exports = {
  extends: [
    'next',
    'next/core-web-vitals',
    'turbo',
    'prettier',
    'plugin:json/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    "unused-imports"
  ],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "error",
      { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
    ]
  },
};

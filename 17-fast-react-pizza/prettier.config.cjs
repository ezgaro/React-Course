// prettier.config.js, .prettierrc.js, prettier.config.cjs, or .prettierrc.cjs

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  trailingComma: "es5",
  tabWidth: 4,
  semi: false,
  singleQuote: true,
};

// eslint-disable-next-line no-undef
module.exports = config;

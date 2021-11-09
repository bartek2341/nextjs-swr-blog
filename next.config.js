const nextTranslate = require("next-translate");

module.exports = {
  experimental: {
    scrollRestoration: true,
  },
  ...nextTranslate(),
};

const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@": "src",
    "@components": "src/components",
    "@views": "src/views",
    "@assets": "src/assets",
  })(config);

  return config;
};

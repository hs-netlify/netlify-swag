const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "x5k8az",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000/",
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});

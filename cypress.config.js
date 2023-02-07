const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "custom-title",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    baseUrl: "https://cypress.vivifyscrum-stage.com",
    env: {
      email: "raziel1412@gmail.com",
      password: "sifra123",
      apiCypressVivify: "https://cypress-api.vivifyscrum-stage.com/api/v2/",
    },
    video: false,
  },
});

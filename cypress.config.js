const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://cypress.vivifyscrum-stage.com',
    env : {
      email : 'raziel1412@gmail.com',
      password  : 'sifra123',
      apiCypressVivify : 'https://cypress-api.vivifyscrum-stage.com/api/v2/',
    },
    video : false
  },
});

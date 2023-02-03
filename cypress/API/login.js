import data from "../fixtures/data.json";
import { colorValidation } from "../support/apiValidation";

module.exports = {
  login({
    email = Cypress.env("email"),
    password = Cypress.env("password"),
    testMessage = Cypress.currentTest.title,
    statusCode = 200,
  }) {
    return cy
      .request({
        method: "POST",
        failOnStatusCode: false,
        url: `${data.url.apiCypressVivify}login`,
        body: {
          email: email,
          password: password,
        },
      })
      .then((response) => {
        colorValidation(response, testMessage, statusCode);
        return response.body.token;
      });
  },
};

import data from "../fixtures/data.json";
import { colorValidation } from "../support/apiValidation";
import { randomStringGenerator } from "../support/generator";

module.exports = {
  createBoard({
    name = randomStringGenerator(7),
    type = data.boardTypes.scrumBoard,
    orgId = data.string.emptyString,
    statusCode = 201,
    testMessage = Cypress.currentTest.title,
  }) {
    return cy
      .request({
        method: "POST",
        failOnStatusCode: false,
        url: `${Cypress.env("apiCypressVivify")}boards`,
        body: {
          name: name,
          type: type,
          organization_id: orgId,
        },
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        colorValidation(response, testMessage, statusCode);
        expect(response.status).to.eql(statusCode);
      });
  },

  getBoard({
    orgId = data.string.emptyString,
    statusCode = 200,
    testMessage = Cypress.currentTest.title,
  }) {
    return cy
      .request({
        method: "GET",
        failOnStatusCode: false,
        url: `${Cypress.env(
          "apiCypressVivify"
        )}organizations/${orgId}/boards-data`,
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        colorValidation(response, testMessage, statusCode);
        expect(response.status).to.eql(statusCode);
      });
  },

  changeBoardType({
    type = data.string.emptyString,
    boardId = data.string.emptyString,
    statusCode = 200,
    testMessage = Cypress.currentTest.title,
  }) {
    return cy
      .request({
        method: "PUT",
        failOnStatusCode: false,
        url: `${Cypress.env("apiCypressVivify")}boards/${boardId}/board-type`,
        body: {
          type: type,
        },
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        colorValidation(response, testMessage, statusCode);
        expect(response.status).to.eql(statusCode);
      });
  },

  deleteBoard({
    boardId = data.string.emptyString,
    statusCode = 200,
    testMessage = Cypress.currentTest.title,
  }) {
    return cy
      .request({
        method: "DELETE",
        failOnStatusCode: false,
        url: `${Cypress.env("apiCypressVivify")}boards/${boardId}`,
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        colorValidation(response, testMessage, statusCode);
        expect(response.status).to.eql(statusCode);
      });
  },
};

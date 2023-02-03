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
    token = window.localStorage.getItem("token"),
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
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        colorValidation(response, testMessage, statusCode);
        expect(response.status).to.eql(statusCode);
      });
  },

  getSingleBoard({
    boardId = data.string.emptyString,
    statusCode = 200,
    testMessage = Cypress.currentTest.title,
    token = window.localStorage.getItem("token"),
  }) {
    return cy
      .request({
        method: "GET",
        failOnStatusCode: false,
        url: `${Cypress.env("apiCypressVivify")}boards/${boardId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        colorValidation(response, testMessage, statusCode);
      });
  },

  getAllBoards({
    orgId = data.string.emptyString,
    statusCode = 200,
    testMessage = Cypress.currentTest.title,
    token = window.localStorage.getItem("token"),
  }) {
    return cy
      .request({
        method: "GET",
        failOnStatusCode: false,
        url: `${Cypress.env(
          "apiCypressVivify"
        )}organizations/${orgId}/boards-data`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        colorValidation(response, testMessage, statusCode);
      });
  },

  changeBoardType({
    type = data.string.emptyString,
    boardId = data.string.emptyString,
    statusCode = 200,
    testMessage = Cypress.currentTest.title,
    token = window.localStorage.getItem("token"),
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
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        colorValidation(response, testMessage, statusCode);
      });
  },

  deleteBoard({
    boardId = data.string.emptyString,
    statusCode = 200,
    testMessage = Cypress.currentTest.title,
    token = window.localStorage.getItem("token"),
  }) {
    return cy
      .request({
        method: "DELETE",
        failOnStatusCode: false,
        url: `${Cypress.env("apiCypressVivify")}boards/${boardId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        colorValidation(response, testMessage, statusCode);
      });
  },
};

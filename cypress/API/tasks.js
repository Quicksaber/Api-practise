import data from "../fixtures/data.json";
import { colorValidation } from "../support/apiValidation";
import { randomStringGenerator } from "../support/generator";

module.exports = {
  createTask({
    name = randomStringGenerator(5),
    boardId = data.string.emptyString,
    token = window.localStorage.getItem("token"),
    statusCode = 201,
    testMessage = Cypress.currentTest.title,
    sprintID = null,
  }) {
    return cy
      .request({
        method: "POST",
        failOnStatusCode: false,
        url: `${Cypress.env("apiCypressVivify")}tasks`,
        body: {
          item: {
            name: name,
            board_id: boardId,
            sprint_id: sprintID,
          },
          board_id: boardId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        colorValidation(response, testMessage, statusCode);
      });
  },

  editTask({
    token = window.localStorage.getItem("token"),
    statusCode = 200,
    testMessage = Cypress.currentTest.title,
    taskId = data.string.emptyString,
    name = randomStringGenerator(10),
    boardId = data.string.emptyString,
    description = null,
  }) {
    return cy
      .request({
        method: "PUT",
        failOnStatusCode: false,
        url: `${Cypress.env("apiCypressVivify")}tasks/${taskId}`,
        body: {
          id: taskId,
          name: name,
          board_id: boardId,
          description: description,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        colorValidation(response, testMessage, statusCode);
      });
  },

  deleteTask({
    taskId = data.string.emptyString,
    boardId = data.string.emptyString,
    token = window.localStorage.getItem("token"),
    statusCode = 200,
    testMessage = Cypress.currentTest.title,
  }) {
    return cy
      .request({
        method: "DELETE",
        failOnStatusCode: false,
        url: `${Cypress.env(
          "apiCypressVivify"
        )}tasks/${taskId}?boardId=${boardId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        colorValidation(response, testMessage, statusCode);
      });
  },
};

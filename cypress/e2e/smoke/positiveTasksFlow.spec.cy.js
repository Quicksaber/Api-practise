import organization from "../../API/organization";
import board from "../../API/boards";
import apiLogin from "../../API/login";
import { randomStringGenerator } from "../../support/generator";
import data from "../../fixtures/data.json";
import task from "../../API/tasks";

describe("api positive test /boards/tasks", () => {
  beforeEach(() => {
    cy.sessionLogin(Cypress.env("email"), Cypress.env("password"));
  });

  let boardID;
  let token;
  before(() => {
    apiLogin
      .login({
        testMessage: "Log in user before tests",
      })
      .then((response) => {
        token = response;
        organization
          .createOrganization({
            token: token,
          })
          .then((response) => {
            board
              .createBoard({
                orgId: response,
                token: token,
              })
              .then((response) => {
                boardID = response.body.id;
              });
          });
      });
  });

  after(() => {
    organization
      .myOrgs({
        name: data.orgName.org1,
      })
      .then((response) => {
        for (let i = 0; i < response.length; i++) {
          organization.deleteOrganization({
            password: Cypress.env("password"),
            id: response[i].id,
          });
        }
      });
  });
  let taskID;
  it("CT-PO-01 Create task with valid title", () => {
    task
      .createTask({
        boardId: boardID,
      })
      .then((response) => {
        taskID = response.body.id;
      });
  });

  it("CT-PO-02 Edit task name with string input", () => {
    task.editTask({
      taskId: taskID,
    });
  });

  it("CT-PO-03 Edit task description with string input", () => {
    task.editTask({
      taskId: taskID,
      description: randomStringGenerator(20),
    });
  });

  it("CT-PO-04 Delete task", () => {
    task.deleteTask({
      taskId: taskID,
      boardId: boardID,
    });
  });

  it("CT-PO-04 Create task valid title followed by a hashtag", () => {
    task.createTask({
      boardId: boardID,
    });
  });
});

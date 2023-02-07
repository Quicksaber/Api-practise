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
            testMessage: "",
          })
          .then((response) => {
            board
              .createBoard({
                orgId: response,
                token: token,
                testMessage: "",
              })
              .then((response) => {
                boardID = response.body.id;
              });
          });
      });
  });

  //   after(() => {
  //     organization
  //       .myOrgs({
  //         name: data.orgName.org1,
  //         testMessage: "",
  //       })
  //       .then((response) => {
  //         for (let i = 0; i < response.length; i++) {
  //           organization.deleteOrganization({
  //             password: Cypress.env("password"),
  //             id: response[i].id,
  //             testMessage: "",
  //           });
  //         }
  //       });
  //   });

  let taskID;
  it("CT-NE-01 Create task with empty string title", () => {
    task
      .createTask({
        boardId: boardID,
        name: data.string.emptyString,
        statusCode: 200,
      })
      .then((response) => {
        taskID = response.body.id;
        expect(taskID).to.be.an("undefined");
      });
  });

  it("CT-NE-02 Create task with null for title", () => {
    task.createTask({
      boardId: boardID,
      name: null,
      statusCode: 200,
    });
  });

  it("CT-NE-03 Create task with 5x spaces for a name", () => {
    task
      .createTask({
        boardId: boardID,
        name: data.string.onlySpace,
        statusCode: 200,
      })
      .then((response) => {
        taskID = response.body.id;
        expect(taskID).to.be.an("undefined");
      });
  });

  it("CT-NE-04 Create task with space char before string for a title", () => {
    task
      .createTask({
        boardId: boardID,
        name: data.string.spaceString,
      })
      .then((response) => {
        taskID = response.body.id;
      });
  });

  it("CT-NE-05 Create task with 999 chars for a title", () => {
    task.createTask({
      boardId: boardID,
      name: randomStringGenerator(999),
    });
  });

  it("CT-NE-06 Create task with 1001 chars for a title", () => {
    task.createTask({
      boardId: boardID,
      name: randomStringGenerator(1001),
    });
  });

  it("CT-NE-07 Create task with a hashtag as first char in a title", () => {
    task.createTask({
      boardId: boardID,
      name: `#${randomStringGenerator(10)}`,
    });
  });

  it("CT-NE-08 Create task with 1000 chars followed by hashtag with random string", () => {
    task.createTask({
      boardId: boardID,
      name: `${randomStringGenerator(1000)}#${randomStringGenerator(5)}`,
    });
  });

  it("CT-NE-09 Edit task description with 2010 chars string input", () => {
    task.editTask({
      taskId: taskID,
      name: data.string.spaceString,
      description: randomStringGenerator(2010),
    });
  });
});

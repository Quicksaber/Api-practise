import organization from "../../API/organization";
import board from "../../API/boards";
import apiLogin from "../../API/login";
import { randomStringGenerator } from "../../support/generator";
import data from "../../fixtures/data.json";

describe("api positive test/boards", () => {
  beforeEach(() => {
    cy.sessionLogin(Cypress.env("email"), Cypress.env("password"));
  });

  let orgID;
  before(() => {
    apiLogin
      .login({
        testMessage: "Log in user before tests",
      })
      .then((response) => {
        organization
          .createOrganization({
            token: response,
          })
          .then((response) => {
            orgID = response;
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

  let boardId;
  it("CB-PO-01 Create new board", () => {
    board
      .createBoard({
        orgId: orgID,
      })
      .then((response) => {
        boardId = response.body.id;
      });
    board.createBoard({
      orgId: orgID,
      name: randomStringGenerator(7),
    });
  });

  it("CB-PO-02 Get boards", () => {
    board.getBoard({
      orgId: orgID,
    });
  });

  it("CB-PO-03 Change board type", () => {
    board.changeBoardType({
      type: data.boardTypes.kanbanBoard,
      boardId: boardId,
    });
  });

  it("CB-PO-04 Delete board", () => {
    board.deleteBoard({
      boardId: boardId,
    });
  });
});

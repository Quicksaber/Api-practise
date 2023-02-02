import organization from "../../API/organization";
import board from "../../API/boards";
import apiLogin from "../../API/login"

describe("api test/boards", () => {
  beforeEach(() => {
    cy.sessionLogin(Cypress.env("email"), Cypress.env("password"));
  });

  let orgID
  before(() => {
    apiLogin.login({
      email : Cypress.env("email"),
      password : Cypress.env("password"),
      testMessage: Cypress.currentTest.title
    }).then((response) => {
      organization.createOrganization({
        title: "boardTestOrg",
        testMessage: Cypress.currentTest.title,
        token: response
      })
      .then((response) => {
        orgID = response;
      });
    })
  })

  after(() => {
    organization
      .myOrgs({
        name: "org1",
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

  // let orgID;
  // it("create org", () => {
  //   organization
  //     .createOrganization({
  //       title: "boardTestOrg",
  //       testMessage: Cypress.currentTest.title,
  //     })
  //     .then((response) => {
  //       orgID = response;
  //     });
  // });

  let boardId;
  it("Create new board CB-PO-01", () => {
    board.createBoard({
        orgId: orgID,
        name: "testBoard",
      })
      .then((response) => {
        boardId = response.body.id;
      });
      board.createBoard({
        orgId: orgID,
        name: "testBoard_2",
      });
  });

  it('Get boards CB-PO-02', () => {
    board.getBoard({
        orgId : orgID
    })
  })

  it("Change board type CB-PO-03", () => {
    board.changeBoardType({
      type: "kanban_board",
      boardId: boardId,
    });
  });

  it("Delete board CB-PO-04", () => {
    board.deleteBoard({
      boardId: boardId,
    });
  });
});

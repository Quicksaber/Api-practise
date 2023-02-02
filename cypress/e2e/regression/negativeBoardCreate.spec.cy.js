import organization from "../../API/organization";
import board from "../../API/boards";
import apiLogin from "../../API/login"

describe("api negative test/boards", () => {
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

  it("Create board with empty string CB-NE-01", () => {
        board.createBoard({
          orgId: orgID,
          name: "",
          statusCode: 200,
        });
  });

  it("Create new board with null for name CB-NE-02", () => {
    board.createBoard({
        orgId: orgID,
        name: null,
        statusCode: 200,
      });
  });

  it("Create new board with 3x spaces for name CB-NE-03", () => {
    board.createBoard({
        orgId: orgID,
        name: "   ",
        statusCode: 200,
      });
  });

  it("Create new board with space char before string for name CB-NE-04", () => {
    board.createBoard({
        orgId: orgID,
        name: " qwert",
        statusCode: 201,
      });
  });

  it("Create new board with 50+ chars for name CB-NE-05", () => {
    board.createBoard({
        orgId: orgID,
        name: "wqwqwqwqwqkjasjdlashfjkhjq1wqwqwqwqqwqqwqwwqwqqwqwqwqwqwwqwqwqwqwqwqwqwqwqwqwqwqwqwqwwqwqwqwdskfhdjskhfjkdshfkjdshfjkashdjksadbjksabndjksabdjksahbjklhwjkrhejkabfdkjsanbfkbasjkd",
        statusCode: 201,
      });
  });

  it("Create new board with 255+ chars for name CB-NE-06", () => {
    board.createBoard({
        orgId: orgID,
        name: "zwqwqwqwqwqkjasjdlashfjkhjqwqwqwqwqqwqqwqwwqwqqwqwqwqwqwwqwqwqwqwqwqwqwqwqwqwqwqwqwqwwqwqwqwdskfhdjskhfjkdshfkjdshfjkashdjksadbjksabndjksabdjksahbjklhwjkrhejkabfdkjsanbfkbasjkdbfkjsadbnfkjnsan cjkasbldjkbaskjcjaks jaskbdjbjksabbhjdashdkjashdkjjkhsdjaksdhak",
        statusCode: 200,
      });
  });

  it('Create new board with valid name and without type CB-NE-07', () => {
    board.createBoard({
        orgId : orgID,
        type : "",
        statusCode : 200
    })
  })

  it('Create new board in another user Org CB-NE-08', () => {
    board.createBoard({
        orgId : 25205,
        statusCode : 403
    })
  })

  it('Get board in another user Org CB-NE-09', () => {
    board.getBoard({
        orgId : 25205,
        statusCode : 403
    })
  })

});

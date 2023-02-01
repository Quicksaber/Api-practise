import organization from "../../API/organization";
import board from "../../API/boards";

describe("api negative test/boards", () => {
  beforeEach(() => {
    cy.sessionLogin(Cypress.env("email"), Cypress.env("password"));
  });

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

  it("Create board with empty string", () => {
    organization
      .createOrganization({
        title: "apiTestOrg",
        testMessage: Cypress.currentTest.title,
      })
      .then((response) => {
        board.createBoard({
          orgId: response,
          name: "",
          statusCode: 200,
        });
      });
  });

  it("Create new board with null for name", () => {
    organization
      .createOrganization({
        title: "apiTestOrg",
        testMessage: Cypress.currentTest.title,
      })
      .then((response) => {
        board.createBoard({
          orgId: response,
          name: null,
          statusCode: 200,
        });
      });
  });

  it("Create new board with 3x spaces for name", () => {
    organization
      .createOrganization({
        title: "apiTestOrg",
        testMessage: Cypress.currentTest.title,
      })
      .then((response) => {
        board.createBoard({
          orgId: response,
          name: "   ",
          statusCode: 200,
        });
      });
  });

  it("Create new board with space char before string for name", () => {
    organization
      .createOrganization({
        title: "apiTestOrg",
        testMessage: Cypress.currentTest.title,
      })
      .then((response) => {
        board.createBoard({
          orgId: response,
          name: " qwert",
          statusCode: 201,
        });
      });
  });

  it("Create new board with 50+ chars for name", () => {
    organization
      .createOrganization({
        title: "apiTestOrg",
        testMessage: Cypress.currentTest.title,
      })
      .then((response) => {
        board.createBoard({
          orgId: response,
          name: "wqwqwqwqwqkjasjdlashfjkhjq1wqwqwqwqqwqqwqwwqwqqwqwqwqwqwwqwqwqwqwqwqwqwqwqwqwqwqwqwqwwqwqwqwdskfhdjskhfjkdshfkjdshfjkashdjksadbjksabndjksabdjksahbjklhwjkrhejkabfdkjsanbfkbasjkd",
          statusCode: 201,
        });
      });
  });

  it("Create new board with 255+ chars for name", () => {
    organization
      .createOrganization({
        title: "apiTestOrg",
        testMessage: Cypress.currentTest.title,
      })
      .then((response) => {
        board.createBoard({
          orgId: response,
          name: "zwqwqwqwqwqkjasjdlashfjkhjqwqwqwqwqqwqqwqwwqwqqwqwqwqwqwwqwqwqwqwqwqwqwqwqwqwqwqwqwqwwqwqwqwdskfhdjskhfjkdshfkjdshfjkashdjksadbjksabndjksabdjksahbjklhwjkrhejkabfdkjsanbfkbasjkdbfkjsadbnfkjnsan cjkasbldjkbaskjcjaks jaskbdjbjksabbhjdashdkjashdkjjkhsdjaksdhak",
          statusCode: 200,
        });
      });
  });
});

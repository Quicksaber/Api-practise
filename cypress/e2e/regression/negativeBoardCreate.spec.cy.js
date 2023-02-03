import organization from "../../API/organization";
import board from "../../API/boards";
import apiLogin from "../../API/login";
import { randomStringGenerator } from "../../support/generator";
import data from "../../fixtures/data.json";

describe("api negative test/boards", () => {
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
            title: randomStringGenerator(6),
            testMessage: Cypress.currentTest.title,
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

  it("CB-NE-01 Create board with empty string", () => {
    board.createBoard({
      orgId: orgID,
      name: data.string.emptyString,
      statusCode: 200,
    });
  });

  it("CB-NE-02 Create new board with null for name", () => {
    board.createBoard({
      orgId: orgID,
      name: null,
      statusCode: 200,
    });
  });

  it("CB-NE-03 Create new board with 3x spaces for name", () => {
    board.createBoard({
      orgId: orgID,
      name: data.string.onlySpace,
      statusCode: 200,
    });
  });

  it("CB-NE-04 Create new board with space char before string for name", () => {
    board.createBoard({
      orgId: orgID,
      name: randomStringGenerator(5),
      statusCode: 201,
    });
  });

  it("CB-NE-05 Create new board with 50+ chars for name", () => {
    board.createBoard({
      orgId: orgID,
      name: randomStringGenerator(51),
      statusCode: 201,
    });
  });

  it("CB-NE-06 Create new board with 255+ chars for name", () => {
    board.createBoard({
      orgId: orgID,
      name: randomStringGenerator(256),
      statusCode: 200,
    });
  });

  it("CB-NE-07 Create new board with valid name and without type", () => {
    board.createBoard({
      orgId: orgID,
      type: data.string.emptyString,
      statusCode: 200,
    });
  });

  it("CB-NE-08 Create new board in another user Org", () => {
    board.createBoard({
      orgId: data.foreignOrgId.orgId1,
      statusCode: 403,
    });
  });

  it("CB-NE-09 Get board in another user Org", () => {
    board.getBoard({
      orgId: data.foreignOrgId.orgId1,
      statusCode: 403,
    });
  });
});

import organization from "../../API/organization";
import board from "../../API/boards";
import apiLogin from "../../API/login"
import  {randomStringGenerator} from "../../support/generator";
import data from "../../fixtures/data.json"

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
        title: randomStringGenerator(6),
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

  it("Create board with empty string CB-NE-01", () => {
        board.createBoard({
          orgId: orgID,
          name: data.string.emptyString,
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
        name: data.string.onlySpace,
        statusCode: 200,
      });
  });

  it("Create new board with space char before string for name CB-NE-04", () => {
    board.createBoard({
        orgId: orgID,
        name: ` ${randomStringGenerator(5)}`,
        statusCode: 201,
      });
  });

  it("Create new board with 50+ chars for name CB-NE-05", () => {
    board.createBoard({
        orgId: orgID,
        name: `${randomStringGenerator(51)}`,
        statusCode: 201,
      });
  });

  it("Create new board with 255+ chars for name CB-NE-06", () => {
    board.createBoard({
        orgId: orgID,
        name: `${randomStringGenerator(256)}`,
        statusCode: 200,
      });
  });

  it('Create new board with valid name and without type CB-NE-07', () => {
    board.createBoard({
        orgId : orgID,
        type : data.string.emptyString,
        statusCode : 200
    })
  })

  it('Create new board in another user Org CB-NE-08', () => {
    board.createBoard({
        orgId : data.foreignOrgId.orgId1,
        statusCode : 403
    })
  })

  it('Get board in another user Org CB-NE-09', () => {
    board.getBoard({
        orgId : data.foreignOrgId.orgId1,
        statusCode : 403
    })
  })

});

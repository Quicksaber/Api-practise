import organization from "../../API/organization";
import  {randomStringGenerator} from "../../support/generator";
import data from "../../fixtures/data.json";

describe("negative Org create test", () => {
  beforeEach(() => {
    cy.sessionLogin(Cypress.env('email'), Cypress.env('password'))
  });

  after(() => {
    organization.myOrgs({
      name : data.orgName.org1,
    }).then((response) => {
      console.log(response)
      for (let i = 0; i < response.length; i++) {
        organization.deleteOrganization({
          password: Cypress.env('password'),
          id: response[i].id,
        });
      }
    });
  });

  it("Create org with empty string as title CO-NE-01", () => {
    organization.createOrganization({
      title : data.string.emptyString,
      testMessage : Cypress.currentTest.title,
      statusCode : 400
    })
  });

  it("Create org with with null for title CO-NE-02", () => {
    organization.createOrganization({
      title : null,
      testMessage : Cypress.currentTest.title,
      statusCode : 400
    })
  });

  it("Create org with with 3x spaces for title CO-NE-03", () => {
    organization.createOrganization({
      title : data.string.onlySpace,
      testMessage : Cypress.currentTest.title,
      statusCode : 400
    })
  });

  it("Create org with with space before string for title CO-NE-04", () => {
    organization.createOrganization({
      title : data.string.spaceString,
      testMessage : Cypress.currentTest.title,
      statusCode : 201
    })
  });

  it("Create org with with 50+ chars for title CO-NE-05", () => {
    organization.createOrganization({
      title : randomStringGenerator(51),
      testMessage : Cypress.currentTest.title,
      statusCode : 201
    })
  });

  it("Create org with with 255+ chars for title CO-NE-06", () => {
    organization.createOrganization({
      title : randomStringGenerator(256),
      testMessage : Cypress.currentTest.title,
      statusCode : 400
    })
  });




})
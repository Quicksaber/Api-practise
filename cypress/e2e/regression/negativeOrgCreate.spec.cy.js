import organization from "../../API/organization";
import { randomStringGenerator } from "../../support/generator";
import data from "../../fixtures/data.json";

describe("negative Org create test", () => {
  beforeEach(() => {
    cy.sessionLogin(Cypress.env("email"), Cypress.env("password"));
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

  it("CO-NE-01 Create org with empty string as title", () => {
    organization.createOrganization({
      title: data.string.emptyString,
      testMessage: Cypress.currentTest.title,
      statusCode: 400,
    });
  });

  it("CO-NE-02 Create org with with null for title", () => {
    organization.createOrganization({
      title: null,
      testMessage: Cypress.currentTest.title,
      statusCode: 400,
    });
  });

  it("CO-NE-03 Create org with with 3x spaces for title ", () => {
    organization.createOrganization({
      title: data.string.onlySpace,
      testMessage: Cypress.currentTest.title,
      statusCode: 400,
    });
  });

  it("CO-NE-04 Create org with with space before string for title", () => {
    organization.createOrganization({
      title: data.string.spaceString,
      testMessage: Cypress.currentTest.title,
      statusCode: 201,
    });
  });

  it("CO-NE-05 Create org with with 50+ chars for title", () => {
    organization.createOrganization({
      title: randomStringGenerator(51),
      testMessage: Cypress.currentTest.title,
      statusCode: 201,
    });
  });

  it("CO-NE-06 Create org with with 255+ chars for title", () => {
    organization.createOrganization({
      title: randomStringGenerator(256),
      testMessage: Cypress.currentTest.title,
      statusCode: 400,
    });
  });
});

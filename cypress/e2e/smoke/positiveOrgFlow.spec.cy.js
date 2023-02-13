import organization from "../../API/organization";
import data from "../../fixtures/data.json";
import { randomStringGenerator } from "../../support/generator";

describe("api positive test/orgs", () => {
  beforeEach(() => {
    cy.sessionLogin(Cypress.env("email"), Cypress.env("password"));
    cy.visit("");
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

  let orgID;
  it("CO-PO-01 Create org with valid name", () => {
    organization.createOrganization({}).then((response) => {
      orgID = response;
    });
  });

  it("CO-PO-02 Update organization", () => {
    organization.myOrgs({}).then((response) => {
      for (let i = 0; i < response.length; i++) {
        organization.updateOrganization({
          oldName: response[i].name,
          id: response[i].id,
        });
      }
    });
  });

  it("CO-PO-03 Archive organizations", () => {
    organization.myOrgs({}).then((response) => {
      for (let i = 0; i < response.length; i++) {
        if (response[i].status === data.orgStatus.orgActive) {
          organization.archiveOrganization({
            id: response[i].id,
          });
        }
      }
    });
  });

  it("CO-PO-04 Delete only archived organizations", () => {
    organization.myOrgs({}).then((response) => {
      for (let i = 0; i < response.length; i++) {
        if (response[i].status === data.orgStatus.orgArchived) {
          organization.deleteOrganization({
            password: Cypress.env("password"),
            id: response[i].id,
          });
        }
      }
    });
  });
});

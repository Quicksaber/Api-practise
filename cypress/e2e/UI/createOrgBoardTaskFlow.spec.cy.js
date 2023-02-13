import organization from "../../pageObject/myOrgsPage";

describe("create org, board and task flow", () => {
  before(() => {
    cy.sessionLogin(Cypress.env("email"), Cypress.env("password"));
    cy.visit("");
  });

  it("UI-PO-01 Create organization with valid string as name", () => {
    organization.addNewOrganizationButton.should(
      "have.text",
      "Add new Organization"
    );
    organization.createOrganization(33);
  });
});

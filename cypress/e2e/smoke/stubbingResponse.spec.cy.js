import organization from "../../API/organization";
import board from "../../API/boards";
import apiLogin from "../../API/login";
import { randomStringGenerator } from "../../support/generator";
import data from "../../fixtures/data.json";
import myOrgs from "../../fixtures/myOrgs.json";

describe("api stubbing", () => {
  beforeEach(() => {
    cy.sessionLogin(Cypress.env("email"), Cypress.env("password"));
  });

  it("stubbing test for organizations", () => {
    cy.intercept({
      method: "GET",
      url: `${Cypress.env("apiCypressVivify")}my-organizations`,
    });
  });
});

import organization from "../../pageObject/myOrgsPage";
import board from "../../pageObject/boardsPage";
import { randomStringGenerator } from "../../support/generator";

describe("create org, board and task flow", () => {
  before(() => {
    cy.sessionLogin(Cypress.env("email"), Cypress.env("password"));
    cy.visit("");
  });

  it("UI-PO-01 Create organization with valid string as name", () => {
    organization.createOrganization(randomStringGenerator(5));
    cy.visit("");
  });

  it("UI-PO-01 Create board with valid string as name", () => {
    board.createBoard(randomStringGenerator(55));
  });
});

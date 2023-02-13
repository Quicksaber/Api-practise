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
    cy.intercept(
      {
        method: "GET",
        url: `${Cypress.env("apiCypressVivify")}my-organizations`,
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      },
      (req) => {
        req.reply({ fixture: "myOrgs" });
      }
    );

    // cy.intercept(
    //   {
    //     method: "GET",
    //     url: `${Cypress.env("apiCypressVivify")}organizations-data`,
    //     headers: {
    //       Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    //     },
    //   },
    //   {
    //     fixture: "orgData",
    //   }
    // ).as('orgData');
    // cy.visit("");

    cy.intercept(
      {
        method: "GET",
        url: `${Cypress.env("apiCypressVivify")}organizations-data`,
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      },
      (req) => {
        req.reply({ fixture: "orgData" });
      }
    ).as("orgData");
    cy.visit("");
  });
});

import loginApi from "../API/login";
import data from "../fixtures/data.json";
import createAPI from "../API/createOrg";
import myOrgs from "../API/myOrgs";
import deleteOrg from "../API/deleteOrg";
import archiveOrg from "../API/archiveOrg";
import faker from 'faker';

describe("api test", () => {
  before(() => {
    cy.visit("");
  });

  let accessToken;
  it("apiLogin-1", () => {
    loginApi
      .login({ 
        email: "raziel141221345643@gmail.com",
        password: data.user.password,
        testMessage : Cypress.currentTest.title,
        statusCode : 401
      })
      .then((response) => {
        accessToken = response;
      });
  });
});

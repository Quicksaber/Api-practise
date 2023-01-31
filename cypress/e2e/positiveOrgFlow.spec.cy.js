import loginApi from "../API/login";
import data from "../fixtures/data.json";
import createAPI from "../API/createOrg";
import myOrgs from "../API/myOrgs";
import deleteOrg from "../API/deleteOrg";
import archiveOrg from "../API/archiveOrg";

describe("api test", () => {
  before(() => {
    cy.visit("");
  });

  after(() => {
    myOrgs.myOrgs({
      name : "org1"
    }).then((response) => {
      for (let i = 0; i < response.length; i++) {
        deleteOrg.deleteOrganization({
          password: data.user.password,
          id: response[i].id,
        });
      }
    });
  });

  let accessToken;
  it("GET token", () => {
    loginApi
      .login({ email: data.user.email, password: data.user.password })
      .then((response) => {
        accessToken = response;
      });
  });

  let orgID;
  it("Create org", () => {
    createAPI.createOrganization({
      token : accessToken,
      title : "testOrg",
      testMessage : Cypress.currentTest.title
    }).then((response) => {
      orgID = response;
    });
  });

  // it('Archive organizations', () => {
  //   myOrgs.myOrgs({})
  //   .then((response) => {
  //     for(let i=0; i < response.length; i++){
  //       if(response[i].status === "active"){
  //         archiveOrg.archiveOrganization({
  //           id : response[i].id
  //         })
  //       }
  //     }
  //   })
  // })

  // it('delete only archived organizations', () => {
  //   myOrgs.myOrgs({})
  //   .then((response) => {
  //     for(let i = 0; i < response.length; i++){
  //       if(response[i].status === "archived"){
  //         deleteOrg.deleteOrganization({
  //           password : data.user.password,
  //           id : response[i].id
  //         })
  //       }
  //     }
  //   })
  // })

  // it('my orgs', () => {
  //   myOrgs.myOrgs({}).then((response) => {
  //     console.log(response[0].id)
  //   })
  // })

});

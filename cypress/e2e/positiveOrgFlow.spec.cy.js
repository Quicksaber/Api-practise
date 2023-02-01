// import loginApi from "../API/login";
import data from "../fixtures/data.json";
// import createAPI from "../API/createOrg";
// import myOrgs from "../API/myOrgs";
// import deleteOrg from "../API/deleteOrg";
// import archiveOrg from "../API/archiveOrg";
import organization from "../API/organization"

describe("api test", () => {
  beforeEach(() => {
    cy.sessionLogin(Cypress.env('email'), Cypress.env('password'))
  });

  after(() => {
    organization.myOrgs({
      name : "org1",
    }).then((response) => {
      for (let i = 0; i < response.length; i++) {
        organization.deleteOrganization({
          password: data.user.password,
          id: response[i].id,
        });
      }
    });
  });

  // let accessToken;
  // it("GET token", () => {
  //   loginApi
  //     .login({ email: data.user.email, password: data.user.password })
  //     .then((response) => {
  //       accessToken = response;
  //     });
  // });

  let orgID;
  it("Create org", () => {
    organization.createOrganization({
      title : "testOrg",
      testMessage : Cypress.currentTest.title
    }).then((response) => {
      orgID = response;
    });
  });

  // it('Archive organizations', () => {
  //   organization.myOrgs({})
  //   .then((response) => {
  //     for(let i=0; i < response.length; i++){
  //       if(response[i].status === "active"){
  //         organization.archiveOrganization({
  //           id : response[i].id
  //         })
  //       }
  //     }
  //   })
  // })

  // it('delete only archived organizations', () => {
  //   organization.myOrgs({})
  //   .then((response) => {
  //     for(let i = 0; i < response.length; i++){
  //       if(response[i].status === "archived"){
  //         organization.deleteOrganization({
  //           password : data.user.password,
  //           id : response[i].id
  //         })
  //       }
  //     }
  //   })
  // })

  // it('my orgs', () => {
  //   organization.myOrgs({}).then((response) => {
  //     console.log(response[0].id)
  //   })
  // })

});

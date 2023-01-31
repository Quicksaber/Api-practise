import loginApi from "../API/login";
import data from "../fixtures/data.json";
import createAPI from "../API/createOrg";
import myOrgs from "../API/myOrgs";
import deleteOrg from "../API/deleteOrg";

describe("api test", () => {
  before(() => {
    cy.visit("");
  });

  after(() => {
    myOrgs.myOrgs({}).then((response) => {
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

    // cy.request('POST', `${data.url.apiCypressVivify}login`, data.user)
    //     .its('body').then((req) => {
    //         accessToken = req.token;
    //   })
  });
  let orgID;
  it("Create org", () => {
    createAPI.createOrganization({}).then((response) => {
      orgID = response;
    });
  });

  // it('my orgs', () => {
  //   myOrgs.myOrgs({}).then((response) => {
  //     console.log(response[0].id)
  //   })
  // })

  // it('delete all orgs', () => {
  //   myOrgs.myOrgs({})
  //   .then((response) => {
  //     for(let i=0; i < response.length; i++){
  //       deleteOrg.deleteOrganization({password : data.user.password, id : response[i].id})
  //     }
  //   })
  // })
});

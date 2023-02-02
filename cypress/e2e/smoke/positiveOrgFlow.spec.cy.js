import organization from "../../API/organization"

describe("api test", () => {
  beforeEach(() => {
    cy.sessionLogin(Cypress.env('email'), Cypress.env('password'))
  });

  after(() => {
    organization.myOrgs({
      name : "org1",
    }).then((response) => {
      console.log(response)
      for (let i = 0; i < response.length; i++) {
        organization.deleteOrganization({
          password: Cypress.env('password'),
          id: response[i].id,
        });
      }
    });
  });

  let orgID;
  it("Create org with valid name CO-PO-01", () => {
    organization.createOrganization({
      title : "testOrg",
      testMessage : Cypress.currentTest.title
    }).then((response) => {
      orgID = response;
    });
  });

  it('update organization CO-PO-02', () => {
    organization.myOrgs({})
    .then((response) => {
      for(let i = 0; i < response.length; i++){
        organization.updateOrganization({
          oldName : response[i].name,
          id : response[i].id
        })
      }
    })
  })

  // it('Archive organizations CO-PO-03', () => {
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

  // it('delete only archived organizations CO-PO-04', () => {
  //   organization.myOrgs({})
  //   .then((response) => {
  //     for(let i = 0; i < response.length; i++){
  //       if(response[i].status === "archived"){
  //         organization.deleteOrganization({
  //           password : Cypress.env('password'),
  //           id : response[i].id
  //         })
  //       }
  //     }
  //   })
  // })

});

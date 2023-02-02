import organization from "../../API/organization"
import data from "../../fixtures/data.json"
import  {randomStringGenerator} from "../../support/generator";

describe("api positive test/orgs", () => {
  beforeEach(() => {
    cy.sessionLogin(Cypress.env('email'), Cypress.env('password'))
  });

  after(() => {
    organization.myOrgs({
      name : data.orgName.org1,
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
    organization.createOrganization({})
    .then((response) => {
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

  it('Archive organizations CO-PO-03', () => {
    organization.myOrgs({})
    .then((response) => {
      for(let i=0; i < response.length; i++){
        if(response[i].status === data.orgStatus.orgActive){
          organization.archiveOrganization({
            id : response[i].id
          })
        }
      }
    })
  })

  it('delete only archived organizations CO-PO-04', () => {
    organization.myOrgs({})
    .then((response) => {
      for(let i = 0; i < response.length; i++){
        if(response[i].status === data.orgStatus.orgArchived){
          organization.deleteOrganization({
            password : Cypress.env('password'),
            id : response[i].id
          })
        }
      }
    })
  })

});

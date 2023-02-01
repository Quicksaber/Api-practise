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

  it("Create org with empty string as title", () => {
    organization.createOrganization({
      title : "",
      testMessage : Cypress.currentTest.title,
      statusCode : 400
    })
  });

  it("Create org with with null for title", () => {
    organization.createOrganization({
      title : null,
      testMessage : Cypress.currentTest.title,
      statusCode : 400
    })
  });

  it("Create org with with 3x spaces for title", () => {
    organization.createOrganization({
      title : "   ",
      testMessage : Cypress.currentTest.title,
      statusCode : 400
    })
  });

  it("Create org with with space before string for title", () => {
    organization.createOrganization({
      title : "    qwert",
      testMessage : Cypress.currentTest.title,
      statusCode : 201
    })
  });

  it("Create org with with 50+ chars for title", () => {
    organization.createOrganization({
      title : "qpqpqpqpqpqpqpqpqpqpqpqpqpqpqpqpqpqpqpqpqpqpqpqpqpqqq",
      testMessage : Cypress.currentTest.title,
      statusCode : 201
    })
  });

  it("Create org with with 255+ chars for title", () => {
    organization.createOrganization({
      title : "zwqwqwqwqwqkjasjdlashfjkhjqwqwqwqwqqwqqwqwwqwqqwqwqwqwqwwqwqwqwqwqwqwqwqwqwqwqwqwqwqwwqwqwqwdskfhdjskhfjkdshfkjdshfjkashdjksadbjksabndjksabdjksahbjklhwjkrhejkabfdkjsanbfkbasjkdbfkjsadbnfkjnsan cjkasbldjkbaskjcjaks jaskbdjbjksabbhjdashdkjashdkjjkhsdjaksdhak",
      testMessage : Cypress.currentTest.title,
      statusCode : 400
    })
  });




})
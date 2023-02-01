import  data  from '../fixtures/data.json'

describe("api test", () => {
    beforeEach(() => {
      cy.sessionLogin(Cypress.env('email'), Cypress.env('password'))
    });

    it('console', () => {
        console.log('testic')
    }
    )
})
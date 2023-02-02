import color from "../support/colorLog";
import { randomStringGenerator } from "../support/generator"
import data from "../fixtures/data.json"

module.exports = {
  createOrganization({ 
    title = randomStringGenerator(7),
    statusCode = 201,
    testMessage = Cypress.currentTest.title,
    token = window.localStorage.getItem('token')
    }) {
    return cy.request({
      method: "POST",
      failOnStatusCode: false,
      url: `${Cypress.env('apiCypressVivify')}organizations`,
      body: {
        name: title
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
        typeof response.status != 'undefined' && response.status === statusCode
                ? color.log(`${testMessage}`, 'success')
                : color.log(`${testMessage} ${JSON.stringify(response)}`, 'error');
        expect(response.status).to.eql(statusCode)
        return response.body.id
    });
  },

  myOrgs({
    statusCode = 200,
    name = data.string.emptyString,
    testMessage = Cypress.currentTest.title,
}){
    return cy.request({
        method: "GET",
        failOnStatusCode: false,
        url: `${Cypress.env('apiCypressVivify')}my-organizations`,
        headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`
          }
    })
    .then((response) => {
        typeof response.status != 'undefined' && response.status === statusCode
                ? color.log(`${testMessage}`, 'success')
                : color.log(`${testMessage} ${JSON.stringify(response)}`, 'error');
        expect(response.status).to.eql(statusCode)        
        let result = response.body.filter(orgName => (
            orgName.name === name
        ))
        if (result.length > 0){
            return result
        }else{
            return response.body
        }
    })
    },

    archiveOrganization({
        statusCode = 200,
        status = data.orgStatus.orgArchived,
        id = data.string.emptyString,
        testMessage = Cypress.currentTest.title,
    }){
        return cy.request({
            method : 'PUT',
            failOnStatusCode: false,
            url :  `${Cypress.env('apiCypressVivify')}organizations/${id}/status`,
            body : {
                status : status  
            },
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`
              }
        }).then((response) => {
            typeof response.status != 'undefined' && response.status === statusCode
                ? color.log(`${testMessage}`, 'success')
                : color.log(`${testMessage} ${JSON.stringify(response)}`, 'error');
            expect(response.status).to.eql(statusCode)
        })
    },

    deleteOrganization({
        password = data.string.emptyString,
        id = data.string.emptyString,
        statusCode = 201,
        testMessage = Cypress.currentTest.title,
    }) {
        return cy.request({
            method : 'POST',
            failOnStatusCode: false,
            url :  `${Cypress.env('apiCypressVivify')}organizations/${id}`,
            body : {
                passwordOrEmail : password  
            },
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}` 
              }
        }).then((response) => {
            typeof response.status != 'undefined' && response.status === statusCode
                ? color.log(`${testMessage}`, 'success')
                : color.log(`${testMessage} ${JSON.stringify(response)}`, 'error');
            expect(response.status).to.eql(statusCode)
        })
    },

    updateOrganization({
        oldName = data.string.emptyString,
        newName = "edited",
        id = data.string.emptyString,
        statusCode = 200,
        testMessage = Cypress.currentTest.title,
    }) {
        return cy.request({
            method : 'PUT',
            failOnStatusCode: false,
            url :  `${Cypress.env('apiCypressVivify')}organizations/${id}`,
            body : {
                name : `${newName}${oldName}` 
            },
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}` 
            }
        }).then((response) => {
            typeof response.status != 'undefined' && response.status === statusCode
                ? color.log(`${testMessage}`, 'success')
                : color.log(`${testMessage} ${JSON.stringify(response)}`, 'error');
            expect(response.status).to.eql(statusCode)
        })
    },
}   



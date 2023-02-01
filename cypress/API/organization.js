import data from "../fixtures/data.json";
import color from "../support/colorLog";

module.exports = {
  createOrganization({ 
    title = "testCompany",
    statusCode = 201,
    testMessage = "",
    }) {
    return cy.request({
      method: "POST",
      failOnStatusCode: false,
      url: `${Cypress.env('apiCypressVivify')}organizations`,
      body: {
        name: title
      },
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
      }
    }).then((response) => {
        // console.log(response)
        typeof response.status != 'undefined' && response.status === statusCode
                ? color.log(`${testMessage}`, 'success')
                : color.log(`${testMessage} ${JSON.stringify(response)}`, 'error');
        expect(response.status).to.eql(statusCode)
        return response.body.id
    });
  },

  myOrgs({
    statusCode = 200,
    name = ""
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
        // console.log(response.body)
        // expect(response.status).to.eql(statusCode)
        // return response.body
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
        status = "archived",
        id = ""
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
            expect(response.status).to.eql(statusCode)
        })
    },

    deleteOrganization({
        password = "",
        id = "",
        statusCode = 201
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
            expect(response.status).to.eql(statusCode)
        })
    },

    updateOrganization({
        oldName = "",
        newName = "edited",
        id = "",
        statusCode = 200
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
            expect(response.status).to.eql(statusCode)
        })
    },

    login({
        email = "",
        password = "",
        testMessage = "",
        statusCode = 200
    }) {
        return cy.request({
            method : 'POST',
            failOnStatusCode: false,
            url :  `${data.url.apiCypressVivify}login`,
            body : {
                email : email,
                password : password  
            }
        })
        .then((response) => {
            // console.log(req)
            typeof response.status != 'undefined' && response.status === statusCode
                ? color.log(`${testMessage}`, 'success')
                : color.log(`${testMessage} ${JSON.stringify(response)}`, 'error');
            expect(response.status).to.eql(statusCode)
            
            return response.body.token;
        })

    }
}   



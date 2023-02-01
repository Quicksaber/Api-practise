import data from "../fixtures/data.json";
import color from "../support/colorLog";

module.exports = {
    createBoard({
        name = "",
        type = "scrum_board",
        orgId = "",
        statusCode = 201
    }){
        return cy.request({
            method : 'POST',
            failOnStatusCode: false,
            url :  `${Cypress.env('apiCypressVivify')}boards`,
            body : {
                name : name,
                type : type,
                organization_id : orgId
            },
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}` 
            }
        }).then((response) => {
            console.log(response)
            expect(response.status).to.eql(statusCode)
        })
    },

    changeBoardType({
        type = "",
        boardId = "",
        statusCode = 200
    }) {
        return cy.request({
            method : 'PUT',
            failOnStatusCode: false,
            url : `${Cypress.env('apiCypressVivify')}boards/${boardId}/board-type`,
            body : {
                type : type
            },
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}` 
            }
        }).then((response) => {
            expect(response.status).to.eql(statusCode)
        })
    },

    deleteBoard({
        boardId = "",
        statusCode = 200
    }) {
        return cy.request({
            method : 'DELETE',
            failOnStatusCode: false,
            url : `${Cypress.env('apiCypressVivify')}boards/${boardId}`,
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}` 
            }
        }).then((response) => {
            expect(response.status).to.eql(statusCode)
        })
    }
}
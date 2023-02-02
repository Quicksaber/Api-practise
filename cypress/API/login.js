import  data  from '../fixtures/data.json'
import color from "../support/colorLog";

module.exports = {
    login({
        email = data.string.emptyString,
        password = data.string.emptyString,
        testMessage = data.string.emptyString,
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
            typeof response.status != 'undefined' && response.status === statusCode
                ? color.log(`${testMessage}`, 'success')
                : color.log(`${testMessage} ${JSON.stringify(response)}`, 'error');
            expect(response.status).to.eql(statusCode)
            
            return response.body.token;
        })

    }
}

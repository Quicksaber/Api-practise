import  data  from '../fixtures/data.json'

module.exports = {
    login({
        email = "",
        password = "",
        statusCode = 200
    }) {
        return cy.request({
            method : 'POST',
            url :  `${data.url.apiCypressVivify}login`,
            body : {
                email : email,
                password : password  
            }
        })
        .then((req) => {
            // console.log(req)
                    
            expect(req.status).to.eql(statusCode)
            expect(req.body.user.email).to.deep.equal(data.user.email)
            
            return req.body.token;
        })

    }
}
import data from "../fixtures/data.json";

module.exports = {
    deleteOrganization({
        password = "",
        id = "",
        statusCode = 201,
        token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vY3lwcmVzcy1hcGkudml2aWZ5c2NydW0tc3RhZ2UuY29tL2FwaS92Mi9sb2dpbiIsImlhdCI6MTY3NTA3ODkwMCwibmJmIjoxNjc1MDc4OTAwLCJqdGkiOiJYakFWSEI2VDU2Q2FDRW5MIiwic3ViIjoyOTY5LCJwcnYiOiI5ZjhhMjM4OWEyMGNhMDc1MmFhOWU5NTA5MzUxNTUxN2U5MGUxOTRjIiwidXNlciI6eyJpZCI6Mjk2OSwidG9rZW5fdXVpZCI6IkRmcHJPS2ZJNHZ5TmZDU3kifX0._10R-5prIyVtLHv1zVmEUomMA3sNQwomUWfGNk3opjE"
    }) {
        return cy.request({
            method : 'POST',
            failOnStatusCode: false,
            url :  `${data.url.apiCypressVivify}organizations/${id}`,
            body : {
                passwordOrEmail : password  
            },
            headers: {
                Authorization: `Bearer ${token}` 
              }
        }).then((response) => {
            expect(response.status).to.eql(statusCode)
        })
    }
}
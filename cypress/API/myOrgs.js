import data from "../fixtures/data.json";

module.exports = {
    myOrgs({
        statusCode = 200,
        name = "",
        token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vY3lwcmVzcy1hcGkudml2aWZ5c2NydW0tc3RhZ2UuY29tL2FwaS92Mi9sb2dpbiIsImlhdCI6MTY3NTA3ODkwMCwibmJmIjoxNjc1MDc4OTAwLCJqdGkiOiJYakFWSEI2VDU2Q2FDRW5MIiwic3ViIjoyOTY5LCJwcnYiOiI5ZjhhMjM4OWEyMGNhMDc1MmFhOWU5NTA5MzUxNTUxN2U5MGUxOTRjIiwidXNlciI6eyJpZCI6Mjk2OSwidG9rZW5fdXVpZCI6IkRmcHJPS2ZJNHZ5TmZDU3kifX0._10R-5prIyVtLHv1zVmEUomMA3sNQwomUWfGNk3opjE"
    }){
        return cy.request({
            method: "GET",
            failOnStatusCode: false,
            url: `${data.url.apiCypressVivify}my-organizations`,
            headers: {
                Authorization: `Bearer ${token}`
              }
        })
        .then((response) => {
            // console.log(response.body)
            expect(response.status).to.eql(statusCode)
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
    }
}
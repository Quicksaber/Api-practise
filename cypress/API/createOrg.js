import data from "../fixtures/data.json";
import color from "../support/colorLog";

module.exports = {
  createOrganization({ 
    title = "Zikacompany",
    statusCode = 201,
    testMessage = "",
    token = ""
    }) {
    return cy.request({
      method: "POST",
      failOnStatusCode: false,
      url: `${data.url.apiCypressVivify}organizations`,
      body: {
        name: title
      },
      headers: {
        Authorization: `Bearer ${token}`
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
};

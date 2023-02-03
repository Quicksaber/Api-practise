import color from "../support/colorLog";

module.exports = {
    colorValidation(response, testMessage, statusCode) {
        typeof response.status != "undefined" && response.status === statusCode
          ? color.log(`${testMessage}`, "success")
          : color.log(`${testMessage} ${JSON.stringify(response)}`, "error");

    }
}



var handleError = require('./handle-api-error.js');

var handleResponse = function(error, response, body) {
	if (error) {
		handleError(error);
	}
	return response;
}

module.exports = handleResponse;

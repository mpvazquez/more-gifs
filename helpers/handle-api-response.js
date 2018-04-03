var handleError = require('./handle-api-error.js');

var handleResponse = function(error, response) {
	if (error) {
		handleError(error);
	}
	return response;
}

module.exports = handleResponse;

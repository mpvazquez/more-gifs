var handleError = require('./handle-api-error.js');

var handleResponse = function(error, response) {
	if (error) {
		handleError(error, 'Error in handleResponse: ');
	}
	return response;
}

module.exports = handleResponse;

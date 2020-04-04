var handleError = require('./handle-api-error.js');

var parseApiResponse = function(response) {
	var data = [];

	try {
		var json = JSON.parse(response);

		// giphy API returns JSON w/ a data property
		if (json.data) {
			for (var i = 0; i < json.data.length; i++) {
				data.push({
					image: json.data[i].images.fixed_width.url,
					title: json.data[i].title,
					url: json.data[i].url
				});
			}
		} else {
			for (var key in json) {
				var synonymList = json[key].syn;
				data = data.concat(synonymList);
			}
		}
	} catch (error) {
		handleError(error, 'Error in parseApiResponse: ');
	}

	return data;
}

module.exports = parseApiResponse;

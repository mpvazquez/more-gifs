var handleError = require('./handle-api-error.js');

var parseApiResponse = function(response) {
	var data = [];

	try {
		var json = JSON.parse(response);

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
				var synonymsList = json[key].syn;
				data = data.concat(synonymsList);
			}
		}
	} catch (error) {
		handleError(error);
	}

	return data;
}

module.exports = parseApiResponse;

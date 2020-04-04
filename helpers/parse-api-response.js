var handleError = require('./handle-api-error.js');

var _parseGiphyData = function(data) {
	var parsedData = [];

	for (var i = 0; i < data.length; i++) {
		parsedData.push({
			image: data[i].images.fixed_width.url,
			title: data[i].title,
			url: data[i].url
		});
	}

	return parsedData;
}

var _parseBigHugeLabsData = function(data) {
	var parsedData = [];

	// this API can return an array OR an object. Need to parse both.
	if (data instanceof Array) {
		parsedData = data;
	} else {
		for (var key in data) {
			var synonymList = data[key].syn;
			parsedData = parsedData.concat(synonymList);
		}
	}

	return parsedData;
}

var parseApiResponse = function(response) {
	var output = [];

	try {
		var data = JSON.parse(response);

		if (data.data) {
			output = _parseGiphyData(data.data);
		} else {
			output = _parseBigHugeLabsData(data);
		}
	} catch (error) {
		handleError(error, 'Error in parseApiResponse: ');
	}

	return output;
}

module.exports = parseApiResponse;

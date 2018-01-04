var GIPHY_API_KEY = process.env.GIPHY_API_KEY;

var handleResponse = require('./handle-api-response.js');
var request = require('request-promise');

var giphyAPI = function(search, limit, offset) {
	var apiKey = 'api_key=' + GIPHY_API_KEY;
	var apiLimit = '';
	var apiOffset = '';
	var apiQuery = '';
	var url = 'http://api.giphy.com/v1/gifs';

	if (limit) {
		apiLimit = '&limit=' + limit;
	}

	if (offset) {
		apiOffset = '&offset=' + offset;
	}

	if (search) {
		url += '/search?';
		apiQuery = '&q=' + search;
	} else {
		url += '/trending?';
	}

	url += (apiKey + apiLimit + apiOffset + apiQuery);

	return request(url, handleResponse);
}

module.exports = giphyAPI;

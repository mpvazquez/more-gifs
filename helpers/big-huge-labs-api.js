var BIG_HUGE_LABS_THESAURUS_API_KEY = process.env.BIG_HUGE_LABS_THESAURUS_API_KEY;

var handleResponse = require('./handle-api-response.js');
var request = require('request-promise');

var getSynonyms = function(search) {
	var format = 'json';
	var url = 'http://words.bighugelabs.com/api/2/';
	var multipleWordSearch = search.split(' ');

	if (multipleWordSearch[1]) {
		search = multipleWordSearch[1];
	}

	url += BIG_HUGE_LABS_THESAURUS_API_KEY + '/' + search + '/' + format;

	return request(url, handleResponse);
}

module.exports = getSynonyms;

(function() {
	'use strict';

	var express = require('express');

	var bigHugeLabsAPI = require('./helpers/big-huge-labs-api.js');
	var giphyAPI = require('./helpers/giphy-api.js');
	var handleError = require('./helpers/handle-api-error');
	var parseApiResponse = require('./helpers/parse-api-response.js');

	var PORT = process.env.PORT || 8080;
	var QUERY_LIMIT = 25;

	var app = express();

	function redirect(req, res) {
		res.redirect('/');
	}

	function returnGifData(req, res) {
		var limit = req.query.limit || QUERY_LIMIT;
		var offset = req.query.offset || 0;
		var query = req.query.query;

		giphyAPI(query, limit, offset)
			.catch(function(error) {
				handleError(error, 'Error in server.js API response from giphyAPI: ');
			})
			.then(function(response) {
				var gifs = parseApiResponse(response);

				res.json(gifs);
			});
	}

	function returnSynonymData(req, res) {
		var query = req.query.query;

		bigHugeLabsAPI(query)
			.catch(function(error) {
				handleError(error, 'Error in server.js API response from bigHugeLabsAPI: ');
			})
			.then(function(response) {
				if (typeof response !== 'undefined') {
					var synonyms = parseApiResponse(response);

					res.json(synonyms);
				}
			});
	}

	app.use(express.static('dist'));
	app.use(express.static('src/static'));

	app.get('/get-gifs', returnGifData);
	app.get('/get-synonyms', returnSynonymData);
	app.get('/*', redirect);

	app.listen(PORT, function() {
		// eslint-disable-next-line no-console
		console.log('Listening on port', PORT);
	});

})();

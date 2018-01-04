(function() {
	'use strict';

	var express = require('express');

	var bigHugeLabsAPI = require('./helpers/big-huge-labs-api.js');
	var giphyAPI = require('./helpers/giphy-api.js');
	var handleError = require('./helpers/handle-api-error');
	var parseApiResponse = require('./helpers/parse-api-response.js');

	var PORT = process.env.PORT || 8080;
	var QUERY_LIMIT = 40;

	var app = express();

	function render(req, res) {
		var search = req.params.search || null;
		var synonyms = null;

		function renderPage() {
			giphyAPI(search, QUERY_LIMIT)
				.catch(handleError)
				.then(function(response) {
					res.render('index.ejs', {
						gifs: parseApiResponse(response),
						search: search,
						synonyms: synonyms
					});
				});
		}

		if (search) {
			search = search.replace(/\+/g, ' ');

			bigHugeLabsAPI(search)
				.catch(handleError)
				.then(function(response) {
					synonyms = parseApiResponse(response);

					renderPage();
				});
		} else {
			renderPage();
		}
	}

	function returnApiData(req, res) {
		var limit = req.query.limit;
		var offset = req.query.offset;
		var query = req.query.query;

		giphyAPI(query, limit, offset)
			.catch(handleError)
			.then(function(response) {
				var json = parseApiResponse(response);

				res.json(json);
			});
	}

	app.use(express.static('public'));

	app.get('/', render);
	app.get('/get', returnApiData);
	app.get('/search/:search', render);
	app.get('/*', function(req, res) {
	  res.status(404).render('404.ejs');
	});

	app.listen(PORT, function() {
		console.log('Listening on port', PORT);
	});

})();

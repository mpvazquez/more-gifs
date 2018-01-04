(function() {
	'use strict';

	var express = require('express');
	var request = require('request-promise');

	var BIG_HUGE_LABS_THESAURUS_API_KEY = process.env.BIG_HUGE_LABS_THESAURUS_API_KEY;
	var GIPHY_API_KEY = process.env.GIPHY_API_KEY;
	var PORT = process.env.PORT || 8080;
	var QUERY_LIMIT = 40;

	var app = express();

	function getGifs(search, limit, offset) {
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

	function getSynonyms(search) {
		var format = 'json';
		var url = 'http://words.bighugelabs.com/api/2/';

		url += BIG_HUGE_LABS_THESAURUS_API_KEY + '/' + search + '/' + format;

		return request(url, handleResponse);
	}

	function handleError(error) {
		console.error(error);
	}

	function handleResponse(error, response, body) {
		if (error) {
			handleError(error);
		}
		return response;
	}

	function parseApiResponse(response) {
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

	function render(req, res) {
		var search = req.params.search || null;
		var synonyms = null;

		function renderPage() {
			getGifs(search, QUERY_LIMIT)
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

			getSynonyms(search)
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

		getGifs(query, limit, offset)
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

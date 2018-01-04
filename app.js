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

		return request(url, handleRequest);
	}

	function getSynonyms(search) {
		var format = 'json';
		var url = 'http://words.bighugelabs.com/api/2/';

		url += BIG_HUGE_LABS_THESAURUS_API_KEY + '/' + search + '/' + format;

		return request(url, handleRequest);
	}

	function handleError(error) {
		console.error(error);
	}

	function handleRequest(error, response, body) {
		if (error) {
			handleError(error);
		}
		return response;
	}

	function parseGifJSON(data) {
		var gifs = [];
		var json = JSON.parse(data);

		for (var i = 0; i < json.data.length; i++) {
			gifs.push({
				image: json.data[i].images.fixed_width.url,
				title: json.data[i].title,
				url: json.data[i].url
			});
		}

		return gifs;
	}

	function parseSynonyms(data) {
		var synonyms = [];

		try {
			var apiData = JSON.parse(data);

			for (var key in apiData) {
				var synonymsList = apiData[key].syn;
				synonyms = synonyms.concat(synonymsList);
			}
		} catch (error) {
			handleError(error);
		}

		return synonyms;
	}

	function renderPage(req, res) {
		var search = req.params.search || null;
		var synonyms = null;

		function renderGifs() {
			getGifs(search, QUERY_LIMIT)
				.catch(handleError)
				.then(function(data) {
					res.render('index.ejs', {
						gifs: parseGifJSON(data),
						search: search,
						synonyms: synonyms
					});
				});
		}

		if (search) {
			search = search.replace(/\+/g, ' ');

			getSynonyms(search)
				.catch(handleError)
				.then(function(data) {
					synonyms = parseSynonyms(data);

					renderGifs();
				});
		} else {
			renderGifs();
		}
	}

	app.use(express.static('public'));

	app.get('/', renderPage);

	app.get('/search/:search', renderPage);

	app.get('/more', function(req, res) {
		var offset = req.query.offset;
		var query = req.query.query;

		getGifs(query, QUERY_LIMIT, offset)
			.catch(handleError)
			.then(function(data) {
				res.json(parseGifJSON(data));
			});
	});

	app.get('/*', function(req, res) {
	  res.status(404).render('404.ejs');
	});

	app.listen(PORT, function() {
		console.log('Listening on port', PORT);
	});

})();

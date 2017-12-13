(function() {
	'use strict';

	var express = require('express');
	var request = require('request-promise');

	var CONFIG = require('./config.json');

	var app = express();

	function getGifs(search, limit) {
		var apiKey = 'api_key=' + CONFIG.GIPHY_API_KEY;
		var apiLimit = '';
		var query = '';
		var url = 'http://api.giphy.com/v1/gifs';

		if (limit) {
			apiLimit = '&limit=' + limit;
		}

		if (search) {
			url += '/search?';
			query = '&q=' + search;
		} else {
			url += '/trending?';
		}

		url += (apiKey + apiLimit + query);

		return request(url, function(error, response, body) {
			return response;
		});
	}

	function getSynonyms(search) {
		var apiKey = CONFIG.BIG_HUGE_LABS_THESAURUS_API_KEY;
		var format = 'json';
		var url = 'http://words.bighugelabs.com/api/2/';

		url += apiKey + '/' + search + '/' + format;

		return request(url, function(error, response, body) {
			return response;
		});
	}

	function parseSynonyms(data) {
		var apiData = '';
		var synonyms = [];

		try {
			apiData = JSON.parse(data);
		} catch (error) {
			console.error(error);
			return synonyms;
		}

		for (var key in apiData) {
			var synonymsList = apiData[key].syn;
			synonyms = synonyms.concat(synonymsList);
		}

		return synonyms;
	}

	function renderPage(req, res) {
		var gifUrls = [];
		var limit = 20;
		var search = req.params.search || null;
		var synonyms = null;

		function renderGifs(data) {
			var apiData = JSON.parse(data);

			for(var i = 0; i < apiData.data.length; i++) {
				gifUrls.push(apiData.data[i].images.fixed_width.url);
			}

			res.render('index.ejs', {
				gifUrls: gifUrls,
				search: search,
				synonyms: synonyms
			});
		}

		if (search) {
			search = search.replace(/\+/g, ' ');

			getSynonyms(search)
				.catch(function(error) {
					console.error('getSynonyms Error: ', error);
				})
				.then(function(data) {
					synonyms = parseSynonyms(data);

					getGifs(search, limit)
						.catch(function(error) {
							console.error('getGifs Error: ', error);
						})
						.then(renderGifs);
				});
		} else {
			getGifs(search, limit)
				.catch(function(error) {
					console.error('getGifs Error: ', error);
				})
				.then(renderGifs);
		}
	}

	app.get('/', renderPage);

	app.get('/search/:search', renderPage);

	app.use(express.static('public'));

	app.listen(8080, function() {
		console.log('Listening on port 8080');
	});
})();

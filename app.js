(function() {
	'use strict';

	var express = require('express');
	var request = require('request-promise');

	var app = express();

	var PORT = process.env.PORT || 8080;

	function handleError(error) {
		console.error(error);
	}

	function getGifs(search, limit, offset) {
		var apiKey = 'api_key=' + process.env.GIPHY_API_KEY;
		var apiLimit = '';
		var offset = '';
		var query = '';
		var url = 'http://api.giphy.com/v1/gifs';

		if (limit) {
			apiLimit = '&limit=' + limit;
		}

		if (offset) {
			offset = '&offset=' + offset;
		}

		if (search) {
			url += '/search?';
			query = '&q=' + search;
		} else {
			url += '/trending?';
		}

		url += (apiKey + apiLimit + offset + query);

		return request(url, function(error, response, body) {
			if (error) {
				handleError(error);
			}
			return response;
		});
	}

	function getSynonyms(search) {
		var apiKey = process.env.BIG_HUGE_LABS_THESAURUS_API_KEY;
		var format = 'json';
		var url = 'http://words.bighugelabs.com/api/2/';

		url += apiKey + '/' + search + '/' + format;

		return request(url, function(error, response, body) {
			if (error) {
				handleError(error);
			}
			return response;
		});
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
		var gifUrls = [];
		var limit = 20;
		var offset = 0;
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
				.catch(handleError)
				.then(function(data) {
					synonyms = parseSynonyms(data);

					getGifs(search, limit)
						.catch(handleError)
						.then(renderGifs);
				});
		} else {
			getGifs(search, limit)
				.catch(handleError)
				.then(renderGifs);
		}
	}

	app.use(express.static('public'));

	app.get('/', renderPage);

	app.get('/search/:search', renderPage);

	app.get('/*', function(req, res){
	  res.status(404).render('404.ejs');
	});

	app.listen(PORT, function() {
		console.log('Listening on port ', PORT);
	});
})();

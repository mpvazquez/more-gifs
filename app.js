(function() {
	'use strict';

	var express = require('express');
	var request = require('request-promise');
	var app = express();

	function getGifs(search, limit) {
		var apiKey = '?api_key=HqkDGuF6K54Z8AWPfZZ7TVZqR5KBvTEo';
		var apiLimit = '';
		var query = '';
		var url = 'http://api.giphy.com/v1/gifs';

		// default giphy limit for response items is 25
		if (limit && limit !== 25) {
			apiLimit = '&limit=' + limit;
		}

		if (search) {
			url += '/search';
			query = '&q=' + search;
		} else {
			url += '/trending';
		}

		url += (apiKey + apiLimit + query);

		return request(url, function(error, response, body) {
			return response;
		});
	}

	function makeSearch(event) {

	}

	app.get('/', function (req, res) {
		var gifUrls = [];

		getGifs(null, 20).then(function(apiResponse) {
			var data = JSON.parse(apiResponse);

			for(var i = 0; i < data.data.length; i++) {
				gifUrls.push(data.data[i].images.fixed_width.url);
			}

			res.locals = {
				gifUrls: gifUrls,
				onClick: makeSearch
			}
			res.render('index.ejs');
		});
	});

	app.get('/search/:search', function(req, res) {
		var gifUrls = [];
		var search = req.params.search;

		getGifs(search, 20).then(function(apiResponse) {
			var data = JSON.parse(apiResponse);

			for(var i = 0; i < data.data.length; i++) {
				gifUrls.push(data.data[i].images.fixed_width.url);
			}

			res.locals = {
				gifUrls: gifUrls,
				onClick: makeSearch
			}
			res.render('index.ejs');
		});
	});

	app.listen(8080, function() {
		console.log('Listening on port 8080');
	});

})();	
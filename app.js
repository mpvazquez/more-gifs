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

		// default api.giphy.com limit for response items is 25
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

	function handleRender(req, res) {
		var search = req.params.search;
		var gifUrls = [];

		getGifs(search, 20).then(function(data) {
			var apiData = JSON.parse(data);

			for(var i = 0; i < apiData.data.length; i++) {
				gifUrls.push(apiData.data[i].images.fixed_width.url);
			}

			res.render('index.ejs', {
				gifUrls: gifUrls
			});
		});
	}

	app.get('/', handleRender);

	app.get('/search/:search', handleRender);

	app.use(express.static('public'));

	app.listen(8080, function() {
		console.log('Listening on port 8080');
	});

})();	
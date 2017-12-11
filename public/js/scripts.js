(function() {
	'use strict';

	function initilizeEventListeners() {
		var currentSearch = document.location.pathname ?
			document.location.pathname.split('/')[2] :
			undefined;

		var searchButton = document.getElementById('search-button');
		var searchButtonExpand = document.getElementById('search-button-expand');
		var searchInput = document.getElementById('search-input');

		function search(type) {
			console.log('here');
			var searchValue = searchInput.value || currentSearch;
			if (searchValue) {
				document.location = '/' + type + '/' + searchValue;
			}
		}

		searchButton.addEventListener('click', function() {
			search('search');
		});

		searchButtonExpand.addEventListener('click', function() {
			search('expand');
		});

		searchInput.addEventListener('keydown', function(event) {
			// update router if 'enter' or 'return ' button is typed
			if (event.keyCode === 13) {
				search('search');
			}
		});
	}

	document.addEventListener("DOMContentLoaded", initilizeEventListeners);
})();

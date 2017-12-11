(function() {
	'use strict';

	function setEventListeners() {
		var searchInput = document.getElementById('search-input');
		var searchButton = document.getElementById('search-button');
		var searchButtonExpand = document.getElementById('search-button-expand')

		searchButton.addEventListener('click', function() {
			if (searchInput.value) {
				document.location = '/search/' + searchInput.value;
			}
		});

		searchButtonExpand.addEventListener('click', function() {
			if (searchInput.value) {
				document.location = '/expand/' + searchInput.value;
			}
		});

		searchInput.addEventListener('keydown', function(event) {
			// update router if 'enter' or 'return ' button is typed
			if (event.keyCode === 13) {
				document.location = '/search/' + searchInput.value;
			}
		});
	}

	document.addEventListener("DOMContentLoaded", setEventListeners);
})();

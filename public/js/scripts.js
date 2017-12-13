(function() {
	'use strict';

	function setEventListeners(pathQuery) {
		var currentSearch = document.location.pathname ? pathQuery : undefined;

		var searchButton = document.getElementById('search-button');
		var searchInput = document.getElementById('search-input');

		function search() {
			var searchValue = searchInput.value || currentSearch;

			if (searchValue) {
				document.location = searchValue.replace(/ /g, '+');
			}
		}

		searchButton.addEventListener('click', search);

		searchInput.addEventListener('keydown', function(event) {
			// update router if 'enter' or 'return ' button is typed
			if (event.keyCode === 13) {
				search();
			}
		});
	}

	function setLocalStorage(pathQuery) {
		if (typeof Storage !== undefined) {
			var pastSearches = JSON.parse(sessionStorage.getItem('pastSearches'));

			if (!pathQuery) {
		    sessionStorage.setItem('pastSearches', '[]');
			} else {
				pastSearches.push(pathQuery);
				sessionStorage.setItem('pastSearches', JSON.stringify(pastSearches));
			}
		} else {
	    console.error('Sorry, local web storage storage is not supported on your browser!');
		}
	}

	document.addEventListener("DOMContentLoaded", function() {
		var pathQuery = document.location.pathname.split('/')[1];

		setEventListeners(pathQuery);
		setLocalStorage(pathQuery);
	});
})();

(function() {
	'use strict';

	function initilizeEventListeners() {
		var currentSearch = document.location.pathname ?
			document.location.pathname.split('/')[2] :
			undefined;

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

	document.addEventListener("DOMContentLoaded", initilizeEventListeners);
})();

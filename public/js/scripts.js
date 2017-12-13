(function() {
	'use strict';

	function setEventListeners() {
		var currentSearch = document.location.pathname ?
			document.location.pathname.split('/')[2] :
			undefined;

		var searchButton = document.getElementById('search-button');
		var searchInput = document.getElementById('search-input');

		function search() {
			var searchValue = searchInput.value || currentSearch;

			if (searchValue) {
				document.location = '/search/' + searchValue.replace(/ /g, '+');
			}
		}

		searchButton.addEventListener('click', search);

		searchInput.addEventListener('keydown', function(event) {
			var enterKeyCode = event.keyCode === 13;

			if (enterKeyCode) {
				search();
			}
		});
	}

	document.addEventListener("DOMContentLoaded", setEventListeners);
})();

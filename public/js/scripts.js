(function() {
	'use strict';

	function renderSearchHistory(searchHistory) {
		var element = document.getElementById('search-history');

		if (element) {
			searchHistory.forEach(function(searchItem) {
				var aTag = document.createElement('a');
				aTag.textContent = searchItem;
				aTag.setAttribute('href', '/search/' + searchItem.replace(/ /g, '+'));
				element.appendChild(aTag)
				element.appendChild(document.createTextNode(' '));
			});
		}
	}

	function setEventListeners(searchPath) {
		var currentSearch = document.location.pathname ? searchPath : undefined;

		var searchButton = document.getElementById('search-button');
		var searchInput = document.getElementById('search-input');

		function searchEvent() {
			var searchValue = searchInput.value || currentSearch;

			if (searchValue) {
				document.location = '/search/' + searchValue.replace(/ /g, '+');
			}
		}

		searchButton.addEventListener('click', searchEvent);

		searchInput.addEventListener('keydown', function(event) {
			var enterKeyCode = event.keyCode === 13;

			if (enterKeyCode) {
				searchEvent();
			}
		});
	}

	function setLocalStorage(searchHistory, searchPath) {
		if (searchPath) {
			searchPath = searchPath.replace(/\+/g, ' ');
			if (searchHistory.indexOf(searchPath) === -1) {
				searchHistory.push(searchPath);
				sessionStorage.setItem('searchHistory', JSON.stringify(searchHistory));
			}
		} else {
	    sessionStorage.setItem('searchHistory', '[]');
		}
	}

	document.addEventListener("DOMContentLoaded", function() {
		var searchPath = document.location.pathname.split('/')[2];

		setEventListeners(searchPath);

		if (typeof Storage !== undefined) {
			var searchHistory = JSON.parse(sessionStorage.getItem('searchHistory')) || [];

			setLocalStorage(searchHistory, searchPath);
			renderSearchHistory(searchHistory);
		} else {
			console.error('Sorry, local web storage storage is not supported on your browser!');
		}
	});
})();

(function() {
	'use strict';

	function renderSearchHistory(searchHistory) {
		var historyContainer = document.getElementById('search-history-container');

		if (historyContainer) {
			searchHistory.forEach(function(searchItem) {
				var aTag = document.createElement('a');
				var button = document.createElement('button');
				
				button.textContent = searchItem;
				aTag.setAttribute('href', '/search/' + searchItem.replace(/ /g, '+'));
				aTag.setAttribute('class', 'search-tag');
				aTag.appendChild(button);

				historyContainer.appendChild(aTag);
				historyContainer.appendChild(document.createTextNode(' '));
			});
		}
	}

	function setEventListeners(searchPath) {
		var searchButton = document.getElementById('search-button');
		var searchInput = document.getElementById('search-input');

		window.addEventListener('load', function() {
			var gridElement = document.querySelector('.grid');

			var masonry = new Masonry(gridElement, {
				columnWidth: 250,
				fitWidth: true,
				gutter: 2,
				itemSelector: '.grid-item'
			});
		});

		function searchEvent() {
			var searchValue = searchInput.value || searchPath;

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
			document.getElementById('search-history').remove();

			console.error('Sorry, local web storage storage is not supported on your browser!');
		}
	});

})();

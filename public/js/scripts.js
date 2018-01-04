(function() {
	'use strict';

	function renderSearchHistory(searchHistory) {
		var historyContainer = document.getElementById('search-history-container');

		if (historyContainer) {
			searchHistory.forEach(function(searchItem) {
				var anchor = document.createElement('a');
				var button = document.createElement('button');
				var icon = document.createElement('i');
				var space = document.createTextNode(' ');
				var span = document.createElement('span');

				icon.setAttribute('class', 'em em-pencil2');
				span.textContent = ' ' + searchItem;

				button.appendChild(icon);
				button.appendChild(span);

				anchor.setAttribute('href', '/search/' + searchItem.replace(/ /g, '+'));
				anchor.setAttribute('class', 'search-tag');
				anchor.appendChild(button);

				historyContainer.appendChild(anchor);
				historyContainer.appendChild(space);
			});
		}
	}

	function setEventListeners(searchPath) {
		var searchButton = document.getElementById('search-button');
		var searchInput = document.getElementById('search-input');

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

		window.addEventListener('load', function() {
			var gridElement = document.querySelector('.grid');

			var masonry = new Masonry(gridElement, {
				columnWidth: 250,
				fitWidth: true,
				gutter: 2,
				itemSelector: '.grid-item'
			});
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

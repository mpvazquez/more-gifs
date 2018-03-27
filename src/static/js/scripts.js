(function() {
	'use strict';

	var searchPath = null;

	function renderSearchHistory(searchHistory) {
		var historyContainer = document.getElementById('search-history-container');

		if (historyContainer) {
			searchHistory.forEach(function(searchItem) {
				var anchor = document.createElement('a');
				var button = document.createElement('button');
				var icon = document.createElement('i');
				var span = document.createElement('span');

				icon.setAttribute('class', 'em em-pencil2');
				span.textContent = ' ' + searchItem;

				button.classList.add('search-tag');
				button.appendChild(icon);
				button.appendChild(span);

				anchor.setAttribute('href', '/search/' + searchItem.replace(/ /g, '+'));
				anchor.appendChild(button);

				historyContainer.appendChild(anchor);
				historyContainer.appendChild(document.createTextNode(' '));
			});
		}
	}

	function setLocalStorage(searchHistory) {
		if (searchPath) {
			var search = searchPath.replace(/\+/g, ' ');
			if (searchHistory.indexOf(search) === -1) {
				searchHistory.push(search);
				sessionStorage.setItem('searchHistory', JSON.stringify(searchHistory));
			}
		} else {
		    sessionStorage.setItem('searchHistory', '[]');
		}
	}

	document.addEventListener("DOMContentLoaded", function() {
		searchPath = document.location.pathname.split('/')[2];

		if (searchPath) {
			document.getElementById('search-input').placeholder = searchPath.replace(/\+/g, ' ').toUpperCase();
		}

		if (typeof Storage !== undefined) {
			var searchHistory = JSON.parse(sessionStorage.getItem('searchHistory')) || [];

			setLocalStorage(searchHistory);
			renderSearchHistory(searchHistory);
		} else {
			document.getElementById('search-history').remove();

			console.error('Sorry, local web storage is not supported on your browser!');
		}
	});

})();

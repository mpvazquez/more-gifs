(function() {
	'use strict';

	var masonry;
	var offset = 0;
	var searchPath = null;

	var API_LIMIT = 25;

	function initMasonry() {
		var gridElement = document.querySelector('.grid');

		masonry = new Masonry(gridElement, {
			fitWidth: true,
			gutter: 2,
			itemSelector: '.grid-item'
		});
	}

	function loadMoreGifs(event) {
		event.preventDefault();

		offset += API_LIMIT;

		var xhr = new XMLHttpRequest();
		var url = '/get?offset=' + offset + '&limit=' + API_LIMIT;

		if (searchPath) {
			url += '&query=' + searchPath;
		}

		xhr.open('GET', url, true);
		xhr.responseType = 'text';
		xhr.onreadystatechange = function() {
			if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
				renderMoreGifs(xhr.responseText);
			}
		}
		xhr.send();
	}

	function renderMoreGifs(data) {
		try {
			var json = JSON.parse(data);
			var gridContainer = document.querySelector('.grid');

			json.forEach(function(gif) {
				var anchor = document.createElement('a');
				var img = document.createElement('img');

				anchor.setAttribute('href', gif.url);
				anchor.setAttribute('target', '_blank');

				img.classList.add('grid-item');
				img.setAttribute('alt', gif.title);
				img.setAttribute('src', gif.image);

				anchor.appendChild(img);

				gridContainer.appendChild(anchor);

				masonry.appended(img);

				img.onload = function() {
					masonry.layout();
				}
			});
		} catch (error) {
			console.error(error);
		}
	}

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

	function setEventListeners() {
		var loadMoreButton = document.getElementById('load-more-button');
		var searchButton = document.getElementById('search-button');
		var searchInput = document.getElementById('search-input');

		function newSearch() {
			var searchValue = searchInput.value || searchPath;

			if (searchValue) {
				document.location = '/search/' + searchValue.replace(/ /g, '+');
			}
		}

		loadMoreButton.addEventListener('click', loadMoreGifs);

		searchButton.addEventListener('click', newSearch);

		searchInput.addEventListener('keydown', function(event) {
			var enterKeyCode = event.keyCode === 13;

			if (enterKeyCode) {
				newSearch();
			}
		});

		window.addEventListener('load', initMasonry);
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

		setEventListeners();

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

import React from 'react';

const SearchInput = () => {
  return (
    <section id="search-input-container">
			<span>STEP 1: <i className="em em-point_right"></i>&nbsp; </span>
			<input id="search-input" type="text" placeholder="Enter GIF Keyword.." />
			<button id="search-button" value="Go">
				<span>GO<i className="em em-mag_right"></i></span>
			</button>
		</section>
  );
}

export default SearchInput;

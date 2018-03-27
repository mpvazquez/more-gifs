import React from 'react';
import PropTypes from 'prop-types';

import SearchHistoryList from '../SearchHistoryList/SearchHistoryList';

const SearchSynonymList = ({ synonyms }) => {
  if (!synonyms.length) return null;

  return (
    <section id="search-keywords-container">
      <div id="related-terms">
    		<p>STEP 2: <i class="em em-point_down"></i>&nbsp; Explore Related Search Terms</p>
    		<div class="tag-container" id="search-synonyms">
          {
            synonyms.map(synonym => {
              if (!synonym) return null;

              return (
                <a href={`/search/${ synonym.replace(/ /g, '+') }`}>
      						<button class="search-tag"><i class="em em-link"></i> { synonym }</button>
      					</a>
              );
            })
          }
    		</div>
    	</div>

    	<SearchHistoryList />
    </section>
  );
}
SearchSynonymList.propTypes = {
  synonyms: PropTypes.array
}

export default SearchSynonymList;

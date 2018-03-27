import React from 'react';
import PropTypes from 'prop-types';

import SearchHistoryList from '../SearchHistoryList/SearchHistoryList';

import styles from './SearchSynonymList.pcss';

const SearchSynonymList = ({ history, synonyms }) => {
  if (!synonyms.length) return null;

  return (
    <section className={styles.searchSynonymContainer}>
      <div id="related-terms">
    		<p>STEP 2: <i className="em em-point_down"></i>&nbsp; Explore Related Search Terms</p>
    		<div className="tag-container" id="search-synonyms">
          {
            synonyms.map(synonym => {
              if (!synonym) return null;

              return (
                <a href={`/search/${ synonym.replace(/ /g, '+') }`}>
      						<button className="search-tag"><i className="em em-link"></i> { synonym }</button>
      					</a>
              );
            })
          }
    		</div>
    	</div>

    	<SearchHistoryList history={history} />
    </section>
  );
}
SearchSynonymList.propTypes = {
  history: PropTypes.array.isRequired,
  synonyms: PropTypes.array.isRequired
}

export default SearchSynonymList;

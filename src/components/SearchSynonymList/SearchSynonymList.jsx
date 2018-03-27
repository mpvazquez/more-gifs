import React from 'react';
import PropTypes from 'prop-types';

import SearchHistoryList from '../SearchHistoryList/SearchHistoryList';

import styles from './SearchSynonymList.pcss';

const SearchSynonymList = ({ synonyms, onClickTag }) => {
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
                <button className="search-tag"
                  data-search={synonym}
                  onClick={onClickTag}
                >
                  <i className="em em-link"></i> { synonym }
                </button>
              );
            })
          }
    		</div>
    	</div>
    </section>
  );
}
SearchSynonymList.propTypes = {
  synonyms: PropTypes.array.isRequired,
  onClickTag: PropTypes.func.isRequired
}

export default SearchSynonymList;

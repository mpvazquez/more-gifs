import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/Icon/Icon';
import SearchTagList from 'components/SearchTagList/SearchTagList';

import styles from './SearchSynonyms.pcss';

const SearchSynonyms = ({ synonyms, onClickTag }) => {
  if (!synonyms.length) return null;

  return (
    <div className={styles.searchSynonymsContainer}>
  		<p>
        <span className={styles.searchSynonymsTitle}>STEP 2: </span>
        <Icon className="em-point_down" />
        <span> Explore Related Search Terms</span>
      </p>

  		<SearchTagList icon="em-link"
        onClickTag={onClickTag}
        tagList={synonyms}
      />
    </div>
  );
}
SearchSynonyms.propTypes = {
  synonyms: PropTypes.array.isRequired,
  onClickTag: PropTypes.func.isRequired
}

export default SearchSynonyms;

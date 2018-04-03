import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/Icon/Icon';
import SearchTagList from 'components/SearchTagList/SearchTagList';

import styles from './SearchHistory.pcss';

const SearchHistory = ({ history, onClickTag }) => {
  if (!history.length) return null;

  return (
    <div className={styles.searchHistoryContainer}>
      <p>
        <Icon className="em-clipboard" />
        <span> Search History</span>
      </p>

      <SearchTagList icon="em-pencil2"
        onClickTag={onClickTag}
        tagList={history}
      />
    </div>
  );
}
SearchHistory.propTypes = {
  history: PropTypes.array.isRequired,
  onClickTag: PropTypes.func.isRequired
}

export default SearchHistory;

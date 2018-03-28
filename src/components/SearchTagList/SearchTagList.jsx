import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './SearchTagList.pcss';

const SearchTagList = ({ icon, onClickTag, tagList }) => {
  const iconClassname = classnames('em', icon);
  return (
    <div className={styles.SearchTagListContainer}>
      {
        tagList.map(tag => {
          if (!tag) return null;

          return (
            <button className={styles.searchTag}
              data-search={tag}
              onClick={onClickTag}
            >
              <i className={iconClassname}></i> { tag }
            </button>
          );
        })
      }
    </div>
  );
}
SearchTagList.propTypes = {
  icon: PropTypes.string.isRequired,
  onClickTag: PropTypes.func.isRequired,
  tagList: PropTypes.array.isRequired
}

export default SearchTagList;

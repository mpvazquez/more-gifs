import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button/Button';

import styles from './SearchTagList.pcss';

const SearchTagList = ({ icon, onClickTag, tagList }) => {
  return (
    <div className={ styles.SearchTagListContainer }>
      {
        tagList.map(tag => {
          if (!tag) return null;

          return (
            <Button className={ styles.searchTag }
              icon={ icon }
              iconPosition="left"
              label={ tag }
              onClick={ onClickTag }
            />
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

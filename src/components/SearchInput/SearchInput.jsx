import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button/Button';

import styles from './SearchInput.pcss';

const SearchInput = ({ onSubmitSearch, search }) => {
  let searchInput = null;

  const placeholder = search.toLowerCase() || 'Enter GIF Keyword..';

  const submitSearch = event => {
    event.preventDefault();

    onSubmitSearch(searchInput.value);

    searchInput.value = '';
  }

  const onKeyDown = event => {
    const enterKeyCode = event.keyCode === 13;

    if (enterKeyCode) {
      submitSearch(event);
    }
  }

  const setInputRef = node => {
    searchInput = node
  }

  return (
    <section className={styles.searchInputContainer}>
			<span>STEP 1: <i className="em em-point_right"></i>&nbsp; </span>
			<input className={styles.searchInput}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        ref={setInputRef}
        type="text"
      />
      &nbsp;
      <Button onClick={submitSearch}
        icon="em-mag_right"
        iconPosition="right"
        label="GO"
      />
		</section>
  );
}
SearchInput.propTypes = {
  onSubmitSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired
}

export default SearchInput;

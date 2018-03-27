import React from 'react';
import PropTypes from 'prop-types';

import styles from './SearchInput.pcss';

const SearchInput = ({ onSubmitSearch, search }) => {
  let searchInput = null;

  const placeholder = search || 'Enter GIF Keyword..';

  const onClick = event => {
    event.preventDefault();
    onSubmitSearch(searchInput.value);
    clearInputValue();
  }

  const onKeyDown = event => {
    const enterKeyCode = event.keyCode === 13;

    if (enterKeyCode) {
      event.preventDefault();

      onSubmitSearch(searchInput.value);
      clearInputValue();
    }
  }

  const clearInputValue = () => {
    searchInput.value = '';
  }

  const setRef = node => {
    searchInput = node
  }

  return (
    <section className={styles.searchInputContainer}>
			<span>STEP 1: <i className="em em-point_right"></i>&nbsp; </span>
			<input className={styles.searchInput}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        ref={setRef}
        type="text"
      />
      &nbsp;
			<button id="search-button"
        onClick={onClick}
        value="Go"
      >
				<span>GO<i className="em em-mag_right"></i></span>
			</button>
		</section>
  );
}
SearchInput.propTypes = {
  onSubmitSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired
}

export default SearchInput;

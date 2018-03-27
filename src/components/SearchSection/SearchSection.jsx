import React from 'react';
import PropTypes from 'prop-types';

import SearchInput from '../SearchInput/SearchInput';
import SearchSynonymList from '../SearchSynonymList/SearchSynonymList';

const SearchSection = ({ history, onSubmitSearch, search, synonyms }) => {
  return (
    <div>
      <SearchInput onSubmitSearch={onSubmitSearch}
        search={search}
      />
      <SearchSynonymList history={history} synonyms={synonyms} />
    </div>
  );
}
SearchSection.propTypes = {
  history: PropTypes.array.isRequired,
  onSubmitSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  synonyms: PropTypes.array
}


export default SearchSection;

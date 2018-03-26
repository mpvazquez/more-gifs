import React from 'react';
import PropTypes from 'prop-types';

import SearchInput from '../SearchInput/SearchInput';
import SearchSynonymList from '../SearchSynonymList/SearchSynonymList';

const SearchSection = ({ synonyms }) => {
  return (
    <div>
      <SearchInput />
      <SearchSynonymList synonyms={synonyms} />
    </div>
  );
}
SearchSection.propTypes = {
  synonyms: PropTypes.array
}


export default SearchSection;

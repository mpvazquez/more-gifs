import React from 'react';
import PropTypes from 'prop-types';

const SearchHistoryList = ({ history, onClickTag }) => {
  if (!history.length) return null;

  return (
    <div id="search-history">
      <p><i className="em em-clipboard"></i> Search History</p>
      <div className="tag-container" id="search-history-container">
        {
          history.map(historyItem => {
            return (
              <a href="#">
                <button className="search-tag"
                  data-search={historyItem}
                  onClick={onClickTag}
                >
                  <i className="em em-pencil2" /> {historyItem}
                </button>
              </a>
            )
          })
        }
      </div>
    </div>
  );
}
SearchHistoryList.propTypes = {
  history: PropTypes.array.isRequired,
  onClickTag: PropTypes.func.isRequired
}

export default SearchHistoryList;

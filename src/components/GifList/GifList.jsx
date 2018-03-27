import React from 'react';
import PropTypes from 'prop-types';

import GifItem from '../GifItem/GifItem';

const GifList = ({ gifs }) => {
  return (
    <div className="grid">
      {
        gifs.map(
          gif => <GifItem gif={gif} />
        )
      }
    </div>
  );
}
GifList.propTypes = {
  gifs: PropTypes.array.isRequired
}

export default GifList;

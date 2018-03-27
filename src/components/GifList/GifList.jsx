import React from 'react';
import PropTypes from 'prop-types';

import GifItem from '../GifItem/GifItem';

const GifList = ({ gifs }) => {
  return (
    <div className="gifListContainer">
      <div className="grid">
        {
          gifs.map(
            gif => <GifItem gif={gif} />
          )
        }
      </div>

      <button id="load-more-button">
				<span>MORE<i class="em em-mag_right"></i></span>
			</button>
    </div>
  );
}
GifList.propTypes = {
  gifs: PropTypes.array.isRequired
}

export default GifList;

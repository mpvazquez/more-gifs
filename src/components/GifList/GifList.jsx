import React from 'react';
import PropTypes from 'prop-types';

const GifList = ({ gifs }) => {
  return (
    <div>
      {
        gifs.map(gif => {
          return <h2>{gif.title}</h2>
        })
      }
    </div>
  );
}
GifList.propTypes = {
  gifs: PropTypes.array.isRequired
}

export default GifList;

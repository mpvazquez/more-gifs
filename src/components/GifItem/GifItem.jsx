import React from 'react';
import PropTypes from 'prop-types';

const GifItem = ({ gif }) => {
  return (
    <a href={ gif.url } target="_blank">
  		<img alt={ gif.title } className="grid-item" src={ gif.image } />
  	</a>
  );
}
GifItem.propTypes = {
  gif: PropTypes.object.isRequired
}

export default GifItem;

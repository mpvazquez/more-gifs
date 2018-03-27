import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import GifItem from '../GifItem/GifItem';

import styles from './GifList.pcss';

const GifList = ({ gifs }) => {
  const gifListClassname = classnames('grid', [styles.gifListContainer]);

  return (
    <div className={gifListClassname}>
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

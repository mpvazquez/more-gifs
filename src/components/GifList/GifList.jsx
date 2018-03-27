import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import GifItem from '../GifItem/GifItem';

import styles from './GifList.pcss';

const GifList = ({ gifs }) => {
  const gifListClassname = classnames('grid', {
    [styles.gifList]: true
  });

  return (
    <div className={styles.gifListContainer}>
      <div className={gifListClassname}>
        {
          gifs.map(
            gif => <GifItem gif={gif} />
          )
        }
      </div>

      <button id="load-more-button">
				<span>MORE<i className="em em-mag_right"></i></span>
			</button>
    </div>
  );
}
GifList.propTypes = {
  gifs: PropTypes.array.isRequired
}

export default GifList;

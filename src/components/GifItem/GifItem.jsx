import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './GifItem.pcss';

const GifItem = ({ gif }) => {
  const gifItemClassname = classnames('grid-item', {
    [styles.gifItem]: true
  });

  return (
    <a className={styles.gifItemContainer}
      href={ gif.url }
      target="_blank"
    >
  		<img alt={ gif.title }
        className={gifItemClassname}
        src={ gif.image }
      />
  	</a>
  );
}
GifItem.propTypes = {
  gif: PropTypes.object.isRequired
}

export default GifItem;

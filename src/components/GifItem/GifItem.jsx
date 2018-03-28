import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Masonry from 'masonry-layout';

import styles from './GifItem.pcss';

let masonry;

class GifItem extends React.Component {
  componentDidMount() {
    masonry = new Masonry('.grid', {
      fitWidth: true,
      gutter: 2,
      itemSelector: '.grid-item'
    });
  }

  render() {
    const gifItemClassname = classnames('grid-item', [styles.gifItem]);
    const { gif } = this.props;

    return (
      <a className={styles.gifItemContainer}
        href={gif.url}
        target="_blank"
      >
    		<img alt={gif.title}
          className={gifItemClassname}
          onLoad={this.updateMasonry}
          src={gif.image}
        />
    	</a>
    );
  }

  updateMasonry() {
    masonry.layout();
  }
}
GifItem.propTypes = {
  gif: PropTypes.object.isRequired
}

export default GifItem;

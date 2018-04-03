import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Icon.pcss';

const Icon = ({ className }) => {
  const iconClassname = classnames('em', className, [styles.icon]);

  return <i className={ iconClassname } />;
}
Icon.propTypes = {
  className: PropTypes.string.isRequired
}

export default Icon;

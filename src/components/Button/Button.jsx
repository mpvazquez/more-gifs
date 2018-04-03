import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Button.pcss';

const Button = ({ className, icon, iconPosition = 'right', label, onClick }) => {
  const buttonClassname = classnames(className, [styles.buttonContainer]);
  const iconClassname = classnames('em', icon, {
    [styles.left]: iconPosition === 'left'
  });

  return (
    <button className={ buttonClassname }
      data-prop={ label }
      onClick={ onClick }
    >
      <span>{ label }</span>
      <i className={ iconClassname } />
    </button>
  );
}
Button.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Button;

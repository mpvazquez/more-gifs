import React from 'react';
import classnames from 'classnames';

import Icon from 'components/Icon/Icon';

import styles from './Header.pcss';

const Header = () => {
  const iconClassname = classnames('em-mostly_sunny', [styles.headerIcon]);

  return (
    <header className={styles.headerContainer}>
			<a className={styles.headerLink}
        href="/"
      >
				<h1 className={styles.headerH1}>
					<Icon className={iconClassname} />
					<span> MORE GIFs</span>
				</h1>
				<h4 className={styles.headerH4}>
          Expand Your GIF Journey
        </h4>
			</a>
		</header>
  );
}

export default Header;

import React from 'react';

import Icon from 'components/Icon/Icon';

import styles from './Header.pcss';

const Header = () => {
  return (
    <header className={styles.headerContainer}>
			<a className={styles.headerLink}
        href="/"
      >
				<h1 className={styles.headerH1}>
					<Icon className="em-mostly_sunny" />
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

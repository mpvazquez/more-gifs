import React from 'react';

import styles from './Header.pcss';

const Header = () => {
  return (
    <header className={styles.headerContainer}>
			<a className={styles.headerLink}
        href="/"
      >
				<h1 className={styles.headerH1}>
					<i className="em em-mostly_sunny"></i>
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

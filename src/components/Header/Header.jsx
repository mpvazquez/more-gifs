import React from 'react';

import styles from './Header.pcss';

const Header = () => {
  return (
    <header className={styles.headerContainer}>
			<a href="/">
				<h1>
					<i className="em em-mostly_sunny"></i>
					<span> MORE GIFs</span>
				</h1>
				<h4><em>Expand Your GIF Journey</em></h4>
			</a>
		</header>
  );
}

export default Header;

import React from 'react';

import styles from './Footer.pcss';

const Footer = () => {
  const createdByText = 'This website was created by Marco Pretell-Vázquez';
  return (
    <footer className={styles.footerContainer}>
			<p>
        <a href="http://www.marcopvazquez.com/"
          target="_blank"
        >
          { createdByText }
        </a>
      </p>

			<a href="https://giphy.com/" target="_blank">
				<img alt="Powered By Giphy"
          id="giphy-logo-badge"
          src="/images/PoweredBy_200px-Black_HorizLogo.png"
        />
			</a>
		</footer>
  );
}

export default Footer;

import React from 'react';

import styles from './Footer.pcss';

const Footer = () => {
  const createdByText = (
    <span>
      This website was created by&nbsp;
      <br className={styles.footerTextBreak} />
      Marco Pretell-Vázquez
    </span>
  );

  return (
    <footer className={styles.footerContainer}>
      <a href="https://giphy.com/" target="_blank">
        <img alt="Powered By Giphy"
          src="/images/PoweredBy_200px-Black_HorizLogo.png"
        />
      </a>

			<p className={styles.footerText}>
        <a className={styles.footerTextLink}
          href="http://www.marcopvazquez.com/"
          target="_blank"
        >
          { createdByText }
        </a>
      </p>
		</footer>
  );
}

export default Footer;

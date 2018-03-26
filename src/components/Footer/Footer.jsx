import React from 'react';

const Footer = () => {
  const copy = 'This website was created by Marco Pretell-Vázquez';
  return (
    <footer>
			<p>
        <a href="http://www.marcopvazquez.com/"
          target="_blank"
        >
          { copy }
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

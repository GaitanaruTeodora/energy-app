import PropTypes from "prop-types";

function IconSignOut({ color, size }) {
  return (
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width={size} height={size} viewBox="796 674.586 200 200" enable-background="new 796 674.586 200 200" xmlSpace="preserve">
<g>
	<path d="M822.161,860.495c-14.426,0-26.161-11.734-26.161-26.16V714.837c0-14.426,11.735-26.16,26.161-26.16h65.199
		c5.502,0,9.979,4.478,9.979,9.979s-4.477,9.979-9.979,9.979h-65.199c-3.421,0-6.203,2.782-6.203,6.201v119.498
		c0,3.419,2.782,6.201,6.203,6.201h65.199c5.502,0,9.979,4.478,9.979,9.979s-4.477,9.979-9.979,9.979H822.161z"/>
	<path d="M931.654,838.936c-2.666,0-5.172-1.039-7.058-2.925c-1.885-1.883-2.923-4.389-2.923-7.055c0-2.665,1.038-5.171,2.923-7.056
		l37.333-37.335H846.265v-19.959H961.93l-37.333-37.335c-1.885-1.885-2.923-4.391-2.923-7.056c0-2.666,1.038-5.172,2.923-7.055
		c1.884-1.886,4.39-2.925,7.056-2.925c2.668,0,5.174,1.039,7.057,2.925l54.367,54.369c1.885,1.886,2.924,4.39,2.924,7.056
		s-1.039,5.17-2.924,7.056l-54.367,54.37C936.826,837.897,934.32,838.936,931.654,838.936z"/>
</g>
</svg>
    
  );
}

IconSignOut.defaultProps = {
  color: "dark",
  size: "16px",
};

IconSignOut.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
    "white",
  ]),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default IconSignOut;

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";

function IconCompara({ color, size }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 width={size} height={size} viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve">
<g>
	<path d="M27.5,16c0.6-0.6,0.6-1.5,0-2.1L16.1,2.4c-0.6-0.6-1.5-0.6-2.1,0L2.5,13.9c-0.6,0.6-0.6,1.5,0,2.1l2.1,2.1
		c0.6,0.6,1.5,0.6,2.1,0l3.6-3.6c0.6-0.6,1.7-0.2,1.7,0.7v21.2c0,0.8,0.7,1.5,1.5,1.5h3c0.8,0,1.5-0.8,1.5-1.5V15.2
		c0-0.9,1.1-1.3,1.7-0.7l3.6,3.6c0.6,0.6,1.5,0.6,2.1,0L27.5,16z"/>
	<path d="M49.5,36L47.4,34c-0.6-0.6-1.5-0.6-2.1,0l-3.6,3.6c-0.6,0.6-1.7,0.2-1.7-0.7V15.5c0-0.8-0.7-1.5-1.5-1.5h-3
		c-0.8,0-1.5,0.8-1.5,1.5v21.2c0,0.9-1.1,1.3-1.7,0.7l-3.6-3.6c-0.6-0.6-1.5-0.6-2.1,0L24.5,36c-0.6,0.6-0.6,1.5,0,2.1L36,49.6
		c0.6,0.6,1.5,0.6,2.1,0l11.5-11.5C50.1,37.5,50.1,36.5,49.5,36z"/>
</g>
</svg>
  );
}

// Setting default values for the props of IconCompara
IconCompara.defaultProps = {
  color: "dark",
  size: "16px",
};

// Typechecking props for the IconCompara
IconCompara.propTypes = {
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

export default IconCompara;

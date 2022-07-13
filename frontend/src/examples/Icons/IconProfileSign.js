// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";

function IconProfileSign({ color, size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      enable-background="new 0 0 12 12"
      version="1.1"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g>
        <path
          d="M9.3005371,6.5351563C8.4776001,7.4294434,7.3084106,8,6,8S3.5223999,7.4294434,2.6994629,6.5351563   C1.3145142,7.2350464,0.5,8.6131592,0.5,10.5V12h11v-1.5C11.5,8.6131592,10.6854858,7.2350464,9.3005371,6.5351563z"
          fill="#1D1D1B"
        />
        <circle cx="6" cy="3.5" fill="#1D1D1B" r="3.5" />
      </g>
    </svg>
  );
}

// Setting default values for the props of Office
IconProfileSign.defaultProps = {
  color: "dark",
  size: "16px",
};

// Typechecking props for the Office
IconProfileSign.propTypes = {
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

export default IconProfileSign;

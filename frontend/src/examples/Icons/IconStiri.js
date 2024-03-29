// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";

function IconStiri({ color, size }) {
  return (
    <svg
      fill="#000000"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width="25px"
      height="25px"
    >
      <path d="M 18.5 10 C 16.567 10 15 11.567 15 13.5 L 15 37.5 C 15 38.922 14.326875 40.175 13.296875 41 L 37.5 41 C 39.985 41 42 38.985 42 36.5 L 42 13.5 C 42 11.567 40.433 10 38.5 10 L 18.5 10 z M 20.5 16 L 36.5 16 C 36.776 16 37 16.224 37 16.5 C 37 16.776 36.776 17 36.5 17 L 20.5 17 C 20.224 17 20 16.776 20 16.5 C 20 16.224 20.224 16 20.5 16 z M 10.5 19 C 8.567 19 7 20.567 7 22.5 L 7 37.5 C 7 39.433 8.567 41 10.5 41 C 12.433 41 14 39.433 14 37.5 L 14 19 L 10.5 19 z M 20.5 22 L 36.5 22 C 36.776 22 37 22.224 37 22.5 C 37 22.776 36.776 23 36.5 23 L 20.5 23 C 20.224 23 20 22.776 20 22.5 C 20 22.224 20.224 22 20.5 22 z M 21 28 L 26 28 C 26.552 28 27 28.448 27 29 L 27 34 C 27 34.552 26.552 35 26 35 L 21 35 C 20.448 35 20 34.552 20 34 L 20 29 C 20 28.448 20.448 28 21 28 z M 30.5 28 L 36.5 28 C 36.776 28 37 28.224 37 28.5 C 37 28.776 36.776 29 36.5 29 L 30.5 29 C 30.224 29 30 28.776 30 28.5 C 30 28.224 30.224 28 30.5 28 z M 30.5 34 L 36.5 34 C 36.776 34 37 34.224 37 34.5 C 37 34.776 36.776 35 36.5 35 L 30.5 35 C 30.224 35 30 34.776 30 34.5 C 30 34.224 30.224 34 30.5 34 z" />
    </svg>
  );
}

IconStiri.defaultProps = {
  color: "dark",
  size: "16px",
};

IconStiri.propTypes = {
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

export default IconStiri;

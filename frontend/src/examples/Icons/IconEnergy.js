// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";

function IconEnergy({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
      <path d="M595.344 64.72h.176-.176zm0 0l-72.207 379.377 261.584.88L428.657 959.28l72.208-417.376-261.568-.912zm.049-63.999c-1.728 0-3.455.063-5.151.19-11.296.913-18.785 4.689-27.664 10.657a64.304 64.304 0 0 0-13.392 11.936 56.688 56.688 0 0 0-3.297 4.288L187.281 502.4c-14.16 19.408-16.24 45.025-5.36 66.433 10.864 21.408 32.832 34.976 56.912 35.152l184.736 1.344-58.08 342.192c-5.52 29.408 10.16 58.72 37.76 70.528a64.19 64.19 0 0 0 25.391 5.216c20.112 0 36.64-9.408 49.041-26.4L836.737 482.56c14.16-19.409 16.225-45.057 5.36-66.433-10.864-21.408-32.832-34.977-56.912-35.152l-184.736-.32 57.456-300.88a62.46 62.46 0 0 0 1.825-15.056c0-34.624-27.569-62.848-62.065-63.968-.767-.032-1.52-.032-2.271-.032z" />
    </svg>
  );
}

// Setting default values for the props of Office
IconEnergy.defaultProps = {
  color: "dark",
  size: "16px",
};

// Typechecking props for the Office
IconEnergy.propTypes = {
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

export default IconEnergy;

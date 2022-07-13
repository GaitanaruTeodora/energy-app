import PropTypes from "prop-types";
import colors from "assets/theme/base/colors";

function IconRecommended({ color, size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>ic_fluent_recommended_24_regular</title>
      <desc>Created with Sketch.</desc>
      <g id="🔍-Product-Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          id="ic_fluent_recommended_24_regular"
          fill={colors[color] ? colors[color].main : colors.dark.main}
          fillRule="nonzero"
        >
          <path
            d="M12,2 C16.418278,2 20,5.581722 20,10 C20,12.5480905 18.8087155,14.8179415 16.9527141,16.2829857 L17.0016031,16.2440856 L17.0007001,22.2453233 C17.0007001,22.7945586 16.4297842,23.157512 15.9324488,22.9244522 L12.0005291,21.0818879 L8.07069102,22.9243915 C7.5733438,23.1575726 7.00231009,22.7946207 7.00231009,22.2453233 L7.00069412,16.2459273 C5.1725143,14.7820178 4,12.5279366 4,10 C4,5.581722 7.581722,2 12,2 Z M15.5012202,17.1951723 L15.5414683,17.1754104 C14.4738996,17.7033228 13.2715961,18 12,18 C10.8745896,18 9.80345551,17.7676152 8.83196505,17.3482129 L8.50180347,17.1966457 L8.50231009,21.065345 L11.6820691,19.5745158 C11.8837425,19.4799613 12.1170099,19.479939 12.3187014,19.5744551 L15.5007001,21.0655937 L15.5012202,17.1951723 Z M12,3.5 C8.41014913,3.5 5.5,6.41014913 5.5,10 C5.5,13.5898509 8.41014913,16.5 12,16.5 C15.5898509,16.5 18.5,13.5898509 18.5,10 C18.5,6.41014913 15.5898509,3.5 12,3.5 Z M12.2287851,6.64234387 L13.1413078,8.49499737 L15.185271,8.79035658 C15.3945922,8.82060416 15.4782541,9.07783021 15.326776,9.22542655 L13.8484251,10.6658938 L14.1974269,12.7012993 C14.2331646,12.9097242 14.0143068,13.0685941 13.8272087,12.9700424 L12,12.0075816 L10.1727912,12.9700424 C9.98560603,13.06864 9.76668059,12.9095814 9.80260908,12.7010893 L10.1533251,10.6658938 L8.67333197,9.22553178 C8.52171667,9.07797642 8.60533875,8.82061413 8.81472896,8.79035658 L10.8586922,8.49499737 L11.7712148,6.64234387 C11.8646966,6.45255204 12.1353033,6.45255204 12.2287851,6.64234387 Z"
            id="🎨-Color"
          ></path>
        </g>
      </g>
    </svg>
  );
}

// Setting default values for the props of Iconrecommended
IconRecommended.defaultProps = {
  color: "dark",
  size: "16px",
};

// Typechecking props for the Iconrecommended
IconRecommended.propTypes = {
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

export default IconRecommended;

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";

function IconConfiguratii({ color, size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 42 42"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>office</title>
      <g id="Basic-Elements" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          id="Rounded-Icons"
          transform="translate(-1869.000000, -293.000000)"
          fill={colors[color] ? colors[color].main : colors.dark.main}
          fillRule="nonzero"
        >
          <g id="Icons-with-opacity" transform="translate(1716.000000, 291.000000)">
            <g id="office" transform="translate(153.000000, 2.000000)">
            <g id="Bullet-list">
	<path d="M22.9840508,12.7494497h40c0.5522995,0,0.9995995-0.4471998,0.9995995-0.9994993
		c0-0.5522003-0.4473-0.9995003-0.9995995-0.9995003h-40c-0.5522003,0-0.9995003,0.4473-0.9995003,0.9995003
		C21.9845505,12.3022499,22.4318504,12.7494497,22.9840508,12.7494497z"/>
	<path d="M62.9840508,31.2963505h-40c-0.5522003,0-0.9995003,0.4473-0.9995003,0.9994984
		c0,0.5522995,0.4473,0.9995003,0.9995003,0.9995003h40c0.5522995,0,0.9995995-0.4472008,0.9995995-0.9995003
		C63.9836502,31.7436504,63.5363503,31.2963505,62.9840508,31.2963505z"/>
	<path d="M62.9840508,51.2504501h-40c-0.5522003,0-0.9995003,0.4473-0.9995003,0.9995003
		c0,0.5522995,0.4473,0.9995003,0.9995003,0.9995003h40c0.5522995,0,0.9995995-0.4472008,0.9995995-0.9995003
		C63.9836502,51.6977501,63.5363503,51.2504501,62.9840508,51.2504501z"/>
	<path d="M5.9840508,5.7822499c-3.2904999,0-5.9677,2.6771998-5.9677,5.9677005c0,3.2905998,2.6772001,5.9678001,5.9677,5.9678001
		c3.2905998,0,5.9678001-2.6772003,5.9678001-5.9678001C11.9518509,8.4594498,9.2746506,5.7822499,5.9840508,5.7822499z
		 M5.9840508,15.7822504c-2.2235854,0-4.0321999-1.8086004-4.0321999-4.0323c0-2.2236004,1.8086146-4.0322003,4.0321999-4.0322003
		c2.2236996,0,4.0323,1.8085999,4.0323,4.0322003C10.0163507,13.97365,8.2077503,15.7822504,5.9840508,15.7822504z"/>
	<path d="M5.9840508,26.3281498c-3.2904999,0-5.9677,2.6772003-5.9677,5.9676991c0,3.2905998,2.6772001,5.9678001,5.9677,5.9678001
		c3.2905998,0,5.9678001-2.6772003,5.9678001-5.9678001C11.9518509,29.0053501,9.2746506,26.3281498,5.9840508,26.3281498z
		 M5.9840508,36.3281517c-2.2235854,0-4.0321999-1.8086014-4.0321999-4.0323029c0-2.2235985,1.8086146-4.032198,4.0321999-4.032198
		c2.2236996,0,4.0323,1.8085995,4.0323,4.032198C10.0163507,34.5195503,8.2077503,36.3281517,5.9840508,36.3281517z"/>
	<path d="M5.9840508,46.2822495c-3.2904999,0-5.9677,2.6772003-5.9677,5.967701c0,3.2905998,2.6772001,5.9678001,5.9677,5.9678001
		c3.2905998,0,5.9678001-2.6772003,5.9678001-5.9678001C11.9518509,48.9594498,9.2746506,46.2822495,5.9840508,46.2822495z
		 M5.9840508,56.2822495c-2.2235854,0-4.0321999-1.8085976-4.0321999-4.032299c0-2.2236023,1.8086146-4.0321999,4.0321999-4.0321999
		c2.2236996,0,4.0323,1.8085976,4.0323,4.0321999C10.0163507,54.4736519,8.2077503,56.2822495,5.9840508,56.2822495z"/>
</g>
              </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

// Setting default values for the props of Office
IconConfiguratii.defaultProps = {
  color: "dark",
  size: "16px",
};

// Typechecking props for the Office
IconConfiguratii.propTypes = {
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

export default IconConfiguratii;

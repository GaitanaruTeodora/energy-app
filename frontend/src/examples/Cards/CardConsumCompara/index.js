import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

function CardConsumCompara({ bgColor, title, count, percentage, icon, direction }) {
  return (
    <Card>
      <SuiBox bgColor={bgColor} variant="gradient">
        <SuiBox p={1.5}>
          <Grid container alignItems="center">
            {direction === "left" ? (
              <Grid item xs={8}>
                <SuiBox
                  variant="gradient"
                  bgColor={bgColor === "white" ? icon.color : "white"}
                  color={bgColor === "white" ? "white" : "dark"}
                  width="3rem"
                  height="4.5rem"
                  borderRadius="md"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  shadow="md"
                >
                  <Icon fontSize="medium" color="inherit">
                    bolt
                  </Icon>
                </SuiBox>
              </Grid>
            ) : null}
            <Grid item xs={8}>
              <SuiBox ml={direction === "left" ? 2 : 0} lineHeight={1}>
                <SuiTypography
                  variant="button"
                  color={bgColor === "white" ? "text" : "white"}
                  opacity={bgColor === "white" ? 1 : 0.7}
                  fontWeight={title.fontWeight}
                >
                  {title.text}
                </SuiTypography>
                <SuiTypography
                  variant="h5"
                  fontWeight="bold"
                  color={bgColor === "white" ? "dark" : "white"}
                >
                  {count}{" "}
                  <SuiTypography variant="button" color={percentage.color} fontWeight="bold">
                    {percentage.text}
                  </SuiTypography>
                </SuiTypography>
              </SuiBox>
            </Grid>
            {direction === "right" ? (
              <Grid item xs={4}>
                <SuiBox
                  variant="gradient"
                  bgColor={bgColor === "white" ? icon.color : "white"}
                  color={bgColor === "white" ? "white" : "dark"}
                  width="3rem"
                  height="4.5rem"
                  marginLeft="auto"
                  borderRadius="md"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  shadow="md"
                >
                  <Icon fontSize="medium" color="inherit">
                    bolt
                  </Icon>
                </SuiBox>
              </Grid>
            ) : null}
          </Grid>
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

CardConsumCompara.defaultProps = {
  bgColor: "white",
  title: {
    fontWeight: "medium",
    text: "",
  },
  percentage: {
    color: "success",
    text: "",
  },
  direction: "right",
};

CardConsumCompara.propTypes = {
  bgColor: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  title: PropTypes.PropTypes.shape({
    fontWeight: PropTypes.oneOf(["light", "regular", "medium", "bold"]),
    text: PropTypes.string,
  }),
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  icon: PropTypes.shape({
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
    component: PropTypes.node.isRequired,
  }).isRequired,
  direction: PropTypes.oneOf(["right", "left"]),
};

export default CardConsumCompara;

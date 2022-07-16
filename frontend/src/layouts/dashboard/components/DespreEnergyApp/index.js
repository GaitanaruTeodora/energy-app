// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Images
import energyBulb from "assets/images/energyBulb.png";
import Separator from "layouts/authentication/components/Separator";

function DespreEnergyApp() {
  return (
    <Card>
      <SuiBox p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <SuiBox display="flex" flexDirection="column" height="100%">
              <SuiTypography variant="h5" fontWeight="bold" gutterBottom>
                Energy App
              </SuiTypography>
              <SuiBox mb={6}>
                <SuiTypography variant="body2" color="text">
                  Doar daca esti informat corect, alegi soluțiile cele mai bune astfel încat să
                  reduci consumul, să eviți risipa de energie și să protejezi mediul încojurator.
                  <Separator />
                  Misiunea Energy App este să contribuie la procesul de informare al utilizatorilor
                  de energie electrică oferind noi informații, sfaturi de consum, recomandări
                  eficiente de electrocasnice și valori cat mai reale ale consumului si
                  cheltuielilor proprii.
                </SuiTypography>
              </SuiBox>
              <SuiTypography
                component="a"
                href="#"
                variant="button"
                color="text"
                fontWeight="medium"
                sx={{
                  mt: "auto",
                  mr: "auto",
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",

                  "& .material-icons-round": {
                    fontSize: "1.125rem",
                    transform: `translate(2px, -0.5px)`,
                    transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
                  },

                  "&:hover .material-icons-round, &:focus  .material-icons-round": {
                    transform: `translate(6px, -0.5px)`,
                  },
                }}
              >
                
                <Icon sx={{ fontWeight: "bold" }}></Icon>
              </SuiTypography>
            </SuiBox>
          </Grid>
          <Grid item xs={12} lg={5} sx={{ position: "relative", ml: "auto" }}>
            <SuiBox
              height="100%"
              display="grid"
              justifyContent="center"
              alignItems="center"
              variant="gradient"
            >
              <SuiBox
                component="img"
                src={energyBulb}
                borderRadius="lg"
                alt="energy"
                width="100%"
                pt={0}
              />
            </SuiBox>
          </Grid>
        </Grid>
      </SuiBox>
    </Card>
  );
}

export default DespreEnergyApp;

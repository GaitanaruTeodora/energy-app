// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

function Stire({ titlu, descriere, url, img, data }) {
  return (
    <Card
      onClick={() => { window.open(url, "_blank");}}
    >
      <SuiBox p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <SuiBox display="flex" flexDirection="column" height="100%">
              <SuiBox pt={1} mb={0.5}></SuiBox>
              <SuiTypography variant="h6" fontWeight="bold" gutterBottom>
                {titlu}
              </SuiTypography>
              <SuiBox mb={6}>
                <SuiTypography variant="body2" color="text">
                  {descriere}
                </SuiTypography>
              </SuiBox>
            </SuiBox>
          </Grid>
          <Grid></Grid>

          <Grid item xs={12} lg={5} sx={{ position: "relative", ml: "auto" }}>
            <SuiBox height="100%" display="grid" justifyContent="center" alignItems="center" variant="gradient">
              <SuiBox component="img" src={img} borderRadius="lg" alt="energy" width="160px" height="170px" pt={0} />
            </SuiBox>
          </Grid>
        </Grid>
        <SuiTypography variant="h6" color="text">
          Data publicare {data.replace("Z", " ").replace("T", " ")}
        </SuiTypography>
      </SuiBox>
    </Card>
  );
}
export default Stire;


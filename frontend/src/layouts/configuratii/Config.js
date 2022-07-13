import { useState } from "react";
import SuiBox from "components/SuiBox";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ListaConfiguratii from "./ListaConfiguratii";
import AdaugaConfiguratie from "./AdaugaConfiguratie";
import Grid from "@mui/material/Grid";
import SuiButton from "components/ButtonDynamic";

function Config() {
  const [isClicked, setIsClicked] = useState(false);
  const [load, setLoad] = useState(false);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox mt={1}>
        <Grid item xs={12} lg={6}>
          <SuiBox display="flex">
            <SuiButton onClick={() => setIsClicked(true)} variant="gradient" buttonColor="info">
              + Adauga configuratie
            </SuiButton>
          </SuiBox>
        </Grid>
        {isClicked ? (
          <Grid item xs={12}>
            <SuiBox my={3}>
              <AdaugaConfiguratie setLoad={setLoad} setIsClicked={setIsClicked} />
            </SuiBox>
          </Grid>
        ) : (
          <></>
        )}
        <Grid item xs={12}>
          <SuiBox my={3}>{load == false ? <ListaConfiguratii /> : <div></div>}</SuiBox>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}
export default Config;

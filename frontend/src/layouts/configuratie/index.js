import Card from "@mui/material/Card";

import SuiBox from "components/SuiBox"
import SuiTypography from "components/SuiTypography"
import Cameras from "layouts/configuratie/Camere"
import Grid from "@mui/material/Grid";
import ListaDispozitive from "./ListaDispozitive/ListaDispozitive";
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function Configuratie() {
 

  const idConfiguratie = useLocation().pathname.split("/").slice(1)[1];
  const [camera,setCamera ] = useState(0)

  const[load,setLoad] = useState(false)
 
  return(
    <DashboardLayout>
      <DashboardNavbar/>
        <SuiBox mb={3}>
          <Card>
          <Cameras idConfiguratie = {idConfiguratie} camera={camera} setCamera={setCamera} load={load} setLoad={setLoad}/>
          </Card>
          {load == false ?  <ListaDispozitive  idConfiguratie = {idConfiguratie} camera={camera} setCamera={setCamera}  /> : <div></div> }
         
        </SuiBox>
      <Footer/>
    </DashboardLayout>
  )
}
export default Configuratie;
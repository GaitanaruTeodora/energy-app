/**
=========================================================
* Soft UI Dashboard PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Soft UI Dashboard PRO React example components
import CameraView from "layouts/configuratie/CameraView";

// Images
import bucatarie from "assets/images/kitchen.jpg"
import baie from "assets/images/bathroom.jpg"
import living from "assets/images/living.jpg"
import dormitor from "assets/images/bedroom.jpg"
import ListaDispozitive from "../ListaDispozitive/ListaDispozitive";
import BasicInfo from "../BasicInfo";

import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function Cameras({idConfiguratie,camera,setCamera,load,setLoad}) {

  const dispatch = useDispatch();

  const consumators = useSelector((state) => state.getConsumators);

  const { errorRegister, loadingL, allConsumators } = consumators;
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [openMenu, setOpenMenu] = useState(null);
  const [total,setTotal] = useState(0)
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  const calculTotal = async ()=>{
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
     axios.get(
      `http://localhost:3000/api/configuratii/perconfiguratie/${userInfo.id}/${idConfiguratie}`,

      config
    ).then((r)=>{
      setTotal(r.data.total)
      console.log(r)
    })
  }

  
  useEffect(()=>{

    calculTotal()


  },[userInfo,loadingL])

  const params = useParams();
  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.md
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);





  const handleSetCamera = (event, newCamera) => setCamera(newCamera);
  const handleOpenMenu = ({ currentTarget }) => setOpenMenu(currentTarget);
  const handleCloseMenu = () => setOpenMenu(null);

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
    >
      <MenuItem onClick={handleCloseMenu}>Pause</MenuItem>
      <MenuItem onClick={handleCloseMenu}>Stop</MenuItem>
      <MenuItem onClick={handleCloseMenu}>Schedule</MenuItem>
      <SuiBox
        component="div"
        backgroundColor="secondary"
        opacity={0.3}
        width="100%"
        height="1px"
        my={1}
      />
      <MenuItem onClick={handleCloseMenu}>
        <SuiTypography variant="inherit" textColor="error">
          Remove
        </SuiTypography>
      </MenuItem>
    </Menu>
  );

  return (
    <Card>
      <SuiBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <SuiTypography variant="h6"> Consum total pe configuratie: {Math.round(total * 100) / 100} kWh </SuiTypography>
        <SuiBox display="flex" justifyContent="space-between" alignItems="center" width="60%">
          <SuiBox width="98%">
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={camera} onChange={handleSetCamera}>
                <Tab label="Bucatarie" />
                <Tab label="Living" />
                <Tab label="Dormitor" />
                <Tab label="Baie" />
              </Tabs>
            </AppBar>
          </SuiBox>
        </SuiBox>
      </SuiBox>
      <SuiBox p={2} mt={1} display="flex"  width="100%" height="30.25rem" >
      <SuiBox  width="50%" height="27.25rem" >
        {/* <ConsumatorNou/> */}
        <BasicInfo camera={camera} idConfiguratie={idConfiguratie} load={load} setLoad={setLoad} adauga={calculTotal}/>
      </SuiBox>

      <SuiBox p={2} mt={1} mb={5} display="flex"  width="50%" height="28.25rem" >
        <CameraView image={bucatarie}  value={camera} index={0} />
        <CameraView image={living}  value={camera} index={1} />
        <CameraView image={dormitor}  value={camera} index={2} />
        <CameraView image={baie}  value={camera} index={3} />
      </SuiBox>


      </SuiBox>
   

    </Card>
  );
}

export default Cameras;

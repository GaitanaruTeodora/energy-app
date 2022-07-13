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

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import dataTableData from "layouts/configuratie/ListaDispozitive/data/dataTableData";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "@mui/material";
import TabelDispozitive from "layouts/configuratii/components/TabelDispozitive";
import { listConsumatori } from "actions/configurationAction";

function ListaDispozitive({ idConfiguratie, camera, setCamera }) {
  const dispatch = useDispatch();

  const consumators = useSelector((state) => state.getConsumators);

  const { errorRegister, loadingRegister, allConsumators } = consumators;

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  useEffect(() => {
    console.log(allConsumators);
  }, [consumators]);

  useEffect(() => {
    console.log("Camera " + camera);
    dispatch(listConsumatori(userInfo.id, idConfiguratie));
  }, []);

  return (
    <SuiBox my={3}>
      <Card>
        {/* <SuiBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
      
            <Stack spacing={1} direction="row">
              <Link to="/ecommerce/products/new-product" className="decoration-none">
                <SuiButton variant="gradient" buttonColor="info" size="small">
                  + new product
                </SuiButton>
              </Link>
              <SuiButton variant="outlined" buttonColor="info" size="small">
                import
              </SuiButton>
              <SuiButton variant="outlined" buttonColor="info" size="small">
                export
              </SuiButton>
            </Stack>
          </SuiBox> */}
        <Divider />
{loadingRegister? <div></div>:  <SuiBox pb={2} px={2}>
          <SuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
            {allConsumators !== undefined ? (
              allConsumators.map((i) => {
               
                if (i.camera === camera)
                  return (
                    <TabelDispozitive
                      imagine={i.imagine}
                      title={i.denumire}
                      pret={i.pret}
                      consum={i.consum}
                      frecventa={i.frecventaUtilizare}
                      date="24 March 2019"
                      project={i.denumire}
                      company={i.denumire}
                      idConfiguratie={i.configuratieId}
                      idConsumator = {i.id}
                      idUser = {userInfo.id}
                      categorie={i.categorie}
                      predefinit ={i.predefinit}
                      defaultChecked
                    />
                  );
              })
            ) : (
              <div></div>
            )}
          </SuiBox>
        </SuiBox> }
      
      </Card>
    </SuiBox>
  );
}

export default ListaDispozitive;

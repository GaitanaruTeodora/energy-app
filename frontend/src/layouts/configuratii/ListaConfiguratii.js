import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

import Configuratie from "layouts/configuratii/components/Configuratie";
import { listConfigurations } from "actions/configurationAction";

function ListaConfiguratii() {
  const dispatch = useDispatch();

  const listConfig = useSelector((state) => state.listConfigurations);
  const {loading, allConfiguration } = listConfig;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const consumators = useSelector((state) => state.getConsumators);
  const [loadConfiguratie, setLoatConfiguratie] = useState(false);
  const { errorRegister, loadingRegister, allConsumators } = consumators;
  useEffect(() => {
    if (userInfo === null) {
    } else {
      dispatch(listConfigurations(userInfo.id));
    }
  }, [userInfo]);

  return (
    <Card>
      <SuiBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <SuiTypography variant="h6" fontWeight="bold">
          Configuratiile mele
        </SuiTypography>
      </SuiBox>
      <Divider />

      {loading? <div></div> : <SuiBox pb={2} px={2}>
        <SuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {allConfiguration !== undefined ? (
            allConfiguration.configuraties.map((i) => {
              return (
                <Configuratie
                  title={i.denumire}
                  date={new Date().toLocaleString() + ""}
                  project={i.furnizorEnergie}
                  company={i.pretEnergie}
                  idConfiguratie={i.id}
                  setLoatConfiguratie={setLoatConfiguratie}
                  loadConfiguratie={loadConfiguratie}
                />
              );
            })
          ) : (
            <div></div>
          )}
        </SuiBox>
      </SuiBox> }
     
    </Card>
  );
}

export default ListaConfiguratii;

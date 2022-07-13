import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
// Soft UI Dasboard PRO Material components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dasboard PRO Material base styles
import borders from "assets/theme/base/borders";
import colors from "assets/theme/base/colors";
import SuiButton from "components/ButtonDynamic";
import { deleteConfiguration, listConfigurations } from "actions/configurationAction";
import ListaConfiguratii from "layouts/configuratii/ListaConfiguratii";
import axios from "axios";
function Configuratie({loadConfiguratie, color, title, date, project, company,idConfiguratie, defaultChecked, noDivider,setLoatConfiguratie }) {
  const { borderWidth } = borders;
  const [openMenu, setOpenMenu] = useState(null);

  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(null);

  
  const getPageConf = ( id)=>{
    console.log(id)
  }

  const listConfig = useSelector((state) => state.listConfigurations);
  const { allConfiguration } = listConfig;

  // dispatch
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const stergeConfiguratie= ()=>{
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
  axios.delete(
      `http://localhost:3000/api/configuratii/${userInfo.id}/stergeConfiguratie/${idConfiguratie}`,

      config
    ).then((r)=>{
      dispatch(listConfigurations(userInfo.id))
    })
   
   
  
  

  }

  return (
    <SuiBox
      component="li"
      width="100%"
      pr={2}
      mb={1}
      ml={1}
      borderLeft={`${borderWidth[3]} solid ${colors[color].main}`}
      customClass="no-list-style"
    >
      <SuiBox width="100%" pl={1} ml={2}>
        <SuiBox display="flex" alignItems="center">
 
          
          
          
        </SuiBox>
        <SuiBox
          display="flex"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mt={2}
          ml={3}
          pl={0.5}
        >
          <SuiBox lineHeight={1} mb={{ xs: 1, sm: 0 }}>
            <SuiTypography
              display="block"
              variant="caption"
              fontWeight="medium"
              textColor="secondary"
            >
              Denumire
            </SuiTypography>
            <SuiTypography variant="caption" fontWeight="bold" textColor="text">
              {title}
            </SuiTypography>
          </SuiBox>
          <SuiBox ml={{ xs: 0, sm: "auto" }} mb={{ xs: 1, sm: 0 }} lineHeight={1}>
            <SuiTypography
              display="block"
              variant="caption"
              fontWeight="medium"
              textColor="secondary"
            >
              Furnizor
            </SuiTypography>
            <SuiTypography variant="caption" fontWeight="bold" textColor="text">
              {project}
            </SuiTypography>
          </SuiBox>
          <SuiBox mx={{ xs: 0, sm: "auto" }} lineHeight={1}>
            <SuiTypography
              display="block"
              variant="caption"
              fontWeight="medium"
              textColor="secondary"
            >
              Pret Energie
            </SuiTypography>
            <SuiTypography variant="caption" fontWeight="bold" textColor="text">
              {company} RON
            </SuiTypography>

            
          </SuiBox>
          <SuiBox   mr={3}>
          <SuiButton variant={"outlined"} 
            onClick = {()=>{stergeConfiguratie()}}
            buttonColor={ "error"}>
              Sterge 
            </SuiButton>
          
         
          </SuiBox>
          <SuiBox mr={3}>
          <SuiButton  variant={"outlined"} 
          onClick = {()=>{getPageConf(idConfiguratie)}}
            buttonColor={ "secondary"}>
               Modifica  
            
            </SuiButton>
          </SuiBox>

          

          <SuiBox    mr={3}
          
          >
               <Link to={`/configuratie/${idConfiguratie}`}>
          <SuiButton variant={"outlined"} 
          onClick = {()=>{getPageConf(idConfiguratie)}}
            buttonColor={ "dark"}>
               Vizualizeaza  
            
            </SuiButton>
            </Link>
          </SuiBox>
        </SuiBox>
      </SuiBox>
      {noDivider ? null : <Divider sx={{ marginBottom: 0 }} />}
    </SuiBox>
  );
}

Configuratie.defaultProps = {
  color: "info",
  noDivider: false,
  defaultChecked: false,
};

Configuratie.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  defaultChecked: PropTypes.bool,
  noDivider: PropTypes.bool,
};

export default Configuratie;

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

import { useState } from "react";
import "./style.css"
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
// Soft UI Dasboard PRO Material components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dasboard PRO Material base styles
import borders from "assets/theme/base/borders";
import colors from "assets/theme/base/colors";
import SuiButton from "components/ButtonDynamic";

function TabelDispozitive({ color,culoare,func, numar,imagine, title,pret,consum,frecventa, date, project, company,idConfiguratie, defaultChecked, noDivider }) {
  const { borderWidth } = borders;
  const [openMenu, setOpenMenu] = useState(null);

  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(null);

  const getPageConf = ( id)=>{
    console.log(id)
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
      <SuiBox width="100%" pl={1} ml={2} className="main-item-container">
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
          <SuiBox lineHeight={1} mb={{ xs: 1, sm: 0 }}           pr={2}>
          <SuiBox
              component="img"
              src={imagine}
              alt="pattern-lines"
              width="100px"
          
            />
          </SuiBox>
          <SuiBox  ml={{ xs: 0, sm: "auto" }} mb={{ xs: 1, sm: 0 }} lineHeight={1}>
            <SuiTypography
              display="block"
              variant="caption"
              fontWeight="medium"
              textColor="secondary"
            >
              Denumire
            </SuiTypography>
            <SuiTypography variant="caption" fontWeight="bold" textColor="text">
              {title.substring(0,50)}
            </SuiTypography>
          </SuiBox>
 
          <SuiBox mx={{ xs: 0, sm: "auto" }} lineHeight={1}   pr={2}>
            <SuiTypography
              display="block"
              variant="caption"
              fontWeight="medium"
              textColor="secondary"
            >
             Pret
            </SuiTypography>
            <SuiTypography variant="caption" fontWeight="bold" textColor="text">
              {pret}
            </SuiTypography>

            
          </SuiBox>
        

          <SuiBox   mr={1} onClick={()=>func(numar)}>
          <SuiButton  
        
            buttonColor={culoare}>
              SELECTEAZA
            </SuiButton>
          
         
          </SuiBox>
      
      
        </SuiBox>
      </SuiBox>
      {noDivider ? null : <Divider sx={{ marginBottom: 0 }} />}
    </SuiBox>
  );
}

TabelDispozitive.defaultProps = {
  color: "info",
  noDivider: false,
  defaultChecked: false,
};

TabelDispozitive.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  defaultChecked: PropTypes.bool,
  noDivider: PropTypes.bool,
};

export default TabelDispozitive;

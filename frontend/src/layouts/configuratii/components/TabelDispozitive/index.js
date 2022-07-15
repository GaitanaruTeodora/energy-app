import { useState } from "react";

import PropTypes from "prop-types";

import Divider from "@mui/material/Divider";

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import { ToastContainer, toast } from "react-toastify";
import borders from "assets/theme/base/borders";
import colors from "assets/theme/base/colors";
import SuiButton from "components/ButtonDynamic";
import { listConsumatori } from "actions/configurationAction";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Grid, TextField } from "@mui/material";
function TabelDispozitive({
  predefinit,
  categorie,
  idUser,
  color,
  imagine,
  title,
  pret,
  consum,
  frecventa,
  date,
  project,
  company,
  idConfiguratie,
  defaultChecked,
  noDivider,
  idConsumator,
}) {
  const { borderWidth } = borders;
  const [openMenu, setOpenMenu] = useState(null);
  const dispatch = useDispatch();
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(null);
  const [modifica, setModifica] = useState(true);
  const [titluModifica, setTitluModifica] = useState(title);
  const [consumModifica, setConsumModifica] = useState(consum);
  const [pretModifica, setPretModifica] = useState(pret);
  const [frecventaModifica, setFrecventaModifica] = useState(frecventa);

  String.prototype.float = function() { 
    return parseFloat(this.replace(',', '.')); 
  }
  const sterge = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    axios
      .delete(
        `http://localhost:3000/api/consumatori/${idUser}/configuratie/${idConfiguratie}/id/${idConsumator}`
      )
      .then((r) => {
        dispatch(listConsumatori(idUser, idConfiguratie));
      });
  };

  const salveaza = async () => {
 
   
    if (titluModifica == "") {
      toast.error("Denumirea produsului necesita completare!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else if(consumModifica <0)
    {
      toast.error("Consumul nu poate fi negativ!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else if(pretModifica <0)
    {
      toast.error("Pretul nu poate fi negativ!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else if(frecventaModifica <0)
    {
      toast.error("Frecventa nu poate fi negativ!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else{
      if (predefinit == false) {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        axios
          .put(
            `http://localhost:3000/api/modifica/${idUser}/configuratie/${idConfiguratie}/id/${idConsumator}`,
            {
              denumire: titluModifica,
              categorie: categorie,
              consum: consumModifica,
              pret: pretModifica,
              frecventaUtilizare: frecventaModifica,
            },
            config
          )
          .then((r) => {
            setModifica(!modifica);
            toast.success("Consumatorul a fost modificat!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            dispatch(listConsumatori(idUser, idConfiguratie));
          })
          .catch((e) => console.log(e));
      } else {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        axios
          .put(
            `http://localhost:3000/api/modifica/${idUser}/configuratie/${idConfiguratie}/id/${idConsumator}`,
            {
              denumire: title,
              categorie: categorie,
              consum: consum,
              pret: pret,
              frecventaUtilizare: frecventaModifica,
            },
            config
          )
          .then((r) => {
            setModifica(!modifica);
            toast.success("Consumatorul a fost modificat!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            dispatch(listConsumatori(idUser, idConfiguratie));
          })
          .catch((e) => console.log(e));
      }
    }

   
  };

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
        <SuiBox display="flex" alignItems="center"></SuiBox>
        <SuiBox
          display="flex"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mt={2}
          ml={3}
          pl={0.5}
        >
          <SuiBox lineHeight={1} mb={{ xs: 1, sm: 0 }}>
            <SuiBox component="img" src={imagine} alt="pattern-lines" width="100px" />
          </SuiBox>

          {predefinit == false && modifica == false ? (
            <Grid ml={3} >

<SuiTypography
                display="block"
                variant="caption"
                fontWeight="bold"
                textColor="secondary"
              >
                Denumire 
              </SuiTypography>
              <TextField style={{width:"95%"}}  value={titluModifica} onChange={(e) => setTitluModifica(e.target.value)} />

            </Grid>
          ) : (
//             <Grid container spacing={2}>
//   <Grid item xs={8}>
//     <Item>xs=8</Item>
//   </Grid>
//   <Grid item xs={4}>
//     <Item>xs=4</Item>
//   </Grid>
//   <Grid item xs={4}>
//     <Item>xs=4</Item>
//   </Grid>
//   <Grid item xs={8}>
//     <Item>xs=8</Item>
//   </Grid>
// </Grid

            <SuiBox ml={{ xs: 0, sm: "auto" }} mb={{ xs: 1, sm: 0 }} lineHeight={1}>
              
              <SuiTypography
                display="block"
                variant="caption"
                fontWeight="bold"
                textColor="secondary"
              >
                Denumire
              </SuiTypography>
              <SuiTypography variant="caption" fontWeight="medium" textColor="text">
                {/* {title.substring(0, 50)} */}
                {title}
              </SuiTypography>
            </SuiBox>
         
          )}
          {predefinit == false && modifica == false ? (
  <Grid  >
             <SuiTypography
                display="block"
                variant="caption"
                fontWeight="bold"
                textColor="secondary"
              >
                Consum
              </SuiTypography>
             <TextField
               style={{width:"95%"}}
              value={consumModifica}
              type="number"
              onChange={(e) => setConsumModifica(e.target.value)}
            />
            </Grid>
           
          ) : (
            <SuiBox mx={{ xs: 0, sm: "auto" }} lineHeight={1}>
              <SuiTypography
                display="block"
                variant="caption"
                fontWeight="bold"
                textColor="secondary"
              >
                Consum
              </SuiTypography>
              <SuiTypography variant="caption" fontWeight="medium" textColor="text">
                {Math.round(consum*100)/100} kWh
              </SuiTypography>
            </SuiBox>
          )}

          {predefinit == false && modifica == false ? (
            <Grid  >

<SuiTypography
                display="block"
                variant="caption"
                fontWeight="bold"
                textColor="secondary"
              >
                Pret
              </SuiTypography>
              <TextField
              style={{width:"95%"}}
              value={pretModifica}
              type="number"
              onChange={(e) => setPretModifica(e.target.value)}
            />
            </Grid>
            
          ) : (
            <SuiBox mx={{ xs: 0, sm: "auto" }} lineHeight={1}>
              <SuiTypography
                display="block"
                variant="caption"
                fontWeight="bold"
                textColor="secondary"
              >
                Pret
              </SuiTypography>
              <SuiTypography variant="caption" fontWeight="medium" textColor="text">
                {pret} RON
              </SuiTypography>
            </SuiBox>
          )}

          {modifica == false ? (
          
          <Grid  >
                <SuiTypography
                display="block"
                variant="caption"
                fontWeight="bold"
                textColor="secondary"
              >
                Frecventa utilizare
              </SuiTypography>
              <TextField
                 style={{width:"95%"}}
                value={frecventaModifica}
                onChange={(e) => setFrecventaModifica(e.target.value)}
                type="number"
              />
              </Grid>
              
         
          ) : (
            <SuiBox mx={{ xs: 0, sm: "auto" }} lineHeight={1}>
              <SuiTypography
                display="block"
                variant="caption"
                fontWeight="bold"
                textColor="secondary"
              >
                Frecventa utilizare
              </SuiTypography>
              <SuiTypography variant="caption" fontWeight="medium" textColor="text">
                {frecventa}
              </SuiTypography>
            </SuiBox>
          )}
     
          <SuiBox mr={3}>
            <SuiButton sty buttonColor={"success"}>
              TOTAL
              <br></br>
              {Math.round((frecventa * consum)*100)/100} kWh
            </SuiButton>
          </SuiBox>
          <SuiBox mr={3}>
            <SuiButton variant={"outlined"} onClick={() => sterge()} buttonColor={"error"}>
              Sterge
            </SuiButton>
          </SuiBox>
          <SuiBox mr={3}>
            {modifica ? (
              <SuiButton
                variant={"outlined"}
                onClick={() => setModifica(!modifica)}
                buttonColor={"primary"}
              >
                Modifica
              </SuiButton>
            ) : (
              <SuiButton variant={"outlined"} onClick={() => salveaza()} buttonColor={"primary"}>
                Salveaza
              </SuiButton>
            )}
          </SuiBox>
          <ToastContainer
            style={{ fontSize: 16, fontFamily: "Verdana, Arial, Tahoma, Serif" }}
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
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

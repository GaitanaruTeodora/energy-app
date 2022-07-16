import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
// @mui material components
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
// Soft UI Dasboard PRO Material components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import { Grid, TextField } from "@mui/material";
// Soft UI Dasboard PRO Material base styles
import borders from "assets/theme/base/borders";
import colors from "assets/theme/base/colors";
import SuiButton from "components/ButtonDynamic";
import { deleteConfiguration, listConfigurations } from "actions/configurationAction";
import ListaConfiguratii from "layouts/configuratii/ListaConfiguratii";
import axios from "axios";
function Configuratie({
  loadConfiguratie,
  color,
  title,
  date,
  project,
  company,
  idConfiguratie,
  defaultChecked,
  noDivider,
  setLoatConfiguratie,
}) {
  const { borderWidth } = borders;
  const [openMenu, setOpenMenu] = useState(null);

  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(null);
  const [modifica, setModifica] = useState(true);
  const [furnizorModifica, setFurnizorModifica] = useState(project);
  const [titluModifica, setTitluModifica] = useState(title);
  const [pretModifica, setPretModifica] = useState(company);
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
    } else if (pretModifica < 0) {
      toast.error("Pretul nu poate fi negativ!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (furnizorModifica == "") {
      toast.error("Furnizorul nu poate fi gol!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      axios
        .put(
          `http://localhost:3000/api/modificaConfiguratie/${idConfiguratie}`,
          {
            denumire: titluModifica,
            furnizorEnergie: furnizorModifica,
            pretEnergie: pretModifica,
          },
          config
        )
        .then((r) => {
          setModifica(!modifica);

          toast.success("Configuratie modificata", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          dispatch(listConfigurations(userInfo.id));
        })
        .catch((e) => {
          toast.error(e, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  const getPageConf = (id) => {
    console.log(id);
  };

  const listConfig = useSelector((state) => state.listConfigurations);
  const { allConfiguration } = listConfig;

  // dispatch
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const stergeConfiguratie = () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    axios
      .delete(
        `http://localhost:3000/api/configuratii/${userInfo.id}/stergeConfiguratie/${idConfiguratie}`,

        config
      )
      .then((r) => {
        dispatch(listConfigurations(userInfo.id));
      });
  };

  return (
    <SuiBox
      component="li"
      width="100%"
      pr={2}
      mb={1}
      ml={2}
      borderLeft={`${borderWidth[3]} solid ${colors[color].main}`}
      customClass="no-list-style"
    >
      <SuiBox  width="100%">
        <SuiBox
          display="flex"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mt={1}
          pl={0.5}
        >
          {modifica == false ? (
            <Grid ml={3} mr={3}>
              <SuiTypography
            
                display="block"
                variant="caption"
                fontWeight="bold"
                textColor="secondary"
              >
                Denumire
              </SuiTypography>
              <TextField
                style={{ width: "100%" }}
                value={titluModifica}
                onChange={(e) => setTitluModifica(e.target.value)}
              />
            </Grid>
          ) : (
            <SuiBox ml={2} mb={{ xs: 1, sm: 0 }} lineHeight={1}>
              <SuiTypography
                display="block"
                variant="caption"
                fontWeight="bold"
                textColor="secondary"
              >
                Denumire
              </SuiTypography>
              <SuiTypography variant="caption" fontWeight="medium" textColor="text">
                {title}
              </SuiTypography>
            </SuiBox>
          )}
          <SuiBox ml={{ xs: 0, sm: "auto" }} mb={{ xs: 1, sm: 0 }} lineHeight={1}>
            {modifica == false ? (
              <Grid ml={3}>
                <SuiTypography
                  display="block"
                  variant="caption"
                  fontWeight="bold"
                  textColor="secondary"
                >
                  Furnizor
                </SuiTypography>
                <TextField
                  style={{ width: "100%" }}
                  value={furnizorModifica}
                  onChange={(e) => setFurnizorModifica(e.target.value)}
                />
              </Grid>
            ) : (
              <SuiBox ml={{ xs: 0, sm: "auto" }} mb={{ xs: 1, sm: 0 }} lineHeight={1}>
                <SuiTypography
                  display="block"
                  variant="caption"
                  fontWeight="bold"
                  textColor="secondary"
                >
                  Furnizor
                </SuiTypography>
                <SuiTypography variant="caption" fontWeight="medium" textColor="text">
                  {/* {title.substring(0, 50)} */}
                  {project}
                </SuiTypography>
              </SuiBox>
            )}
          </SuiBox>
          <SuiBox mx={{ xs: 0, sm: "auto" }} lineHeight={1}>
            {modifica == false ? (
              <Grid>
                <SuiTypography
                  display="block"
                  variant="caption"
                  fontWeight="bold"
                  textColor="secondary"
                >
                  Pret
                </SuiTypography>
                <TextField
                  style={{ width: "100%" }}
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
                  {company} RON
                </SuiTypography>
              </SuiBox>
            )}
          </SuiBox>
          <SuiBox mr={2}>
            <SuiButton
              variant={"outlined"}
              onClick={() => {
                stergeConfiguratie();
              }}
              buttonColor={"error"}
            >
              Sterge
            </SuiButton>
          </SuiBox>
          <SuiBox mr={2}>
            {modifica ? (
              <SuiButton
                variant={"outlined"}
                onClick={() => setModifica(!modifica)}
                buttonColor={"dark"}
              >
                Modifica
              </SuiButton>
            ) : (
              <SuiButton variant={"outlined"} onClick={() => salveaza()} buttonColor={"dark"}>
                Salveaza
              </SuiButton>
            )}

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

          <SuiBox mr={2}>
            <Link to={`/configuratie/${idConfiguratie}`}>
              <SuiButton
                variant={"gradient"}
                onClick={() => {
                  getPageConf(idConfiguratie);
                }}
                buttonColor={"light"}
              >
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

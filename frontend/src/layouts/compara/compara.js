import { Card, Grid, Icon } from "@mui/material";
import SuiBox from "components/SuiBox";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import "./style.css";
import ReactTable from "react-table";
import { useDispatch, useSelector } from "react-redux";
import TabelDispozitive from "./tabel";
import { identifier } from "stylis";
import SuiTypography from "components/SuiTypography";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import CardConsumCompara from "examples/Cards/CardConsumCompara";
function Compara() {
  const dispatch = useDispatch();

  const consumators = useSelector((state) => state.getConsumators);
  const [total, setTotal] = useState(0);
  const [totalDupa, setTotalDupa] = useState(0);
  const { errorRegister, loadingRegister, allConsumators } = consumators;

  const userLogin = useSelector((state) => state.userLogin);
  const [consumatoriProprii, setConsumatoriProprii] = useState([]);
  const [predefiniti, setPredefiniti] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selecteaza1, setSelecteaza1] = useState(0);
  const [selecteaza2, setSelecteaza2] = useState(0);
  const [categorie, setCategorie] = useState("");

  const get_recomandari = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    await axios
      .post(
        `http://localhost:3000/api/python`,
        {
          denumire: "Televizor Smart QLED, Samsung 43Q60A, 108 cm, Ultra HD 4K, Clasa G",
        },
        config
      )
      .then(({ data }) => {
        let js = JSON.parse(data["out"][0].replaceAll(`'`, `"`));
        console.log(js["rez"]["poz1"]["img"]);
      });
  };

  const { error, loading, userInfo } = userLogin;
  useEffect(() => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    setLoading(true);
    axios
      .get(
        `http://localhost:3000/api/consumatori/${userInfo.id}`,

        config
      )
      .then((r) => {
        setConsumatoriProprii(r.data.consumatori);
        axios
          .get(
            `http://localhost:3000/api/getpredefiniti`,

            config
          )
          .then((rez) => {
            setConsumatoriProprii(r.data.consumatori);
            setCategorie(r.data.consumatori[0].categorie);
            setPredefiniti(rez.data);
            setLoading(false);

            try {
              const id = r.data.consumatori[0].configuratieId;
              const totalInainte =
                r.data.consumatori[0].consum * r.data.consumatori[0].frecventaUtilizare;
              const totalD = rez.data[0].consum * r.data.consumatori[0].frecventaUtilizare;
              const config = {
                headers: {
                  "Content-type": "application/json",
                },
              };
              axios
                .get(
                  `http://localhost:3000/api/configuratii/perconfiguratie/${userInfo.id}/${id}`,

                  config
                )
                .then((r) => {
                  setTotal(r.data.total);
                  setTotalDupa(r.data.total - totalInainte + totalD);
                });
            } catch (e) {}
          });
      });

    // get_recomandari.then((x)=>console.log(x))

    //"Televizor Smart QLED, Samsung 43Q60A, 108 cm, Ultra HD 4K, Clasa G"
  }, [userInfo]);

  useEffect(() => {
    try {
      const id = consumatoriProprii[selecteaza1].configuratieId;
      const totalInainte = consumatoriProprii[selecteaza1].consum * consumatoriProprii[selecteaza1].frecventaUtilizare;
      const totalDupa = predefiniti[selecteaza2].consum * consumatoriProprii[selecteaza1].frecventaUtilizare;
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      axios
        .get(
          `http://localhost:3000/api/configuratii/perconfiguratie/${userInfo.id}/${id}`,

          config
        )
        .then((r) => {
          setTotal(r.data.total);
          setTotalDupa(r.data.total - totalInainte + totalDupa);
        });
    } catch (e) {}
  }, [selecteaza1, selecteaza2]);
  const list = [
    "Ion",
    "vasile",
    "au",
    "Ion",
    "vasile",
    "au",
    "Ion",
    "vasile",
    "au",
    "Ion",
    "vasile",
    "au",
    "Ion",
    "vasile",
    "au",
  ];
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {categorie !== undefined && consumatoriProprii[selecteaza1] !== undefined ? (
        <Grid item container direction="row">
      <Icon fontSize="medium" color="inherit">
      arrow_forward
      </Icon>
        <SuiTypography
        variant="h5" fontWeight="bold"  color="dark" 
        >Categorie selectata : {consumatoriProprii[selecteaza1].categorie}</SuiTypography>

        </Grid>
        
      ) : (
        <SuiTypography>nu</SuiTypography>
      )}

      {isLoading ? (
        <Bars color="#00BFFF" height={300} width={200} />
      ) : (
        <SuiBox py={3}>
          <SuiBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={6}>
                <SuiBox
                  component="ul"
                  display="flex"
                  flexDirection="column"
                  p={0}
                  m={0}
                  className="container"
                >
                  <table className="main-edit-table" align="right">
                    <thead>
                      <th>Dispozitivele tale</th>
                    </thead>
                    <tbody>
                      {consumatoriProprii !== undefined ? (
                        consumatoriProprii.map((i, key) => {
                          return (
                            <div>
                              <TabelDispozitive
                                numar={key}
                                func={setSelecteaza1}
                                imagine={i.imagine}
                                title={i.denumire}
                                pret={i.pret}
                                consum={i.consum}
                                frecventa={i.frecventaUtilizare}
                                date="24 March 2019"
                                culoare={selecteaza1 === key ? "success" : "dark"}
                                project={i.denumire}
                                company={i.denumire}
                                idConfiguratie={i.denumire}
                                defaultChecked
                              />
                            </div>
                          );
                        })
                      ) : (
                        <div></div>
                      )}
                    </tbody>
                  </table>
                </SuiBox>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                {isLoading}

                <SuiBox
                  component="ul"
                  display="flex"
                  flexDirection="column"
                  p={0}
                  m={0}
                  className="container"
                >
                  <table className="main-edit-table" align="right">
                    <thead>
                      <th>Dispozitivele predefinite</th>
                    </thead>
                    <tbody>
                      {predefiniti !== undefined ? (
                        predefiniti.map((i, key) => {
                          return (
                            <div>
                              {i.categorie.toUpperCase() ===
                              consumatoriProprii[selecteaza1].categorie.toUpperCase() ? (
                                <TabelDispozitive
                                  numar={key}
                                  func={setSelecteaza2}
                                  culoare={selecteaza2 === key ? "success" : "dark"}
                                  imagine={i.imagine}
                                  title={i.denumire}
                                  pret={i.pret}
                                  consum={i.consum}
                                  frecventa={i.frecventaUtilizare}
                                  date="24 March 2019"
                                  project={i.denumire}
                                  company={i.denumire}
                                  idConfiguratie={i.denumire}
                                  defaultChecked
                                />
                              ) : (
                                <div></div>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <div></div>
                      )}
                    </tbody>
                  </table>
                </SuiBox>
              </Grid>
            </Grid>
            {categorie !== undefined &&
            consumatoriProprii[selecteaza1] !== undefined &&
            predefiniti[selecteaza2] !== undefined ? (
              <Grid container spacing={3} mt={3}>
                <Grid item xs={12} md={6} lg={6}>
                  <Card className="container2">
                    <SuiBox p={3} ml={20}>
                      <SuiBox
                        component="img"
                        src={consumatoriProprii[selecteaza1].imagine}
                        alt="Product Image"
                        borderRadius="lg"
                        boxShadow="lg"
                        width="200px"
                        height="150px"
                        my={3}
                      />
                      <SuiBox display="flex">
                        <SuiBox mr={1}></SuiBox>
                      </SuiBox>
                    </SuiBox>

                    <SuiBox pl={10} pr={10} pb={2}>
                      <SuiTypography
                        display="block"
                        variant="caption"
                        fontWeight="medium"
                        textColor="secondary"
                      >
                        <h2> Denumire : {consumatoriProprii[selecteaza1].denumire} </h2>
                      </SuiTypography>

                      <br />
                      <SuiTypography
                        display="block"
                        variant="caption"
                        fontWeight="medium"
                        textColor="secondary"
                        style={
                          consumatoriProprii[selecteaza1].pret < predefiniti[selecteaza2].pret
                            ? { color: "green" }
                            : { color: "red" }
                        }
                      >
                        <h2> Pret : {consumatoriProprii[selecteaza1].pret} RON</h2>
                      </SuiTypography>

                      <br />
                      <SuiTypography
                        display="block"
                        variant="caption"
                        fontWeight="medium"
                        textColor="red"
                        style={
                          consumatoriProprii[selecteaza1].consum < predefiniti[selecteaza2].consum
                            ? { color: "green" }
                            : { color: "red" }
                        }
                      >
                        <h2> Consum : {consumatoriProprii[selecteaza1].consum} kwh</h2>
                      </SuiTypography>

                      <SuiTypography
                        mt={3}
                        display="block"
                        variant="caption"
                        fontWeight="medium"
                        textColor="red"
                        style={
                          consumatoriProprii[selecteaza1].consum < predefiniti[selecteaza2].consum
                            ? { color: "green" }
                            : { color: "red" }
                        }
                      ></SuiTypography>
                    </SuiBox>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  <Card className="container2">
                    <SuiBox p={3} ml={20}>
                      <SuiBox
                        component="img"
                        src={predefiniti[selecteaza2].imagine}
                        alt="Product Image"
                        borderRadius="lg"
                        boxShadow="lg"
                        width="200px"
                        height="150px"
                        my={3}
                      />
                      <SuiBox display="flex">
                        <SuiBox mr={1}></SuiBox>
                      </SuiBox>
                    </SuiBox>

                    <SuiBox pl={10} pr={10} pb={2}>
                      <SuiTypography
                        display="block"
                        variant="caption"
                        fontWeight="medium"
                        textColor="secondary"
                      >
                        <h2> Denumire : {predefiniti[selecteaza2].denumire} </h2>
                      </SuiTypography>

                      <br />
                      <SuiTypography
                        display="block"
                        variant="caption"
                        fontWeight="medium"
                        textColor="secondary"
                        style={
                          consumatoriProprii[selecteaza1].pret > predefiniti[selecteaza2].pret
                            ? { color: "green" }
                            : { color: "red" }
                        }
                      >
                        <h2>Pret : {predefiniti[selecteaza2].pret} RON</h2>
                      </SuiTypography>

                      <br />
                      <SuiTypography
                        display="block"
                        variant="caption"
                        fontWeight="medium"
                        textColor="secondary"
                        style={
                          consumatoriProprii[selecteaza1].consum > predefiniti[selecteaza2].consum
                            ? { color: "green" }
                            : { color: "red" }
                        }
                      >
                        <h2>Consum : {predefiniti[selecteaza2].consum} kwh</h2>
                      </SuiTypography>
                    </SuiBox>
                  </Card>
                </Grid>
              </Grid>
            ) : (
              <div></div>
            )}
          </SuiBox>

          {/* initial */}
          <SuiBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} xl={3}>
                <CardConsumCompara
                  title={{ text: "Consumul initial pe zi" }}
                  count={total.toFixed(3)}
                  percentage={{ color: "dark", text: "kwh" }}
                  icon={{ color: "info", component: "paid" }}
                />
              </Grid>
              <Grid item xs={12} sm={6} xl={3}>
                <CardConsumCompara
                  title={{ text: "Consum initial pe saptamana" }}
                  count={(total * 7).toFixed(2)}
                  percentage={{ color: "dark", text: "kwh" }}
                  icon={{ color: "info", component: "public" }}
                />
              </Grid>
              <Grid item xs={12} sm={6} xl={3}>
                <CardConsumCompara
                  title={{ text: "Consum initial pe luna" }}
                  count={(total * 30).toFixed(2)}
                  percentage={{ color: "dark", text: "kwh" }}
                  icon={{ color: "info", component: "public" }}
                />
              </Grid>
              <Grid item xs={12} sm={6} xl={3}>
                <CardConsumCompara
                  title={{ text: "Consum  initial pe an" }}
                  count={(total * 365).toFixed(2)}
                  percentage={{ color: "dark", text: "kwh" }}
                  icon={{ color: "info", component: "public" }}
                />
              </Grid>
            </Grid>
          </SuiBox>
          {/* //  secundar */}

          <SuiBox mb={3}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={3}>
                <CardConsumCompara
                  title={{ text: "Consumul actualizat pe zi" }}
                  count={totalDupa.toFixed(3)}
                  percentage={{ color: "dark", text: "kwh" }}
                  icon={{ color: "info", component: "paid" }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CardConsumCompara
         
                  title={{ text: "Consum actualizat pe saptamana" }}
                  count={(Math.round(totalDupa * 7 * 100) / 100).toFixed(2)}
                  percentage={{ color: "dark", text: "kwh" }}
                  icon={{ color: "info", component: "public" }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CardConsumCompara
                  title={{ text: "Consum actualizat pe luna" }}
                  count={(Math.round(totalDupa * 30 * 100) / 100).toFixed(2)}
                  percentage={{ color: "dark", text: "kwh" }}
                  icon={{ color: "info", component: "public" }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CardConsumCompara
                  title={{ text: "Consum actualizat pe an" }}
                  count={(Math.round(totalDupa * 365 * 100) / 100).toFixed(2)}
                  percentage={{ color: "dark", text: "kwh" }}
                  icon={{ color: "info", component: "public" }}
                />
              </Grid>
            </Grid>
          </SuiBox>
        </SuiBox>
      )}

      <Footer />
    </DashboardLayout>
  );
}

export default Compara;

import { Card, Grid, Icon } from "@mui/material";
import SuiBox from "components/SuiBox";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import TabelDispozitive from "./tabel";
import SuiTypography from "components/SuiTypography";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import CardConsumCompara from "components/Cards/CardConsumCompara";
import Loader from "components/Loader";

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
    try{
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
    }catch(e){
      console.log(e)
    }
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
        <Grid item container direction="row">
          <Icon fontSize="medium" color="inherit">
          arrow_forward
          </Icon>
        <SuiTypography variant="h5" fontWeight="bold"  color="dark"> Introduceti dispozitive in configuratie pentru a putea face comparatia!</SuiTypography>
        </Grid>
      )}

      {isLoading ? (
      <></>
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
                    <thead style={{textAlign:"center"}} className="align-text">
                      <SuiTypography fontWeight="bold">Dispozitivele tale</SuiTypography>
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
                    <thead style={{textAlign:"center"}}>
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
              {/* Grid pentru consumator manual */}
              <Grid item xs={12} lg={6}>
                <Card>
                  <SuiBox p ={2} style={{textAlign:"center"}}>
                  <SuiBox
                       
                        component="img"
                        src={consumatoriProprii[selecteaza1].imagine}
                        alt="Product Image"
                        borderRadius="lg"
                        boxShadow="lg"
                        width="300px"
                        height="250px"
                      
                      />
                  
                  <SuiBox p = {2} style={{textAlign:"center"}}>
                        <h5 style={{ display:"block", fontWeight:"bold"}}> Denumire : {consumatoriProprii[selecteaza1].denumire} </h5>
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
                        <h4 > Pret : {consumatoriProprii[selecteaza1].pret} RON</h4>
                      </SuiTypography>

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
                        <h4> Consum : {consumatoriProprii[selecteaza1].consum} kwh</h4>
                      </SuiTypography>               

                  </SuiBox>
                  </SuiBox>

                </Card>

              </Grid>
              {/* Grid pentru consumator automat */}
              <Grid item xs={12} lg={6}>
                <Card>
                <SuiBox p={2} style={{textAlign:"center"}}>
                <SuiBox
                       component="img"
                        src={predefiniti[selecteaza2].imagine}
                        alt="Product Image"
                        borderRadius="lg"
                        boxShadow="lg"
                       width="300px"
                       height="250px"
                     
                     />
                
                <SuiBox p = {2} style={{textAlign:"center"}}>
                <h5 style={{ display:"block", fontWeight:"bold"}}> Denumire : {predefiniti[selecteaza2].denumire} </h5>
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
                        <h4>Pret : {predefiniti[selecteaza2].pret} RON</h4>
                      </SuiTypography>
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
                        <h4>Consum : {predefiniti[selecteaza2].consum} kwh</h4>
                      </SuiTypography>

                </SuiBox>
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
            <Grid container spacing={2}>
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
            <Grid container spacing={2}>
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
                  count={(totalDupa * 7).toFixed(2)}
                  percentage={{ color: "dark", text: "kwh" }}
                  icon={{ color: "info", component: "public" }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CardConsumCompara
                  title={{ text: "Consum actualizat pe luna" }}
                  count={(totalDupa * 30).toFixed(2)}
                  percentage={{ color: "dark", text: "kwh" }}
                  icon={{ color: "info", component: "public" }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CardConsumCompara
                  title={{ text: "Consum actualizat pe an" }}
                  count={(totalDupa * 365).toFixed(2)}
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

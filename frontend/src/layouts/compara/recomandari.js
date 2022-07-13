import { Card, Grid } from "@mui/material";
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

function Recomandari() {
  const dispatch = useDispatch();

  const consumators = useSelector((state) => state.getConsumators);
  const { errorRegister, loadingRegister, allConsumators } = consumators;

  const userLogin = useSelector((state) => state.userLogin);
  const [consumatoriProprii, setConsumatoriProprii] = useState([]);
  const [predefiniti, setPredefiniti] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selecteaza1, setSelecteaza1] = useState(0);
  const [selecteaza2, setSelecteaza2] = useState(0);
  const [categorie, setCategorie] = useState("");
  const [aleg, setAleg] = useState([]);

  /// DE FACUT DENUMIREA AUTOMATA CNAD APAS PE SELECT SI DAT IN GET DENUMIRE

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
          denumire: consumatoriProprii[selecteaza1].denumire,
        },
        config
      )
      .then(({ data }) => {
        let js = JSON.parse(data["out"][0].replaceAll(`'`, `"`));
        var arr = [];
        console.log(js);
        arr.push(js["rez"]["poz1"]);
        arr.push(js["rez"]["poz2"]);
        arr.push(js["rez"]["poz3"]);
        setAleg(arr);
      });
  };

  useEffect(() => {
    get_recomandari();
  }, [selecteaza1]);

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
            setConsumatoriProprii(r.data.consumatori.filter((x) => x.predefinit == true));
            setCategorie(r.data.consumatori[0].categorie);
            setPredefiniti(rez.data);
            setLoading(false);
          });
      });
  }, [userInfo]);
  return (
    <DashboardLayout>
      <DashboardNavbar />

      {isLoading ? (
        <Bars color="#00BFFF" height={300} width={200} />
      ) : (
        <SuiBox py={3}>
          <SuiBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
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
            </Grid>
            {categorie !== undefined && consumatoriProprii[selecteaza1] !== undefined ? (
              <Grid container spacing={3} mt={3}>
                {aleg.map((item, idx) => {
                  return (
                    
                    <Grid item xs={12} md={6} lg={4}>
                      
                      <Card className="container2" ml={3}>
                        <SuiBox p={2} ml={3}>
                          <SuiBox
                            component="img"
                            src={item.img}
                            alt="Product Image"
                            borderRadius="lg"
                            boxShadow="lg"
                            width="300px"
                            height="250px"
                            my={3}
                          />
                          <SuiBox display="flex" >
                            <SuiBox  mt={1}>
                              <SuiTypography
                                display="block"
                                variant="caption"
                                fontWeight="medium"
                                textColor="secondary"
                              >
                                <h3> {item.denumire} </h3>
                              </SuiTypography>
                              <SuiTypography
                                display="block"
                                variant="caption"
                                fontWeight="medium"
                                textColor="secondary"
                                mt={2}
                              >
                                <h3> Pret: {item.pret} </h3>
                              </SuiTypography>

                              <SuiTypography
                                display="block"
                                variant="caption"
                                fontWeight="medium"
                                textColor="secondary"
                              >
                                <h3> Consum: {item.consum} </h3>
                              </SuiTypography>
                            </SuiBox>
                          </SuiBox>
                        </SuiBox>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <div></div>
            )}
          </SuiBox>
        </SuiBox>
      )}

      <Footer />
    </DashboardLayout>
  );
}

export default Recomandari;
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
import { Oval } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-js-loader";
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

    try{

 
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    if (consumatoriProprii[selecteaza1].predefinit == true)
    {
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
        console.log(js)
        arr.push(js["rez"]["poz1"]);
        arr.push(js["rez"]["poz2"]);
        arr.push(js["rez"]["poz3"]);
        setAleg(arr);
      });
    }
    else{
console.log("Este predefinit")
console.log(consumatoriProprii[selecteaza1])
var arr = [];
var nr = 0;
      predefiniti.forEach((p)=>{
       
        if (p.categorie.toUpperCase() ==consumatoriProprii[selecteaza1].categorie.toUpperCase() )
        {
          if(( p.consum <consumatoriProprii[selecteaza1].consum && nr <3 ) ){
            var ca = {
              "pret":p.pret,
              "consum":p.consum,
              "denumire":p.denumire,
              "img":p.imagine
            }
            console.log(ca)
            console.log("--------------------------------------")
            arr.push(ca);
      
            
        
            
            nr = nr +1
          }


        }
      })
      
     

      if (nr == 0){
        predefiniti.forEach((p)=>{
       
          if (p.categorie.toUpperCase() ==consumatoriProprii[selecteaza1].categorie.toUpperCase() )
          {
            if((nr<3) ){
              var ca = {
                "pret":p.pret,
                "consum":p.consum,
                "denumire":p.denumire,
                "img":p.imagine
              }
              console.log(ca)
              console.log("--------------------------------------")
              arr.push(ca);
        
              
          
              
              nr = nr +1
            }
  
  
          }
        })
      
      }
      setAleg(arr);
    }
  }catch(e){
    console.log(e)
  }
 
  };

  useEffect(() => {
    try{
      get_recomandari();
    }catch(e){

    }
 
  }, [selecteaza1]);

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
            //.filter((x) => x.predefinit == true)
            setConsumatoriProprii(r.data.consumatori);
            // setConsumatoriProprii(r.data.consumatori);
            setCategorie(r.data.consumatori[0].categorie);
            setPredefiniti(rez.data);
            setLoading(false);
          });
      });
    }
    catch(e){
      
    }
  }, [userInfo]);
  return (
    <DashboardLayout>
      <DashboardNavbar />

      

      {isLoading ? (
        <Grid item container direction="row">
        <Icon fontSize="medium" color="dark">
        arrow_forward
        </Icon>
                <SuiTypography
                  verticalAlign="middle"
                  variant="body1"
                  fontWeight="bold"
                  ml={1}
                  textGradient
                >
                  {" "}
                  Introduceti dispozitive în mod automat in configuratie pentru a putea primi recomadări !
                </SuiTypography>{" "}
              </Grid>
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
                    <thead style={{textAlign:"center"}}>
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
              <Grid container spacing={4} mt={1}>
                {aleg.map((item, idx) => {
                  return (
                    <Grid
                      direction="column"
                      alignItems="center"
                      justify="center"
                      item
                      xs={12}
                      lg={4}
                    >
                      <Card ml={1}>
                        <SuiBox p={2}  style={{textAlign:"center"}}>
                          <SuiBox
                            component="img"
                            src={item.img}
                            alt="Product Image"
                            borderRadius="lg"
                            boxShadow="lg"
                            width="300px"
                        height="250px"
                          />
                          <SuiBox display="flex">
                            <SuiBox >
                              <SuiTypography
                                display="block"
                                variant="caption"
                                fontWeight="medium"
                                textColor="secondary"
                              >
                                <SuiTypography variant="h5"> {item.denumire} </SuiTypography>

                                
                              </SuiTypography>
                              
                              <SuiTypography
                                display="block"
                                variant="button"
                                fontWeight="medium"
                                textColor="secondary"
                                mt={2}
                              >
                                <SuiTypography variant="h5"> Pret: {item.pret} RON </SuiTypography>
                              </SuiTypography>

                              <SuiTypography
                                display="block"
                                variant="caption"
                                fontWeight="medium"
                                textColor="dark"
                              >
                                <SuiTypography variant="h5"> Consum: {item.consum} kWh </SuiTypography>
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

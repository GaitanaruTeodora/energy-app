import { Grid } from "@mui/material";
import axios from "axios";
import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import selectData from "layouts/configuratie/BasicInfo/data/selectData";
import SuiTypography from "components/SuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import Stire from "./stire";

function Index() {
  const [articles, setArticles] = useState([]);
  const curent = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); 
    var yyyy = today.getFullYear();

    today = dd + "." + mm + "." + yyyy;
    return today;
  };
  const last = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth()).padStart(2, "0"); 
    var yyyy = today.getFullYear();

    today = dd + "." + mm + "." + yyyy;
    return today;
  };
  useEffect(() => {
    const from = last();
    const to = curent();
    var cuvant = "energie";
    const url = `https://newsapi.org/v2/everything?q=${cuvant}?&from=${from}&to=${to}&sortBy=publishedAt&apiKey=c55d47c431f543bf8294c2bc9fb398dd`;
    // const url = 'https://newsapi.org/v2/everything?' +
    // `q=${cuvant}&` +
    // 'from=2022-05-10&' +
    // 'to=2022-07-10&' +
    // 'sortBy=popularity&' +
    // 'apiKey=c55d47c431f543bf8294c2bc9fb398dd'
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    axios.get(url,config).then((r) => {
      console.log(r)
      setArticles(r.data.articles);
    
    
    });
    
  }, []);

  // useEffect(() => {
  //   const from = last();
  //   const to = curent();
  //   var cuvant = "consum energetic";
  //   const url = `https://newsapi.org/v2/everything?q=${cuvant}?&from=${from}&to=${to}&sortBy=publishedAt&apiKey=812bd630852345048012e62647076ec7`;
  //   const config = {
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //   };
  //   axios.get(url,config).then((r) => {setArticles(r.data.articles);});
  // }, [cautare]);

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <SuiBox
        display="flex"
        flexDirection="column"
        justifyContent="center"
        height="100%"
        mb={5}
        mt={5}
       
      >
        <SuiBox mb={1} style={{textAlign: "center"}} lineHeight={0} >
          <h1>
            Stiri despre domeniul energetic
          </h1>
        </SuiBox >
        <SuiBox mt={2.5} style={{textAlign: "center"}}> 
          <h4>
            Data: {last()} - {curent()}
          </h4>
        </SuiBox>
      </SuiBox>


      <Grid container spacing={3} mt={0}>
        {articles.length > 0 ? (
          articles.map((article, idx) => {
            return (
              article.title!==null  && article.description!==null ? 
              <Grid item xs={12} lg={4}>
                <Stire
                  titlu={ article.title!==null ? article.title.substring(0, 50) + "..." : 'Undefined'}
                  descriere={article.description!==null ?article.description.substring(0, 100) + "... ": 'Undefined'}
                  url={article.url}
                  img={article.urlToImage}
                  data={article.publishedAt}
                />
              </Grid> : <div></div> 
            );
          })
        ) : (
          <></>
        )}
      </Grid>
    </DashboardLayout>
  );
}

export default Index;

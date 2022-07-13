// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import DespreEnergyApp from "layouts/dashboard/components/DespreEnergyApp";
import SfaturiConsum from "layouts/dashboard/components/SfaturiConsum";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

import CanvasJSReact from '../../chart/canvasjs.react';
import { listConfigurations } from "actions/configurationAction";
import Modal from "./components/Modal";
import { Icon } from "@mui/material";
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Dashboard() {
  const { size } = typography;
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  const[total,setTotal] = useState(0)
  const consumators = useSelector((state) => state.getConsumators);
  const dispatch = useDispatch()
  const listConfig = useSelector((state) => state.listConfigurations);
  const { allConfiguration } = listConfig;
  const [denumireConf, setDenumireConf] = useState("")
  const [out,setOut] = useState({})
  const timp = [{"valoare":1, "denumire":'zi'},{"valoare":7, "denumire":'saptamana'},{"valoare":30, "denumire":'luna'},{"valoare":365, "denumire":'an'}]
  const { errorRegister, loadingRegister, allConsumators } = consumators;
  useEffect(()=>{
    if (userInfo === null) {
    } else {
     
      dispatch(listConfigurations(userInfo.id))
      // setDenumireConf(allConsumators.configuraties.indexOf(0).id)
      
    }

   
  },[userInfo])

  
  const [totalConsum,setTotalConsum] = useState(0)
  const [opInterval,setOpInterval] = useState(1)

  useEffect(()=>{
    console.log(opInterval)
  },[opInterval])
  var options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Consumul procentual pe camere"
    },
    data: [{
      type: "pie",
      startAngle: 75,
      toolTipContent: "<b>{label}</b>: {y}%",
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} - {y}%",
      dataPoints: [
        { y: Math.round(out[0]/totalConsum*100 * 100) / 100 , label: "Bucatarie" },
        { y:Math.round(out[1]/totalConsum*100 * 100) / 100, label: "Living" },
        { y:Math.round(out[2]/totalConsum*100 * 100) / 100, label: "Dormitor" },
        { y: Math.round(out[3]/totalConsum*100 * 100) / 100, label: "Baie" },
      ]
    }]
  }


  var optionsBar = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Consum total pe camere (kwh)"
    },
    data: [{				
              type: "column",
              indexLabel: "{label} - {y} kwh",
              dataPoints: [
                  { label: "Bucatarie",  y: Math.round(out[0]*opInterval) },
                  { label: "Living", y:  Math.round(out[1]*opInterval)   },
                  { label: "Dormitor", y:  Math.round(out[2]*opInterval)   },
                  { label: "Baie",  y:  Math.round(out[3]*opInterval)   },
               
              ]
     }]
 }

  useEffect(()=>{
    try{
      if ( allConfiguration !== undefined)
      {
       setDenumireConf(allConfiguration.configuraties[0].id)
      }
    }
    catch(e){

    }
    
  },[allConfiguration])

    useEffect(()=>{
      if (userInfo !==undefined &&denumireConf !=="" )
      {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        try{
   axios.get(
          `http://localhost:3000/api/camere/${userInfo.id}/${denumireConf}`,
    
          config
        ).then((r)=>{
          
          const rez = r.data.total
          const total = rez[0]+rez[1]+rez[2]+rez[3]
          setOut(rez)
          setTotalConsum(total)
        
        })
        }catch(e){
          
        }
        
      }
  
      


    },[denumireConf])

  useEffect(()=>{
    if (userInfo !==undefined)
    {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      try{
 axios.get(
        `http://localhost:3000/api/configuratii/total/${userInfo.id}`,
  
        config
      ).then((r)=>{
        setTotal(r.data.total)
        console.log(r)
      })
      }catch(e){
        
      }
      
    }

    


  },[userInfo])

  return (
    <DashboardLayout>
      <DashboardNavbar />

  
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Consumul total pe zi" }}
                count={totalConsum.toFixed(2)}
                percentage={{ color: "dark", text: "kwh" }}
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Consum pe luna" }}
                count={(totalConsum*30).toFixed(2)}
                percentage={{ color: "dark", text: "kwh" }}
                icon={{ color: "info", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Consum pe an" }}
                count={(totalConsum*365).toFixed(2)}
                percentage={{ color: "dark", text: "kwh" }}
                icon={{ color: "info", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Cheltuieli cu energia" }}
                count={(total*30).toFixed(2)}
                percentage={{ color: "dark", text: "RON" }}
                icon={{ color: "info", component: "public" }}
              />
            </Grid>

            
          </Grid>
        </SuiBox>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <DespreEnergyApp />
            </Grid>
            <Grid item xs={12} lg={5}>
              <SfaturiConsum />
            </Grid>
            
          </Grid>
        </SuiBox>
        <Grid>

          
        </Grid>
      <Grid >


<Grid item xs={12} lg={6}>


</Grid>

<SuiBox mb={3}>
          {denumireConf == "" ?  <p></p> :  <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
            <SuiBox mb={3} >
  {denumireConf == "" ? <p></p> :   <Grid item xs={12} sm={6}>
          <SuiBox mb={1} ml={0.5} lineHeight={0} display="block">
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
                textTransform="capitalize"
              >
                Alege configuratia
              </SuiTypography>
            </SuiBox>
            {/* <SuiSelect placeholder="UM" options={selectData.um}  /> */}
           
            <select 
            
              style={{ width:"210px", height:"40px" , padding:"5px", borderRadius: '0.5em', opacity:"0.5" }} value={denumireConf} onChange={(e)=>{setDenumireConf(e.target.value); console.log(e.target) }} class="form-select" aria-label="Default select example">
  
              {allConfiguration!== undefined ? allConfiguration.configuraties.map((c)=>{
              return <option value={c.id}>{c.denumire}</option>

              }):<p></p>}

          </select>
          </Grid>}
      
        </SuiBox>
            </Grid>
            <Grid item xs={12} lg={7}>
            <SuiBox mb={3} >
  {denumireConf == "" ? <p></p> :   <Grid item xs={12} sm={6}>
          <SuiBox mb={1} ml={0.5} lineHeight={0} display="block">
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
                textTransform="capitalize"
              >
                Alege intervalul
              </SuiTypography>
            </SuiBox>
           
            <select 
            
              style={{ width:"210px", height:"40px" , padding:"5px", borderRadius: '0.5em', opacity:"0.5" }} value={opInterval} onChange={(e)=>{setOpInterval(e.target.value); console.log(e.target) }} class="form-select" aria-label="Default select example">
  
              {allConfiguration!== undefined ? timp.map((c)=>{
              return <option value={c.valoare}>{c.denumire}</option>

              }):<p></p>}

          </select>
          </Grid>}
      
        </SuiBox>
              
            </Grid>
          </Grid>}
        

        </SuiBox>

      </Grid>
        <SuiBox mb={3} >
        
          {totalConsum == 0? 
          <Grid item container direction="row">
          <Icon fontSize="medium" color="info">
            bolt
          </Icon>
          <SuiTypography
          verticalAlign= 'middle'
          variant="body1"
          fontWeight="bold"

          ml={1}
          
          textGradient
          > Introduceti dispozitive in configuratie pentru a putea vizualiza grafice de consum !</SuiTypography> </Grid> : denumireConf == "" ?  <p></p> :  <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
            <CanvasJSChart options = {optionsBar}
  
        />
            </Grid>
            <Grid item xs={12} lg={7}>
            <CanvasJSChart options = {options}
            /* onRef = {ref => this.chart = ref} */
        />
              
            </Grid>
          </Grid>}
        

        </SuiBox>
        <Grid container spacing={3}>
       
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;

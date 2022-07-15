
import { useLocation } from "react-router-dom";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import emailjs from '@emailjs/browser';
import energyImage from "assets/images/illustrations/energySignIn.jpg";
import axios from "axios";
import { useState } from "react";
import { useToast } from "react-toastify";
import { ToastContainer, toast } from 'react-toastify';
function ResetareParola() {
    const cod = useLocation().pathname.split("/").slice(1)[1];
    const [parola,setParola] = useState("")
    const modifica = async()=>{
      const formData = {
       
        cod:cod.toString(),
        parola:parola
       
       
    }
    
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
   axios.put(`http://localhost:3000/api/verifica`,formData,config).then((r)=>{
    toast.success(r.data.mes, {
      position: "top-right",
      autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,
      draggable: true, progress: undefined});
    setParola("")
   })
    }
  return (
    <CoverLayout
    title="Reseteaza parola"
    description=""
    image={energyImage}
    top={30}
  >
    <SuiBox component="form" role="form">
      <SuiBox mb={2} lineHeight={1.25}>
        <SuiBox mb={1} ml={0.5}>
          <SuiTypography component="label" variant="caption" fontWeight="bold">
            Parola noua
          </SuiTypography>
        </SuiBox>
        <SuiInput type="password" placeholder="Enter your password" value={parola} onChange={(e)=>setParola(e.target.value)} />
      </SuiBox>
      <SuiBox mt={4} mb={1}>
        <SuiButton variant="gradient" buttonColor="info" fullWidth onClick={()=>{modifica()}} >
          reset
        </SuiButton>
        <ToastContainer  style={{fontSize:16,fontFamily:"Verdana, Arial, Tahoma, Serif"}}  position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} 
          closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover  />
      </SuiBox>
    </SuiBox>
  </CoverLayout>
  )
}

export default ResetareParola
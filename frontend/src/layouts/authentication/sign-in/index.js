import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from 'styled-components'
// react-router-dom components
import { useNavigate, Link } from "react-router-dom";
import WebFont from 'webfontloader';

// Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import energyImage from "assets/images/illustrations/energySignIn.jpg";
import { login } from "actions/userActions";
import axios from "axios";

function SignIn() {
  // LOGIN
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  // useDispatch
  const dispach = useDispatch();
  const navigate = useNavigate();
  // useSelector
  const userLogin = useSelector((state) => state.userLogin);
  const { laoding, error, userInfo } = userLogin;

  useEffect(() => {
    try{ 
      if (userInfo.email !==undefined) {
      navigate("/dashboard");
    }}
    catch(e){
    }

  }, [userInfo]);

  const submitFormHandler = (e) => {
    e.preventDefault();
    if (email == '')
    {
      toast.error("Campul Email necesita completare!", {
        position: "top-right",
        autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,
        draggable: true, progress: undefined});
    }
    else if (parola == '')
    {
      toast.error("Campul Password necesita completare!", {
        position: "top-right",
        autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,
        draggable: true, progress: undefined});
    }
    else{
      dispach(login(email, parola));
    }
    
 
  };

  useEffect(()=>{
    try{
      if (error.response){
        toast.error(error.response, {
        position: "top-right",
        autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,
        draggable: true, progress: undefined});
      }
    }catch(e){
    }
  },[error])



  return (
    
    <CoverLayout
      title="Bine ai revenit!"
      description="Introdu email-ul și parola pentru a te autentifica!"
      image={energyImage}
    >
      <SuiBox component="form" role="form">
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SuiTypography>
          </SuiBox>
          <SuiInput value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
        </SuiBox>
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Parola
            </SuiTypography>
          </SuiBox>
          <SuiInput value={parola} onChange={(e) => { setParola(e.target.value);}} type="password" placeholder="Parola"/>
        </SuiBox>
        
        <SuiBox >
          <SuiTypography variant="button" color="text" fontWeight="regular">
             Ai uitat parola?{" "}
            <SuiTypography
              component={Link}
              to="/authentication/reset-password"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Reseteaza parola
            </SuiTypography>
          </SuiTypography>
        </SuiBox>


        <SuiBox mt={4} mb={1}>
          <SuiButton onClick={submitFormHandler} variant="gradient" color="info" fullWidth>
            sign in
          </SuiButton>
          <ToastContainer  style={{fontSize:16,fontFamily:"Verdana, Arial, Tahoma, Serif"}}  position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} 
          closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover  />
        </SuiBox>
        <SuiBox mt={3} textAlign="center">
          <SuiTypography variant="button" color="text" fontWeight="regular">
            Nu aveti creat un cont?{" "}
            <SuiTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SuiTypography>
          </SuiTypography>
        </SuiBox>

        

      </SuiBox>
    </CoverLayout>
  );
}

export default SignIn;

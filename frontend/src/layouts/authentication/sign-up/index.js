import { useEffect, useState } from "react";
import { register, login } from "actions/userActions";
// react-router-dom components
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import { ToastContainer, toast } from 'react-toastify';
// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";


import "react-toastify/dist/ReactToastify.css";
// Images
import imageSignUp from "assets/images/SignIn.jpg";
import * as Yup from "yup";

import { Formik, useField,Field } from "formik";
import TextField from "layouts/configuratii/components/TextField";
import axios from "axios";
import CheckField from "components/CheckField";

const MySpecialField = ({ field }) => {
  return (
    <label className="text-gray-500 font-bold">
      <input {...field} className="mr-2 leading-tight" type="checkbox" />
      <span className="text-sm">Accept Terms</span>
    </label>
  );
};





function SignUp() {
  const [agreement, setAgremment] = useState(true);
  const [name, setName] = useState("");
  const [prenume, setPrenume] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { errorRegister, loadingRegister, userR } = userRegister;
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  const notify = (message) => toast(message);

  const handleSetAgremment = () => setAgremment(!agreement);
  
  const submitRegister = (e, nume, prenume, email, password) => {
    e.preventDefault();
    console.log(email)
    axios.get(`http://localhost:3000/api/verificaEmail/${email}`).then(
      (r)=>
      {
        
      r.data.msg  == 'Email-ul a fost deja folosit!' ?  toast.error("Email-ul este deja folosit! Introduceti altul", {
        position: "top-right",
        autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,
        draggable: true, progress: undefined}) :
        dispatch(register(nume, prenume, email, password)).then((response) => {
          dispatch(login(email, password));
        });
      
      }
      
      )




  };

  useEffect(() => {
    if (userInfo) {
      console.log("exist");

      navigate("/dashboard");
    }
    if (errorRegister) {
      notify(userR);
    }
  }, [userInfo, errorRegister]);

  const registerValidate = Yup.object().shape({
    nume: Yup.string().min(2, "Introduceti cel putin 3 caractere").required('Acest camp necesita completare'),
    prenume: Yup.string().min(2, "Introduceti cel putin 3 caractere").required('Acest camp necesita completare'),
    email: Yup.string().email("Email inavalid").required("Acest camp necesita completare"),
    parola: Yup.string()
    .required("Acest camp necesita completare")
    .min(6, "Parola este prea scurta - introduceti cel putin 6 caractere"),
    acceptTerms: Yup.bool().oneOf([true], 'Trebuie sa accepti termenii si conditiile')
  })

 
  return (
    <Formik
    initialValues={{
      nume:'',
      prenume:'',
      email:'',
      parola:'',
      acceptTerms:true,
    }}
    validationSchema={registerValidate}
   
    >
      {formik => (
    <BasicLayout
      title="Bun venit pe Energy App!"
      image={imageSignUp}
    >
      <Card>
        <SuiBox mb={-3} p={2} textAlign="center">
          <SuiTypography variant="medium" fontWeight="medium">
            Înregistrare
          </SuiTypography>
        </SuiBox>
        <SuiBox pb={3} px={3}>
          <SuiBox component="form" role="form">
            <SuiBox mb={-2}>
              <TextField
                name="nume"
                placeholder="Nume"
                type="text"
                // value={name}
                // onChange={(e) => {
                //   setName(e.target.value);
                // }}
              />
            </SuiBox>
            <SuiBox  mb={-2}>
              <TextField
              
                placeholder="Prenume"
                name="prenume"
                // value={prenume}
                // onChange={(e) => {
                //   setPrenume(e.target.value);
                // }}
              />
            </SuiBox>
            <SuiBox mb={-2}>
              <TextField
                type="email"
                placeholder="Email"
                name="email"
                // value={email}
                // onChange={(e) => {
                //   setEmail(e.target.value);
                // }}
              />
            </SuiBox>
            <SuiBox mb={2}>
              <TextField
                type="password"
                placeholder="Parola"
                name="parola"
                // value={password}
                // onChange={(e) => {
                //   setPassword(e.target.value);
                // }}
              />
            </SuiBox>
           
           

            <div className="space-x-4 flex content-center justify-center">
                             
                < CheckField />
                </div>

           
            <SuiBox mt={4} mb={1}>
              <SuiButton type="submit" variant="gradient" color="dark" fullWidth disabled={!(formik.isValid && formik.dirty)} onClick={(e)=>{submitRegister(e,formik.values.nume, formik.values.prenume,formik.values.email, formik.values.parola)}}>
                sign up
              </SuiButton>
              <ToastContainer  style={{fontSize:16,fontFamily:"Verdana, Arial, Tahoma, Serif"}}  position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} 
          closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover  />
            </SuiBox>
            <SuiBox mt={3} textAlign="center">
              <SuiTypography variant="button" color="text" fontWeight="regular">
                Aveti deja cont?&nbsp;
                <SuiTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SuiTypography>
              </SuiTypography>
            </SuiBox>
          </SuiBox>
        </SuiBox>
        {/* <ToastContainer /> */}
      </Card>
    </BasicLayout>
    )}
    </Formik>
  );
}

export default SignUp;

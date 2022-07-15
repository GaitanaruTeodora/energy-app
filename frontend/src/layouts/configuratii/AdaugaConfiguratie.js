import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

import {addConfiguration} from "actions/configurationAction";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextField from './components/TextField'
const initialFieldValues = {
  id: 0,
  denumire: "",
  furnizorEnergie: "",
  pretEnergie: 0,
}

function AdaugaConfiguratie({setLoad ,setIsClicked}) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [values, setValues] = useState(initialFieldValues);
  const [denumire,setDenumire] = useState("")
  const [furnizor,setFurnizor] = useState("")
  const [pret,setPret] = useState(0)

  const handleSubmit = (e,den,fur,pre)=>{
    e.preventDefault()
    try {
     
      dispatch(addConfiguration(userInfo.id,den,fur,pre))
      setValues(initialFieldValues)

      console.log("Configuratie creata")
      setDenumire("")
      setFurnizor("")
      setPret("")
      setLoad(true)
      const x = setTimeout(function(){setLoad(false) ; setIsClicked(false) }, 100);
    
     } catch (e) {
      console.log("alta eroare")
     }
   
  }

  const adaugaConfig = Yup.object().shape({
      denumire: Yup.string()
      .min(2,'Introduceti minim 2 caractere')
      .max(70, 'Denumirea este prea lunga!')
      .required('Acest camp necesita completare'),
      furnizor: Yup.string()
      .min(2,'Introduceti minim 2 caractere')
      .max(50,'Prea multe caractere introduse!')
      .required('Acest camp necesita completare'),
      pret: Yup.number().positive("Pretul trebuie sa fie o valoare pozitiva").moreThan(0, "Pretul trebuie sa fie mai mare decat 0")
      .required('Acest camp necesita completare'),
  });

  return (
      <Formik
      initialValues={{
        denumire:'',
        furnizor:'',
        pret:'',
      }}
      validationSchema={adaugaConfig}
      >
        {formik => (
          
          <SuiBox mt={3} mb={4}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} lg={12}>
              <Card className="overflow-visible">
                <SuiBox p={2} lineHeight={1}>
                  <SuiTypography variant="body1" fontWeight="bold">
                    Configuratie noua
                  </SuiTypography>
                  <Divider />
              
                <Form autoComplete="off">
                  <SuiBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
                    <TextField label="Denumire configuratie" name='denumire' type="text"  />
                    <TextField label="Furnizor energie" name='furnizor' type="text" />
                    <TextField label='Pret energie' name='pret' type="number"  />
                    <SuiBox display="flex" justifyContent="flex-end" mt={2}>
                        <SuiButton variant="gradient" color="info" disabled={!(formik.isValid && formik.dirty)}  onClick={(e)=>{handleSubmit(e,formik.values.denumire,formik.values.furnizor,formik.values.pret)}}>
                          Adauga
                        </SuiButton>
                    </SuiBox>
                  </SuiBox>
                </Form>
          </SuiBox>
        </Card>
      </Grid>
    </Grid>
  </SuiBox>
        )}
      </Formik>
   
  );
}

export default AdaugaConfiguratie;

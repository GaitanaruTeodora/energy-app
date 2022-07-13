import { ErrorMessage, useField } from "formik";
import 'bootstrap/dist/css/bootstrap.min.css'
import SuiTypography from "components/SuiTypography";
import SuiBox from "components/SuiBox";
import { useState } from "react";

const CheckField = () => {
    const [field] = useField({ name: "acceptTerms", type: "checkbox" });
    const [check,setCheck] = useState(true)
    return (
           <SuiBox display="flex" alignItems="center">
                        
          <div class="form-check">
            <input  {...field} className="mr-2 leading-tight" 
            value="" 
       
            name="acceptTerms"
            defaultChecked={true}
            checked={check}
            onClick={()=>setCheck(!check)}
            class="form-check-input" type="checkbox"  id="defaultCheck1"/>
            <SuiTypography
            variant="button"
            fontWeight="regular"
  
          >
            &nbsp;&nbsp;Sunt de acord cu&nbsp;
          </SuiTypography>
          <SuiTypography component="a" href="#" variant="button" fontWeight="bold" textGradient>
            Termenii si Conditiile
          </SuiTypography>

          <SuiTypography  variant="caption" textColor="error" >
        <ErrorMessage component="div"   name={field.name} >
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
        </ErrorMessage>
        </SuiTypography>
          </div>
  
          </SuiBox> 
    );
  };

export default CheckField;

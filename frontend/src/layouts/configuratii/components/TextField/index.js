import { ErrorMessage, useField } from "formik";
import 'bootstrap/dist/css/bootstrap.min.css'
import SuiTypography from "components/SuiTypography";

function TextField({ label, ...props }) {

  const [field, meta] = useField(props)
  return (
    <div >
      <label htmlFor={field.name}>
      <SuiTypography
          component="label"
          variant="caption"
          fontWeight="bold"
          textTransform="capitalize"
        >
          {label}
        </SuiTypography>

      </label>

   
    <input class="form-control" className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
      {...field} {...props}
      value={field.value}
      autoComplete="off"></input>
      <SuiTypography  variant="caption" textColor="error" >
      <ErrorMessage component="div"   name={field.name} >
      { msg => <div style={{ color: 'red' }}>{msg}</div> }
      </ErrorMessage>
      </SuiTypography>
    
    </div>
  );
}

export default TextField;

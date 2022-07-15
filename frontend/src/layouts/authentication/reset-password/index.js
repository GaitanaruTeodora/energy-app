import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import { ToastContainer, toast } from "react-toastify";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import emailjs from "@emailjs/browser";
import energyImage from "assets/images/illustrations/energySignIn.jpg";
import axios from "axios";
import { useState } from "react";

function Cover() {
  const [email, setEmail] = useState("");
  function encode(str) {
    return str.replace(/./g, function (c) {
      return ("00" + c.charCodeAt(0)).slice(-3);
    });
  }

  const approve = async () => {
    if (email == "") {
      toast.error("Campul Email necesita completare!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    var codcriptat = Date.now().toString() + (Math.floor(Math.random() * 100) + 1).toString();

    const formData = {
      email: email,
      mesaj:
        "Pentru a schimba parola acceseaza acest link http://localhost:3001/resetareParola/" +
        codcriptat +
        "\n",
      cod: codcriptat,
      isValid: true,
    };

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    axios.post(`http://localhost:3000/api/mail`, formData, config).then((r) => {
      if(r.data.mes == "Email invalid"){
      toast.error(r.data.mes, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if(r.data.mes == "Mail-ul a fost trimis") {
      toast.success(r.data.mes, {
        position: "top-right",
        autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,
        draggable: true, progress: undefined});
      }
      setEmail("");
    });
  };

  return (
    <CoverLayout
      title="Reseteaza parola"
      description="Va rugam introduceti adresa de email. O sa primiti un link de resetare parola."
      image={energyImage}
      top={30}
    >
      <SuiBox component="form" role="form">
        <SuiBox mb={2} lineHeight={1.25}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SuiTypography>
          </SuiBox>
          <SuiInput
            type="email"
            placeholder="Introdu adresa de e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </SuiBox>
        <SuiBox mt={4} mb={1}>
          <SuiButton variant="gradient" color="info" fullWidth onClick={() => approve()}>
            RESETEAZA
          </SuiButton>
          <ToastContainer
            style={{ fontSize: 16, fontFamily: "Verdana, Arial, Tahoma, Serif" }}
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </SuiBox>
      </SuiBox>
    </CoverLayout>
  );
}

export default Cover;

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import energyImage from "assets/images/illustrations/energySignIn.jpg";

function Cover() {
  return (
    <CoverLayout
      title="Reset Password"
      description="You will receive an e-mail in maximum 60 seconds"
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
          <SuiInput type="email" placeholder="Enter your e-mail" />
        </SuiBox>
        <SuiBox mt={4} mb={1}>
          <SuiButton variant="gradient" buttonColor="info" fullWidth>
            reset
          </SuiButton>
        </SuiBox>
      </SuiBox>
    </CoverLayout>
  );
}

export default Cover;

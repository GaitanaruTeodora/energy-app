// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import { useState, useCallback, useEffect } from "react";
import ModalSfat from "layouts/dashboard/components/Modal";
// Images
import energySuggestions from "assets/images/energy-suggestions.jpg";

const sfaturi = [
  "Scoate din priză produsele electronice (calculatorul, laptopul, încărcătorul telefonului, sistemul audio, DVD player-ul, televizorul, monitorul) atunci când nu le folosești sau conectează-le la un prelungitor cu mai multe prize și întrerupător.",
  "Nu uita încărătorul telefonului în priză și aparatura electronică în standby; vor consuma multă energie chiar dacă nu le folosești!",
];
function SfaturiConsum() {
  const [sfat, setSfat] = useState(sfaturi[1]);
  const [showModal, setShowModal] = useState(false);

  const shuffle = useCallback(() => {
    const index = Math.floor(Math.random() * sfaturi.length);
    setSfat(sfaturi[index]);
  }, []);

  useEffect(() => {
    const intervalID = setInterval(shuffle, 10000);
    return () => clearInterval(intervalID);
  }, [shuffle]);

  const openModal = () => {
    setShowModal(prev => !prev)
  }

  return (
    <Card sx={{ height: "100%" }}>
      <SuiBox position="relative" height="100%" p={2}>
        <SuiBox
          display="flex"
          flexDirection="column"
          height="100%"
          py={2}
          px={2}
          borderRadius="lg"
          sx={{
            backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
              `${linearGradient(
                rgba(gradients.dark.main, 0.8),
                rgba(gradients.dark.state, 0.8)
              )}, url(${energySuggestions})`,
            backgroundSize: "cover",
          }}
        >
          <SuiBox mb={3} pt={1}>
            <SuiTypography variant="h5" color="white" fontWeight="bold">
              Utilizarea eficienta a energiei
            </SuiTypography>
          </SuiBox>
          <SuiBox mb={2}>
            <SuiTypography variant="body2" color="white">
              {sfat}
            </SuiTypography>
          </SuiBox>
          <SuiTypography
            // onClick={openModal}
            component="a"
            href="#"
            variant="button"
            color="white"
            fontWeight="medium"
            sx={{
              mt: "auto",
              mr: "auto",
              display: "inline-flex",
              alignItems: "center",
              cursor: "pointer",

              "& .material-icons-round": {
                fontSize: "1.125rem",
                transform: `translate(2px, -0.5px)`,
                transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
              },

              "&:hover .material-icons-round, &:focus  .material-icons-round": {
                transform: `translate(6px, -0.5px)`,
              },
            }}
          >
            Read More
            <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
          </SuiTypography>
          
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

export default SfaturiConsum;

// @mui material components
import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import { useState, useCallback, useEffect } from "react";

// Images
import energySuggestions from "assets/images/energy-suggestions.jpg";

const sfaturi = [
  "Scoate din priză produsele electronice (calculatorul, laptopul, încărcătorul telefonului, sistemul audio, DVD player-ul, televizorul, monitorul) atunci când nu le folosești sau conectează-le la un prelungitor cu mai multe prize și întrerupător. Vei consuma cu 10% mai puțină energie electrică.",
  "Nu uita încărătorul telefonului în priză și aparatura electronică în standby; vor consuma multă energie chiar dacă nu le folosești!",
  "Foloseste masina de spălat rufe și pe cea de spălat vase încărcate la mixim. Dacă acest lucru este posibil, folosește operațiunile de economisire a apei.",
  "Folosește vecuri economice. Becul incandescent trebuie înlocuit cu becuri economice, fluorescente, cu halogen de tip LED ce au o durată de viață de 10 ori mai lungă și un consum cu până la 75% mai redus de energie electrică.",
  "Adaptează iluminatul la nevoia de consum. Folosește întrerupătoarele cu variator pentru reglarea intensității luminii, corpuri de iluminat cu senzori de mișcare pentru iluminatul exterior și vei reduce consumul de energie.",
  "Utilizează lumina naturală cât mai mult posibil și nu lăsa lumina aprinsă când nu ai nevoie de ea! Iluminatul locuinței reprezintă 30% din consumul de electricitate.",
  "Optează pentru surse de lumină locale. Poți amplasa în locurile în care îți petreci timpul, pe lângă corpurile de iluminat cu becuri de putere mare, precum lustra amplasată pe tavan și alte surse de iluminat cu putere mai mică. Lampadarele, veiozele sau lămpile sunt o soluție eficientă",

  "Poziționează frigiderul, congelatorul cât mai departe de sursele de căldură ( aragaz, calorifer, cuptor sau razele directe ale soarelui) și nu foarte aproape de perete.",
  "Ține cât mai puțin deschisă ușa firigiderului sau a congelatorului. Nu pune alimente fierbinți în frigider; adu-le la temperatura camerei în mod natural. Dezgeață-l regulat pentru a preveni funcționarea cu depuneri de gheață.",
  "Temperatura recomandată pentru frigider este între 1-4°C, iar pentru congelator, ar trebui reglată la -18°C. O temperatură mai scăzută crește consumul de energie.",
];
function SfaturiConsum() {
  const [sfat, setSfat] = useState(sfaturi[1]);

  const shuffle = useCallback(() => {
    const index = Math.floor(Math.random() * sfaturi.length);
    setSfat(sfaturi[index]);
  }, []);

  useEffect(() => {
    const intervalID = setInterval(shuffle, 10000);
    return () => clearInterval(intervalID);
  }, [shuffle]);

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
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

export default SfaturiConsum;


import Dashboard from "layouts/dashboard";
import Configuratie from "layouts/configuratie"
import Config from "layouts/configuratii/Config"
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import ResetPassword from "layouts/authentication/reset-password"
import Recomandari from "layouts/compara/recomandari";
import IconCompara from "examples/Icons/IconCompara";
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import IconRecommended from "examples/Icons/IconRecommended";
import SpaceShip from "examples/Icons/SpaceShip";
import IconProfile from "examples/Icons/IconProfile";
import Compara from "layouts/compara/compara";
import Stiri from "layouts/stiri"
import IconConfiguratii from "examples/Icons/IconConfiguratii";
import IconStiri from "examples/Icons/IconStiri";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Stiri",
    key: "stiri",
    route: "/stiri",
    icon: <IconStiri size="8px" />,
    component: <Stiri />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Configuratiile mele",
    key: "config",
    route: "/config",
    icon: <IconConfiguratii size="12px" />,
    component: <Config/>,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Compara electrocasnice",
    key: "compara",
    route: "/compara-electrocasnice",
    icon: <IconCompara size="12px" />,
    component: <Compara />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Recomandari",
    key: "recomandari",
    route: "/recomandari-electrocasnice",
    icon: <IconRecommended size="16px" />,
    component: <Recomandari />,
    noCollapse: true,
  },
  
  {
    type: "collapsea",
    name: "Configuratie",
    key: "configuratie",
    route: "/configuratie/:id",
    icon: <Office size="12px" />,
    component: <Configuratie />,
    noCollapse: true,
  },

  { type: "title", title: "Account Pages", key: "account-pages" },

  {
    type: "collapsea",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <IconProfile size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },

  {
    type: "collapsea",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <SpaceShip size="12px" />,
    component: <SignUp />,
    noCollapse: true,
  },
  {
    type: "collapsea",
    name: "Reset Password",
    key: "reset-password",
    route: "/authentication/reset-password",
    icon: <IconConfiguratii size="12px" />,
    component: <ResetPassword/>,
    noCollapse: true,
  },
];

export default routes;

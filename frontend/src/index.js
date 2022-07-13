import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";

import { Provider } from "react-redux";
import { SoftUIControllerProvider } from "context";
import store from "./store/index";


ReactDOM.render(
  <BrowserRouter>
    <SoftUIControllerProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </SoftUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

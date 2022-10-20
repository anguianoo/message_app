import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import actionCable from "actioncable";

const cableApp = {};

cableApp.cable = actionCable.createConsumer(
  "ws://message-app-jb.herokuapp.com/cable"
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App cableApp={cableApp} />
  </BrowserRouter>
);

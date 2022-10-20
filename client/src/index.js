import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import actionCable from "actioncable";

const cableApp = {};

cableApp.cable = actionCable.createConsumer("wss://localhost:5000/cable");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App cableApp={cableApp} />
  </BrowserRouter>
);

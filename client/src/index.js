import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import actionCable from "actioncable";
import { CableContext } from "./components/CableContext";

const cableApp = {};

cableApp.cable = actionCable.createConsumer("ws://localhost:3000/cable");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <CableContext.Provider value={cableApp}>
      <App />
    </CableContext.Provider>
  </BrowserRouter>
);

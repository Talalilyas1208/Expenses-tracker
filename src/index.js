import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";   // ✅ Import BrowserRouter
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Routing from "./Routing";   // ✅ you are using Routing component

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>   {/* ✅ Wrap your Routing here */}
      <Routing />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

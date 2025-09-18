import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import Dashboard from "./Dashboard";
import Priceupdate from "./Priceupdate";
import Previous from "./Previous";
import Calendar123 from "./Compenets/Calendar123";

import Wallets from "./Wallets";
export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
      
        <Route path="/" element={<Dashboard />} />
        <Route path="priceupdate" element={<Priceupdate />} />
        <Route path="previoustransaction" element={<Previous />} />
        <Route path="calendar" element={<Calendar123 />} />
        <Route path="Wallets" element= { <Wallets/>} />
      </Route>
    </Routes>
  );
}
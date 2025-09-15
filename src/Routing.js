import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import Dashboard from "./Dashboard";
import Priceupdate from "./Priceupdate";
import Previous from "./Previous";
import Calendar123 from "./Compenets/Calendar123";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        {/*
          Nested routes. These will render inside the <Outlet />
          component in the App layout.
        */}
        <Route index element={<Dashboard />} />
        <Route path="priceupdate" element={<Priceupdate />} />
        <Route path="previoustransaction" element={<Previous />} />
        <Route path="calendar" element={<Calendar123 />} />
      </Route>
    </Routes>
  );
}
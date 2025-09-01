import  App from "./App";
import { Routes, Route, Navigate } from "react-router-dom";
import Priceupdate from "./Priceupdate";
import Previous from "./Previous";
export default function Routing () {


 






    return (

    <Routes>
      <Route path="/" element={<App />} />
    <Route path="/priceupdate" element={<Priceupdate />} />
      {/* <Route path="/lecturerlogin" element={<Lecturerlogin />} />  */}
<Route path="/previoustransaction" element= {<Previous/>} />

      </Routes>

    )
}
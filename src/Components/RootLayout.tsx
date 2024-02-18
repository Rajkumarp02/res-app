import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { OidcSecure } from "@axa-fr/react-oidc";

const RootLayout  = () => {
  return (
    <div>
      <OidcSecure>
      <Navbar/>
      <Outlet/>
      </OidcSecure>
    </div>
  );
};

export default RootLayout ;

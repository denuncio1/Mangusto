// Este arquivo contém o logo Mangusto para uso em todos os componentes
import React from "react";
import logo from "../../public/mangusto-logo.png";

const MangustoLogo = ({ className = "", ...props }) => (
  <img
    src={logo}
    alt="Mangusto Logo"
    className={`h-14 w-auto ${className}`}
    {...props}
  />
);

export default MangustoLogo;

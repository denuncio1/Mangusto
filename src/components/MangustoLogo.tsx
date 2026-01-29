// Este arquivo contém o logo Mangusto para uso em todos os componentes
import React from "react";

const MangustoLogo = ({ className = "", ...props }) => (
  <img
    src="/mangusto-logo.png"
    alt="Mangusto Logo"
    className={`h-14 w-auto ${className}`}
    {...props}
  />
);

export default MangustoLogo;

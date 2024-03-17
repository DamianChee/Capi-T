import React, { createContext, useContext, useState } from "react";

const LocContext = React.createContext();

export const LocProvider = ({ children }) => {
  const [systems, setSystems] = useState([{ symbol: "X1-M62" }]);

  const addSystem = (system) => {
    setSystems((prevState) => ({ ...prevState, system }));
  };

  const value = {
    systems,
    addSystem,
  };

  return <LocContext.Provider value={value}>{children}</LocContext.Provider>;
};

export const useLoc = () => {
  return useContext(LocContext);
};

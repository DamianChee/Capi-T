import React from "react";
import LoginRegisterPage from "./Login/LoginRegisterPage";
import ContractPage from "./Contract/ContractPage";
import DashboardPage from "./Dashboard/DashboardPage";
import ShipsPage from "./Ships/ShipsPage";

const BodyComponent = () => {
  return (
    <div id="body">
      <div className="component">
        <LoginRegisterPage />
      </div>
      <div className="component">
        <DashboardPage />
      </div>
      <div className="component">
        <ContractPage />
      </div>
      <div className="component">
        <ShipsPage />
      </div>
    </div>
  );
};

export default BodyComponent;

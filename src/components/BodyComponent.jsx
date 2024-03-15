import React from "react";
import LoginRegisterPage from "./Login/LoginRegisterPage";
import ContractPage from "./Contract/ContractPage";
import DashboardPage from "./Dashboard/DashboardPage";
import ShipsPage from "./Ships/ShipsPage";
import SystemsWaypointPage from "./SystemsWaypoint/SystemsWaypointPage";
import ShipyardPage from "./Shipyard/ShipyardPage";
import MarketPage from "./Market/MarketPage";

const BodyComponent = () => {
  return (
    <div id="body">
      <div className="page">
        <LoginRegisterPage />
      </div>
      <div className="page">
        <DashboardPage />
      </div>
      <div className="page">
        <ContractPage />
      </div>
      <div className="page">
        <ShipsPage />
      </div>
      <div className="page">
        <SystemsWaypointPage />
      </div>
      <div className="page">
        <ShipyardPage />
      </div>
      <div className="page">
        <MarketPage />
      </div>
    </div>
  );
};

export default BodyComponent;

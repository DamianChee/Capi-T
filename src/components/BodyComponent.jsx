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
        [ LoginRegister Page ]
        <LoginRegisterPage />
      </div>
      <div className="page">
        [ Dashboard Page ]
        <DashboardPage />
      </div>
      <div className="page">
        [ Contract Page ]
        <ContractPage />
      </div>
      <div className="page">
        [ Ships Page ]
        <ShipsPage />
      </div>
      <div className="page">
        [ SystemsWaypoint Page ]
        <SystemsWaypointPage />
      </div>
      <div className="page">
        [ Shipyard Page ]
        <ShipyardPage />
      </div>
      <div className="page">
        [ Market Page ]
        <MarketPage />
      </div>
    </div>
  );
};

export default BodyComponent;

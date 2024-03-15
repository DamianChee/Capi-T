import React from "react";
import { useAuth } from "../Context/AuthContext";

const ShipyardPage = () => {
  const { isLoggedIn, token } = useAuth();
  const shipyardSearchURL =
    "https://api.spacetraders.io/v2/systems/X1-M62/waypoints?traits=SHIPYARD";
  const shipyardSearchFetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const getShipyards = async () => {
    try {
      const res = await fetch(shipyardSearchURL, shipyardSearchFetchOptions);
      const data = await res.json();
      if (res.ok) {
        console.log(data);
      }
    } catch (error) {
      console.log("an error occurred in getShipyards " + error);
    }
  };

  return (
    <div className="container">
      {isLoggedIn ? (
        <div className="row">
          <button className="col-md-12" onClick={getShipyards}>
            Get Shipyards
          </button>
        </div>
      ) : (
        "[ Shipyard ] Not Logged In Yet"
      )}
    </div>
  );
};

export default ShipyardPage;

import React from "react";
import { useAuth } from "../Context/AuthContext";

const ShipyardPage = () => {
  const { isLoggedIn, token } = useAuth();
  const shipyardSearchURL =
    "https://api.spacetraders.io/v2/systems/X1-MC5/waypoints?traits=SHIPYARD";
  const shipyardSearchFetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const shipyardAvailableShipsURL =
    "https://api.spacetraders.io/v2/systems/X1-MC5/waypoints/X1-MC5-H55/shipyard";
  const shipyardAvailableShipsFetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const purchaseShipURL = "https://api.spacetraders.io/v2/my/ships";
  const purchaseShipFetchOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      shipType: "SHIP_MINING_DRONE",
      waypointSymbol: "X1-MC5-H55",
    }),
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

  const getAvailableShips = async () => {
    try {
      const res = await fetch(
        shipyardAvailableShipsURL,
        shipyardAvailableShipsFetchOptions
      );
      const data = await res.json();
      if (res.ok) {
        console.log(data);
      }
    } catch (error) {
      console.log("an error occurred in getAvailableShips " + error);
    }
  };

  const buyShip = async () => {
    try {
      const res = await fetch(purchaseShipURL, purchaseShipFetchOptions);
      const data = await res.json();
      if (res.ok) {
        console.log(data);
      }
    } catch (error) {
      console.log("an error occurred in buyShip " + error);
    }
  };

  return (
    <div className="container">
      {isLoggedIn ? (
        <div className="row">
          <button className="col-md-4" onClick={getShipyards}>
            Get Shipyards
          </button>
          <button className="col-md-4" onClick={getAvailableShips}>
            Get Available Ships
          </button>
          <button className="col-md-4" onClick={buyShip}>
            Buy Mining Ship
          </button>
        </div>
      ) : (
        "[ Shipyard ] Not Logged In Yet"
      )}
    </div>
  );
};

export default ShipyardPage;

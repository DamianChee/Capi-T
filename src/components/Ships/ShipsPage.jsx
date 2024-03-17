import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import ShipComponent from "./ShipComponent";

const ShipsPage = () => {
  const { isLoggedIn, token } = useAuth();
  const [ships, setShips] = useState([]);

  const shipsURL = "https://api.spacetraders.io/v2/my/ships";
  const shipsFetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const getShips = async () => {
    try {
      const res = await fetch(shipsURL, shipsFetchOptions);
      const data = await res.json();
      if (res.ok) {
        setShips(data.data);
      }
    } catch (error) {
      console.log("an error occurred in getShips " + error);
    }
  };

  const debugPrintShips = () => {
    console.log(ships);
  };

  return (
    <div className="container">
      {isLoggedIn ? (
        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-10 container">
            <div className="row">
              {ships.map((item, idx) => (
                <div className="col-md-4" key={idx}>
                  <ShipComponent props={item} getShips={getShips} />
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-1" />
          {ships.length === 0 ? (
            <button className="col-md-12" onClick={getShips}>
              Get Ships
            </button>
          ) : (
            ""
          )}
        </div>
      ) : (
        "[ Ships ] Not Logged In Yet"
      )}
    </div>
  );
};

export default ShipsPage;

import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import WaypointComponent from "../SystemsWaypoint/WaypointComponent";
import ShipyardComponent from "./ShipyardComponent";

const ShipyardPage = () => {
  const { isLoggedIn, token } = useAuth();
  const [showShipyard, setShowShipyard] = useState(false);
  const [shipyard, setShipyard] = useState({});
  const [shipyards, setShipyards] = useState([{}]);

  const getShipyards = async () => {
    const url =
      "https://api.spacetraders.io/v2/systems/X1-PK72/waypoints?traits=SHIPYARD";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await fetch(url, options);
      const data = await res.json();
      if (res.ok) {
        setShipyards(data.data);
      } else {
        alert(data.error.message);
      }
    } catch (error) {
      console.log("an error occurred in getShipyards " + error);
    }
  };

  const getAvailableShips = async (waypoint = waypointRef.current.value) => {
    const url = `https://api.spacetraders.io/v2/systems/X1-PK72/waypoints/${waypoint}/shipyard`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await fetch(url, options);
      const data = await res.json();
      if (res.ok) {
        setShipyard(data.data);
        setShowShipyard(true);
      }
    } catch (error) {
      console.log("an error occurred in getAvailableShips " + error);
    }
  };

  useEffect(() => {
    getShipyards();
  }, []);

  return (
    <div className="container">
      {isLoggedIn ? (
        <div className="row">
          <div className="col-md-6 container">
            <div className="row">
              <div className="col-md-4">Waypoint</div>
              <div className="col-md-4">Type</div>
              <div className="col-md-4" />
              <div className="col-md-12">
                <br />
              </div>
              {shipyards.map((item, idx) => (
                <WaypointComponent
                  props={item}
                  fn={getAvailableShips}
                  key={idx}
                />
              ))}
            </div>
          </div>
          <div className="col-md-6">
            {showShipyard && <ShipyardComponent props={shipyard} />}
          </div>
        </div>
      ) : (
        "[ Shipyard ] Not Logged In Yet"
      )}
    </div>
  );
};

export default ShipyardPage;

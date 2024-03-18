import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import WaypointComponent from "./WaypointComponent";

const SystemsWaypointPage = () => {
  const { isLoggedIn, token } = useAuth();
  const [typesOfWaypoint, setTypesOfWaypoint] = useState([
    "PLANET",
    "GAS_GIANT",
    "MOON",
    "ORBITAL_STATION",
    "JUMP_GATE",
    "ASTEROID_FIELD",
    "ASTEROID",
    "ENGINEERED_ASTEROID",
    "ASTEROID_BASE",
    "NEBULA",
    "DEBRIS_FIELD",
    "GRAVITY_WELL",
    "ARTIFICIAL_GRAVITY_WELL",
    "FUEL_STATION",
  ]);
  const [selectedTypeOfWaypoint, setSelectedTypeOfWaypoint] = useState("");
  const [waypoints, setWaypoints] = useState([{}]);

  const getWaypoints = async () => {
    // if (!selectedTypeOfWaypoint) return;

    const url = `https://api.spacetraders.io/v2/systems/X1-MC5/waypoints?type=${selectedTypeOfWaypoint}`;
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
        setWaypoints(data.data);
      } else {
        alert(data.error.message);
      }
    } catch (error) {
      console.log("an error occurred in getWaypoints " + error);
    }
  };

  const handleSelectTypeChange = (event) => {
    if (event.target.value === "") return;
    setSelectedTypeOfWaypoint(event.target.value);
  };

  return (
    <div className="container">
      {isLoggedIn ? (
        <div className="row">
          <select className="col-md-6" onChange={handleSelectTypeChange}>
            <option value="">Select a type</option>
            {typesOfWaypoint.map((type, idx) => (
              <option key={idx} value={type}>
                {type}
              </option>
            ))}
          </select>
          <button className="col-md-6" onClick={getWaypoints}>
            Scan
          </button>
          {waypoints.map((item, idx) => (
            <WaypointComponent props={item} key={idx} />
          ))}
          <div className="col-md-12 text-center">
            {!waypoints.length && "No waypoints found!"}
          </div>
        </div>
      ) : (
        "[ Systems & Waypoints ] Not Logged In Yet"
      )}
    </div>
  );
};

export default SystemsWaypointPage;

import React from "react";
import { useAuth } from "../Context/AuthContext";

const SystemsWaypointPage = () => {
  const { isLoggedIn, token } = useAuth();

  const findAsteroidURL =
    "https://api.spacetraders.io/v2/systems/X1-MC5/waypoints?type=ENGINEERED_ASTEROID";
  const findAsteroidFetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const getEngineeredAsteroid = async () => {
    try {
      const res = await fetch(findAsteroidURL, findAsteroidFetchOptions);
      const data = await res.json();
      if (res.ok) {
        console.log(data);
      }
    } catch (error) {
      console.log("an error occurred in getEngineeredAsteroid " + error);
    }
  };

  return (
    <div className="container">
      {isLoggedIn ? (
        <div className="row">
          {" "}
          <button className="col-md-4" onClick={getEngineeredAsteroid}>
            Get Asteroid
          </button>
        </div>
      ) : (
        "[ Systems & Waypoints ] Not Logged In Yet"
      )}
    </div>
  );
};

export default SystemsWaypointPage;

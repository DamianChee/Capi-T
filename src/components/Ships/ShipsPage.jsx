import React, { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import ShipComponent from "./ShipComponent";

const ShipsPage = () => {
  /*****************************************************************************
   *
   * Use States
   *
   ****************************************************************************/

  const { isLoggedIn, token } = useAuth();
  const [ships, setShips] = useState([]);

  /*****************************************************************************
   *
   * URL and Options
   *
   ****************************************************************************/

  /*****************************************************************************
   *
   * Fetches
   *
   ****************************************************************************/

  const getShips = async () => {
    const url = "https://api.spacetraders.io/v2/my/ships";
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
        setShips(data.data);
      } else {
        alert(data.error.message);
      }
    } catch (error) {
      console.log("an error occurred in getShips " + error);
    }
  };

  /*****************************************************************************
   *
   * Input Handlers
   *
   ****************************************************************************/

  /*****************************************************************************
   *
   * useEffect (onMount)
   *
   ****************************************************************************/
  useEffect(() => {
    getShips();
  }, []);
  /*****************************************************************************
   *
   * React stuffs
   *
   ****************************************************************************/

  return (
    <div className="container">
      {isLoggedIn ? (
        <div className="row">
          <div className="col-md-12 container">
            <div className="row">
              {ships.map((item, idx) => (
                <div className="col-md-4" key={idx}>
                  <ShipComponent props={item} getShips={getShips} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        "[ Ships ] Not Logged In Yet"
      )}
    </div>
  );
};

export default ShipsPage;

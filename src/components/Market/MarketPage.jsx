import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import MarketComponent from "./MarketComponent";
import WaypointComponent from "../SystemsWaypoint/WaypointComponent";

const MarketPage = () => {
  /*****************************************************************************
   *
   * Use States
   *
   ****************************************************************************/

  const { isLoggedIn, token } = useAuth();
  const waypointRef = useRef("");
  const [showMarketplace, setShowMarketplace] = useState(false);
  const [market, setMarket] = useState({});
  const [markets, setMarkets] = useState([{}]);

  /*****************************************************************************
   *
   * Fetches
   *
   ****************************************************************************/

  const getMarketplace = async () => {
    const url =
      "https://api.spacetraders.io/v2/systems/X1-PK72/waypoints?traits=MARKETPLACE";
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
        setMarkets(data.data);
      } else {
        alert(data.error.message);
      }
    } catch (error) {
      console.log("an error occurred in getMarketplace " + error);
    }
  };

  const getWaypointMarketplace = async (
    waypoint = waypointRef.current.value
  ) => {
    const url = `https://api.spacetraders.io/v2/systems/X1-PK72/waypoints/${waypoint}/market`;
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
        setMarket(data.data);
        setShowMarketplace(true);
      } else {
        alert(data.error.message);
      }
    } catch (error) {
      console.log("an error occurred in getMarketplace " + error);
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
    getMarketplace();
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
          <div className="col-md-6 container">
            <div className="row">
              <div className="col-md-4">Waypoint</div>
              <div className="col-md-4">Type</div>
              <div className="col-md-4" />
              <div className="col-md-12">
                <br />
              </div>
              {markets.map((item, idx) => (
                <WaypointComponent
                  props={item}
                  fn={getWaypointMarketplace}
                  key={idx}
                />
              ))}
            </div>
          </div>
          <div className="col-md-6">
            {showMarketplace && <MarketComponent props={market} />}
          </div>
        </div>
      ) : (
        "[ Marketplace ] Not Logged In Yet"
      )}
    </div>
  );
};

export default MarketPage;

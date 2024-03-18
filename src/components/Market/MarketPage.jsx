import React, { useRef, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import MarketComponent from "./MarketComponent";

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

  /*****************************************************************************
   *
   * URL and Options
   *
   ****************************************************************************/

  const marketplaceSearchURL =
    "https://api.spacetraders.io/v2/systems/X1-MC5/waypoints?traits=MARKETPLACE";
  const marketplaceSearchFetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const marketplaceWaypointFetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  /*****************************************************************************
   *
   * Fetches
   *
   ****************************************************************************/

  const getMarketplace = async () => {
    try {
      const res = await fetch(
        marketplaceSearchURL,
        marketplaceSearchFetchOptions
      );
      const data = await res.json();
      if (res.ok) {
        console.log(data);
      }
    } catch (error) {
      console.log("an error occurred in getMarketplace " + error);
    }
  };

  const getWaypointMarketplace = async () => {
    try {
      const marketplaceWaypointSearchURL = `https://api.spacetraders.io/v2/systems/X1-MC5/waypoints/${waypointRef.current.value}/market`;

      const res = await fetch(
        marketplaceWaypointSearchURL,
        marketplaceWaypointFetchOptions
      );
      const data = await res.json();
      if (res.ok) {
        setMarket(data.data);
        setShowMarketplace(true);
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

  /*****************************************************************************
   *
   * React stuffs
   *
   ****************************************************************************/

  return (
    <div className="container">
      {isLoggedIn ? (
        <div className="row">
          <button className="col-md-12" onClick={getMarketplace}>
            Get Marketplaces
          </button>
          <input
            type="text"
            ref={waypointRef}
            placeholder="waypoint"
            className="col-md-8"
          />
          <button className="col-md-4" onClick={getWaypointMarketplace}>
            Get Waypoint Marketplace
          </button>
          <div className="col-md-12" />
          <div className="col-md-12">
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

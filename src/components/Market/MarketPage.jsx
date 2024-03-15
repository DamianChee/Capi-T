import React from "react";
import { useAuth } from "../Context/AuthContext";

const MarketPage = () => {
  const { isLoggedIn, token } = useAuth();
  const marketplaceSearchURL =
    "https://api.spacetraders.io/v2/systems/X1-M62/waypoints?traits=MARKETPLACE";
  const marketplaceSearchFetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

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

  return (
    <div className="container">
      {isLoggedIn ? (
        <div className="row">
          <button className="col-md-12" onClick={getMarketplace}>
            Get Marketplaces
          </button>
        </div>
      ) : (
        "[ Marketplace ] Not Logged In Yet"
      )}
    </div>
  );
};

export default MarketPage;

import React from "react";
import { useAuth } from "../Context/AuthContext";

const ShipyardComponent = ({ props }) => {
  const { token, getAgent } = useAuth();

  const buyShip = async (type) => {
    const purchaseShipURL = "https://api.spacetraders.io/v2/my/ships";
    const purchaseShipFetchOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shipType: type,
        waypointSymbol: props.symbol,
      }),
    };

    try {
      const res = await fetch(purchaseShipURL, purchaseShipFetchOptions);
      const data = await res.json();
      if (res.ok) {
        getAgent();
      } else {
        alert(data.error.message);
      }
    } catch (error) {
      console.log("an error occurred in buyShip " + error);
    }
  };

  return (
    <div className="container component">
      <div className="row">
        <div className="col-sm-12">[{props.symbol}]</div>
        <div className="col-sm-1" />
        <div className="col-sm-11 container">
          Ship Type:
          <div className="row">
            <div className="col-sm-1" />
            <div className="col-sm-11 container">
              {props.shipTypes.map((item, idx) => {
                return (
                  <div key={idx} className="row">
                    <div className="col-sm-9">{item.type}</div>
                    <button
                      className="col-sm-3"
                      onClick={() => {
                        buyShip(item.type);
                      }}
                    >
                      Buy
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipyardComponent;

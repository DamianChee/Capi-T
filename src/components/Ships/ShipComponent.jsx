import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";

const ShipComponent = ({ props, getShips }) => {
  const { token } = useAuth();
  const [ship, setShip] = useState({
    symbol: "",
    registration: { name: "", factionSymbol: "", role: "" },
    nav: {
      systemSymbol: "",
      waypointSymbol: "",
      route: {
        destination: { symbol: "", type: "", systemSymbol: "", x: 0, y: 0 },
        origin: { symbol: "", type: "", systemSymbol: "", x: 0, y: 0 },
        departureTime: "",
        arrival: "",
      },
      status: "",
      flightMode: "",
    },
    crew: {
      current: 0,
      required: 0,
      capacity: 0,
      rotation: "",
      morale: 0,
      wages: 0,
    },
    cooldown: {
      shipSymbol: "",
      totalSeconds: 0,
      remainingSeconds: 0,
      expiration: "",
    },
    cargo: {
      capacity: 0,
      units: 0,
      inventory: [{ symbol: "", name: "", description: "", units: 1 }],
    },
    fuel: { current: 0, capacity: 0, consumed: { amount: 0, timestamp: "" } },
  });

  const navigateShipURL = `https://api.spacetraders.io/v2/my/ships/${ship.symbol}/navigate`;
  const navigateShipFetchOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      waypointSymbol: "X1-MC5-AF5D",
    }),
  };

  const navigateShip = async () => {
    try {
      const res = await fetch(navigateShipURL, navigateShipFetchOptions);
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        getShips();
      }
    } catch (error) {
      console.log("an error occurred in navigateShip " + error);
    }
  };

  const orbitShipURL = `https://api.spacetraders.io/v2/my/ships/${ship.symbol}/orbit`;
  const orbitFetchOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const orbitShip = async () => {
    try {
      const res = await fetch(orbitShipURL, orbitFetchOptions);
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        getShips();
      }
    } catch (error) {
      console.log("an error occurred in orbitShip " + error);
    }
  };

  const dockShipURL = `https://api.spacetraders.io/v2/my/ships/${ship.symbol}/dock`;
  const dockFetchOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const dockShip = async () => {
    try {
      const res = await fetch(dockShipURL, dockFetchOptions);
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        getShips();
      }
    } catch (error) {
      console.log("an error occurred in dockShip " + error);
    }
  };

  const extractURL = `https://api.spacetraders.io/v2/my/ships/${ship.symbol}/extract`;
  const extractFetchOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const extractGoods = async () => {
    try {
      const res = await fetch(extractURL, extractFetchOptions);
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        getShips();
      } else {
        console.log(data);
        getShips();
      }
    } catch (error) {
      console.log("an error occurred in extractGoods " + error);
    }
  };

  const refuelURL = `https://api.spacetraders.io/v2/my/ships/${ship.symbol}/refuel`;
  const refuelFetchOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const refuelShip = async () => {
    try {
      const res = await fetch(refuelURL, refuelFetchOptions);
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        getShips();
      }
    } catch (error) {
      console.log("an error occurred in refuelShip " + error);
    }
  };

  useEffect(() => {
    setShip(props);
  });

  return (
    <div className="container component">
      <div className="row">
        <div className="col-sm-12">Name: {ship.symbol}</div>
        <div className="col-sm-12">Status: {ship.nav.status}</div>
        <div className="col-sm-12">Flight mode: {ship.nav.flightMode}</div>
        <div className="col-sm-12">System: {ship.nav.systemSymbol}</div>
        <div className="col-sm-12">Waypoint: {ship.nav.waypointSymbol}</div>
        <div className="col-sm-12">Fuel: {ship.fuel.current}</div>
        <div className="col-sm-12">Fuel capacity: {ship.fuel.capacity}</div>
        <div className="col-sm-12">Cargo capacity: {ship.cargo.capacity}</div>
        <div className="col-sm-12">Cargo:{ship.crew.current}</div>
        <div className="col-sm-12">Crew required: {ship.crew.required}</div>
        <div className="col-sm-12">Crew capacity: {ship.crew.capacity}</div>

        <div className="col-sm-12 container">
          Route:
          <div className="row">
            <div className="col-sm-12">
              Destination: {ship.nav.route.destination.symbol}
            </div>
            <div className="col-sm-12">
              Origin: {ship.nav.route.origin.symbol}
            </div>
            <div className="col-sm-12">
              Departure: {ship.nav.route.departureTime}
            </div>
            <div className="col-sm-12">Arrival: {ship.nav.route.arrival}</div>
          </div>
        </div>
        <div className="col-sm-12">
          Extract Cooldown Time: {ship.cooldown.totalSeconds}
        </div>
        <div className="col-sm-12">
          Extract Cooldown Remaining: {ship.cooldown.remainingSeconds}
        </div>
        <button className="col-sm-12" onClick={navigateShip}>
          Navigate Ship to Asteroid
        </button>
        <button className="col-sm-12" onClick={orbitShip}>
          Send ship to orbit
        </button>
        <button className="col-sm-12" onClick={dockShip}>
          Dock ship
        </button>
        <button className="col-sm-12" onClick={refuelShip}>
          Refuel Ship (Must be docked)
        </button>
        <button className="col-sm-12" onClick={extractGoods}>
          Extract (Must be in orbit)
        </button>
      </div>
    </div>
  );
};

export default ShipComponent;

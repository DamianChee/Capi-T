import React, { useEffect, useState } from "react";

const ShipComponent = ({ props }) => {
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
        <div className="col-sm-12">
          Extract Cooldown Time: {ship.cooldown.totalSeconds}
        </div>
        <div className="col-sm-12">
          Extract Cooldown Remaining: {ship.cooldown.remainingSeconds}
        </div>
      </div>
    </div>
  );
};

export default ShipComponent;

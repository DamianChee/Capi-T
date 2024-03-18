import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../Context/AuthContext";

const ShipComponent = ({ props, getShips }) => {
  /*****************************************************************************
   *
   * Use States
   *
   ****************************************************************************/

  const { token } = useAuth();

  const waypointRef = useRef("");
  const cargoQtyRef = useRef(0);
  const cargoSymbolRef = useRef("");
  const setIntervalIdRef = useRef();

  const [timer, setTimer] = useState(0);
  const [cargoSymbol, setCargoSymbol] = useState("");
  const [cargoQty, setCargoQty] = useState(0);

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

  /*****************************************************************************
   *
   * URL and Options
   *
   ****************************************************************************/

  const navigateShipURL = `https://api.spacetraders.io/v2/my/ships/${ship.symbol}/navigate`;
  const navigateShipFetchOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      waypointSymbol: waypointRef.current.value,
    }),
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

  const dockShipURL = `https://api.spacetraders.io/v2/my/ships/${ship.symbol}/dock`;
  const dockFetchOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
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

  const refuelURL = `https://api.spacetraders.io/v2/my/ships/${ship.symbol}/refuel`;
  const refuelFetchOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const listCargoURL = `https://api.spacetraders.io/v2/my/ships/${ship.symbol}/cargo`;
  const listCargoFetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const sellCargoURL = `https://api.spacetraders.io/v2/my/ships/${ship.symbol}/sell`;
  const sellCargoFetchOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      symbol: cargoSymbol,
      units: cargoQty,
    }),
  };

  /*****************************************************************************
   *
   * Fetches
   *
   ****************************************************************************/

  const navigateShip = async () => {
    try {
      const res = await fetch(navigateShipURL, navigateShipFetchOptions);
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        getShips();
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.log("an error occurred in navigateShip " + error);
    }
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

  const extractGoods = async () => {
    try {
      const res = await fetch(extractURL, extractFetchOptions);
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        getShips();
      } else {
        console.log(data.error.message);
        getShips();
      }
    } catch (error) {
      console.log("an error occurred in extractGoods " + error);
    }
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

  const listCargo = async () => {
    try {
      const res = await fetch(listCargoURL, listCargoFetchOptions);
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        getShips();
      }
    } catch (error) {
      console.log("an error occurred in listCargo " + error);
    }
  };

  const sellCargo = async () => {
    if (cargoSymbolRef.current.value === "") return;
    if (!parseInt(cargoQtyRef.current.value)) return;

    try {
      const res = await fetch(sellCargoURL, sellCargoFetchOptions);
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        getShips();
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.log("an error occurred in sellCargo " + error);
    }
  };

  /*****************************************************************************
   *
   * Input Handlers
   *
   ****************************************************************************/

  const handleSelectCargoSymbol = (event) => {
    setCargoSymbol(event.target.value);
    generateQtyOptions();
  };

  const handleSelectCargoQty = (event) => {
    setCargoQty(event.target.value);
  };

  // const handleSelectCargoChange = (event) => {
  //   if (event.target.value === "") {
  //     setSelectedCargo({});
  //     return;
  //   }
  //   const selectedSymbol = event.target.value;
  //   const selectedCargo = cargo.find(
  //     (cargo) => cargo.symbol === selectedSymbol
  //   );

  //   setSelectedCargo(selectedCargo);
  // };

  const generateQtyOptions = () => {
    let qty = [];

    const selectedCargo = ship.cargo.inventory.find(
      (cargo) => cargo.symbol === cargoSymbol
    );
    if (selectedCargo) {
      for (let i = 1; i <= selectedCargo.units; ++i) {
        qty.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }
    }
    return qty;
  };

  /*****************************************************************************
   *
   * useEffect (onMount)
   *
   ****************************************************************************/

  useEffect(() => {
    setShip(props);
  });

  /*****************************************************************************
   *
   * React stuffs
   *
   ****************************************************************************/
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
        <div className="col-sm-12">Cargo: {ship.cargo.units}</div>
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
        <div className="col-sm-12" />
        <input
          type="text"
          ref={waypointRef}
          placeholder={ship.nav.waypointSymbol}
          defaultValue={ship.nav.waypointSymbol}
        />
        <button className="col-sm-12" onClick={navigateShip}>
          Travel
        </button>
        <div className="col-sm-12" />
        <button className="col-sm-12" onClick={orbitShip}>
          Send ship to orbit
        </button>
        <div className="col-sm-12" />
        <button className="col-sm-12" onClick={dockShip}>
          Dock ship
        </button>
        <div className="col-sm-12" />
        <button className="col-sm-12" onClick={refuelShip}>
          Refuel Ship (Must be docked)
        </button>
        <div className="col-sm-12" />
        <button className="col-sm-12" onClick={extractGoods}>
          Extract (Must be in orbit)
        </button>
        <div className="col-sm-12" />
        <button className="col-sm-12" onClick={listCargo}>
          List Cargo
        </button>

        <select className="col-md-8" onChange={handleSelectCargoSymbol}>
          <option value="">Select cargo to sell</option>
          {ship.cargo.inventory.map((item, idx) => (
            <option key={idx} value={item.symbol}>
              {item.name}
            </option>
          ))}
        </select>

        <select className="col-md-4" onChange={handleSelectCargoQty}>
          <option value="">Qty</option>
          {generateQtyOptions()}
        </select>

        <button className="col-sm-12" onClick={sellCargo}>
          Sell Cargo
        </button>
      </div>
    </div>
  );
};

export default ShipComponent;

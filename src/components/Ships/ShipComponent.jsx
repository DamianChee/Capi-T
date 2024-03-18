import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../Context/AuthContext";

const ShipComponent = ({ props, getShips }) => {
  /*****************************************************************************
   *
   * Use States
   *
   ****************************************************************************/

  const { token, getAgent } = useAuth();

  const waypointRef = useRef("");

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

  /*****************************************************************************
   *
   * Fetches
   *
   ****************************************************************************/

  const getShip = async () => {
    const url = `https://api.spacetraders.io/v2/my/ships/${shipSymbol}`;
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
        setShip(data.data);
      } else {
        alert(data.error.message);
      }
    } catch (error) {
      console.log("an error occurred in navigateShip " + error);
    }
  };

  const navigateShip = async () => {
    const url = `https://api.spacetraders.io/v2/my/ships/${ship.symbol}/navigate`;
    const options = {
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

    try {
      const res = await fetch(url, options);
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        getShips();
      } else {
        alert(data.error.message);
      }
    } catch (error) {
      console.log("an error occurred in navigateShip " + error);
    }
  };

  const orbitShip = async () => {
    const url = `https://api.spacetraders.io/v2/my/ships/${ship.symbol}/orbit`;
    const options = {
      method: "POST",
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
        getShips();
      } else {
        alert(data.error.message);
      }
    } catch (error) {
      console.log("an error occurred in orbitShip " + error);
    }
  };

  const dockShip = async () => {
    const url = `https://api.spacetraders.io/v2/my/ships/${ship.symbol}/dock`;
    const options = {
      method: "POST",
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
        getShips();
      } else {
        alert(data.error.message);
      }
    } catch (error) {
      console.log("an error occurred in dockShip " + error);
    }
  };

  const extractGoods = async () => {
    const url = `https://api.spacetraders.io/v2/my/ships/${ship.symbol}/extract`;
    const options = {
      method: "POST",
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
        getShips();
      } else {
        alert(data.error.message);
      }
    } catch (error) {
      console.log("an error occurred in extractGoods " + error);
    }
  };

  const refuelShip = async () => {
    const url = `https://api.spacetraders.io/v2/my/ships/${ship.symbol}/refuel`;
    const options = {
      method: "POST",
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
        getShips();
      } else {
        alert(data.error.message);
      }
    } catch (error) {
      console.log("an error occurred in refuelShip " + error);
    }
  };

  const listCargo = async () => {
    const url = `https://api.spacetraders.io/v2/my/ships/${ship.symbol}/cargo`;
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
        getShips();
      } else {
        alert(data.error.message);
      }
    } catch (error) {
      console.log("an error occurred in listCargo " + error);
    }
  };

  const sellCargo = async () => {
    if (cargoSymbol === "") {
      alert("Cargo item must be selected!");
      return;
    }
    if (cargoQty === "") {
      alert("Cargo quantity must be selected!");
      return;
    }

    const url = `https://api.spacetraders.io/v2/my/ships/${ship.symbol}/sell`;
    const options = {
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

    try {
      const res = await fetch(url, options);
      const data = await res.json();
      if (res.ok) {
        getShips();
        getAgent();
      } else {
        alert(data.error.message);
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

        <div className="col-sm-12">[Status]</div>
        <div className="col-sm-1" />
        <div className="col-sm-11">Status: {ship.nav.status}</div>
        <div className="col-sm-1" />
        <div className="col-sm-11">Flight mode: {ship.nav.flightMode}</div>

        <div className="col-sm-12">[Navigation]</div>
        <div className="col-sm-1" />
        <div className="col-sm-11">System: {ship.nav.systemSymbol}</div>
        <div className="col-sm-1" />
        <div className="col-sm-11">Waypoint: {ship.nav.waypointSymbol}</div>

        <div className="col-sm-12">[Fuel]</div>
        <div className="col-sm-1" />
        <div className="col-sm-11">Fuel: {ship.fuel.current}</div>
        <div className="col-sm-1" />
        <div className="col-sm-11">Fuel capacity: {ship.fuel.capacity}</div>

        <div className="col-sm-12">[Cargo]</div>
        <div className="col-sm-1" />
        <div className="col-sm-11">Cargo capacity: {ship.cargo.capacity}</div>
        <div className="col-sm-1" />
        <div className="col-sm-11">Cargo: {ship.cargo.units}</div>

        <div className="col-sm-12">[Crew]</div>
        <div className="col-sm-1" />
        <div className="col-sm-11">Crew required: {ship.crew.required}</div>
        <div className="col-sm-1" />
        <div className="col-sm-11">Crew capacity: {ship.crew.capacity}</div>

        <div className="col-sm-12">[Route]</div>
        <div className="col-sm-1" />
        <div className="col-sm-11">
          Destination: {ship.nav.route.destination.symbol}
        </div>
        <div className="col-sm-1" />
        <div className="col-sm-11">Origin: {ship.nav.route.origin.symbol}</div>
        <div className="col-sm-1" />
        <div className="col-sm-11">
          Departure: {ship.nav.route.departureTime}
        </div>
        <div className="col-sm-1" />
        <div className="col-sm-11">Arrival: {ship.nav.route.arrival}</div>

        <div className="col-sm-12">[Mining]</div>
        <div className="col-sm-1" />
        <div className="col-sm-11">
          Extract Cooldown Time: {ship.cooldown.totalSeconds}
        </div>
        <div className="col-sm-1" />
        <div className="col-sm-11">
          Extract Cooldown Remaining: {ship.cooldown.remainingSeconds}
        </div>

        <div className="col-sm-12">
          <br />
        </div>
        <input
          type="text"
          ref={waypointRef}
          placeholder={ship.nav.waypointSymbol}
          defaultValue={ship.nav.waypointSymbol}
          className="col-sm-8"
        />
        <button className="col-sm-4" onClick={navigateShip}>
          Travel
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
          Sell Cargo (Must be docked)
        </button>
      </div>
    </div>
  );
};

export default ShipComponent;

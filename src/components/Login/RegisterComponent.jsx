import React, { useEffect, useState } from "react";

const RegisterComponent = ({ createAirtableRecord }) => {
  /*****************************************************************************
   *
   * Use States, Context & Variables
   *
   ****************************************************************************/
  // For username/symbol/agent
  const [user, SetUser] = useState("");

  // For factions
  const [factions, setFactions] = useState([
    { symbol: "", name: "", description: "" },
  ]);
  const [selectedFaction, setSelectedFaction] = useState({
    symbol: "",
    name: "",
    description: "",
  });

  // For invalid/problem handling

  /*****************************************************************************
   *
   * URL and Options
   *
   ****************************************************************************/

  // fetch GET all factions (page 1 of 2 apparently)
  const factionFetchURL = "https://api.spacetraders.io/v2/factions";
  const factionFetchOptions = {
    method: "GET",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  };

  // fetch POST registeration of new agent
  const registerFetchURL = "https://api.spacetraders.io/v2/register";
  const registerFetchOptions = {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      faction: selectedFaction.symbol,
      symbol: user,
    }),
  };

  /*****************************************************************************
   *
   * Fetches
   *
   ****************************************************************************/

  const getFactions = async () => {
    try {
      const res = await fetch(factionFetchURL, factionFetchOptions);
      const data = await res.json();
      setFactions(
        data.data.map(({ symbol, name, description }) => ({
          symbol,
          name,
          description,
        }))
      );
    } catch (error) {
      console.log("an error has occurred with getFactions " + error);
    }
  };

  const registerAgent = async () => {
    try {
      const res = await fetch(registerFetchURL, registerFetchOptions);
      const data = await res.json();
      if (res.ok) {
        console.log(data.data);
        createAirtableRecord(
          data.data.agent.accountId,
          data.data.agent.symbol,
          data.data.faction.symbol,
          data.data.token
        );
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log("an error has occurred with registerAgent " + error);
    }
  };

  /*****************************************************************************
   *
   * Input Handlers
   *
   ****************************************************************************/

  const handleInputChange = (event) => {
    SetUser(event.target.value);
  };

  const handleSelectFactionChange = (event) => {
    if (event.target.value === "") {
      setSelectedFaction({
        symbol: "",
        name: "",
        description: "",
      });
      return;
    }
    const selectedSymbol = event.target.value;
    const selectedFaction = factions.find(
      (faction) => faction.symbol === selectedSymbol
    );
    setSelectedFaction(selectedFaction);
  };

  /*****************************************************************************
   *
   * useEffect (onMount)
   *
   ****************************************************************************/

  useEffect(() => {
    getFactions();
  }, []);

  /*****************************************************************************
   *
   * React stuffs
   *
   ****************************************************************************/

  return (
    <div className="row component">
      {/* Component Title */}
      <label className="col-md-12">Register</label>

      {/* Spacer */}
      <br />
      <br />
      {/* Spacer */}

      {/* Agent Name field */}
      <label className="col-md-4 mt-auto">Agent Name:</label>
      <input
        type="text"
        id="user"
        placeholder="Agent name"
        className="col-md-6 mt-auto"
        value={user}
        onChange={handleInputChange}
      />
      <div className="col-md-2 mt-auto" />

      {/* Faction select field */}
      <label className="col-md-4 mt-auto">Faction: </label>
      <select className="col-md-6 mt-auto" onChange={handleSelectFactionChange}>
        <option value="">Select a faction</option>
        {factions.map((faction, idx) => (
          <option key={idx} value={faction.symbol}>
            {faction.symbol}
          </option>
        ))}
      </select>
      <div className="col-md-2 mt-auto" />

      {/* Spacer between input and button */}
      <div className="col-md-12">
        <br />
      </div>

      {/* submit button to register */}
      <div className="col-md-4 mt-auto" />
      <button className="col-md-4 mt-auto" onClick={registerAgent}>
        Register
      </button>
      <div className="col-md-4 mt-auto" />

      {/* display additional faction information */}
      {selectedFaction.symbol && (
        <div className="mt-auto">
          Selected Faction: {selectedFaction.name}
          <br />
          Description: {selectedFaction.description}
        </div>
      )}
    </div>
  );
};

export default RegisterComponent;

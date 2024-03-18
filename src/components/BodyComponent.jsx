import React, { useEffect, useState } from "react";
import LoginRegisterPage from "./Login/LoginRegisterPage";
import ContractPage from "./Contract/ContractPage";
import DashboardPage from "./Dashboard/DashboardPage";
import ShipsPage from "./Ships/ShipsPage";
import SystemsWaypointPage from "./SystemsWaypoint/SystemsWaypointPage";
import ShipyardPage from "./Shipyard/ShipyardPage";
import MarketPage from "./Market/MarketPage";

const BodyComponent = () => {
  const [data, setData] = useState([]);

  const getAirtable = async () => {
    const base = "app6eWagohmHszNED";
    const table = "accounts";
    const url = `https://api.airtable.com/v0/${base}/${table}`;
    const option = {
      method: "GET",
      headers: {
        Authorization: `Bearer pat80NaQm3xexH0xb.72bcb226e32e45c0c678d8d9b63e1cd042d40a775dd3709f52bd8a34ca49b8b6`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await fetch(url, option);
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        const temp = [];
        for (let i = 0; i < data.records.length; ++i) {
          temp.push(data.records[i]);
        }
        setData(temp);
      }
    } catch (error) {
      console.log("an error occurred in getAirtable " + error);
    }
  };

  const createAirtableRecord = async (id, name, faction, token) => {
    const base = "app6eWagohmHszNED";
    const table = "accounts";
    const url = `https://api.airtable.com/v0/${base}/${table}`;
    const option = {
      method: "POST",
      headers: {
        Authorization: `Bearer pat80NaQm3xexH0xb.72bcb226e32e45c0c678d8d9b63e1cd042d40a775dd3709f52bd8a34ca49b8b6`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              Account_Id: id,
              Name: name,
              Faction: faction,
              Token: token,
            },
          },
        ],
      }),
    };

    try {
      const res = await fetch(url, option);
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        getAirtable();
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log("an error occurred in createAirtableRecord " + error);
    }
  };

  const deleteAirtableRecord = async (id) => {
    const base = "app6eWagohmHszNED";
    const table = "accounts";
    const url = `https://api.airtable.com/v0/${base}/${table}/${id}`;
    const option = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer pat80NaQm3xexH0xb.72bcb226e32e45c0c678d8d9b63e1cd042d40a775dd3709f52bd8a34ca49b8b6`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await fetch(url, option);
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        getAirtable();
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log("an error occurred in deleteAirtableRecord " + error);
    }
  };

  useEffect(() => {
    getAirtable();
  }, []);

  return (
    <div id="body">
      <div className="page">
        [ LoginRegister Page ]
        <LoginRegisterPage
          createAirtableRecord={createAirtableRecord}
          deleteAirtableRecord={deleteAirtableRecord}
          data={data}
        />
      </div>
      <div className="page">
        [ Dashboard Page ]
        <DashboardPage />
      </div>
      <div className="page">
        [ Contract Page ]
        <ContractPage />
      </div>
      <div className="page">
        [ Ships Page ]
        <ShipsPage />
      </div>
      <div className="page">
        [ SystemsWaypoint Page ]
        <SystemsWaypointPage />
      </div>
      <div className="page">
        [ Shipyard Page ]
        <ShipyardPage />
      </div>
      <div className="page">
        [ Market Page ]
        <MarketPage />
      </div>
    </div>
  );
};

export default BodyComponent;

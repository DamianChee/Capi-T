import React, { useEffect, useState, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./Navbar/NavBar";
import { useAuth } from "./Context/AuthContext";

const LoginRegisterPage = React.lazy(() => import("./Login/LoginRegisterPage"));
const ContractPage = React.lazy(() => import("./Contract/ContractPage"));
const DashboardPage = React.lazy(() => import("./Dashboard/DashboardPage"));
const ShipsPage = React.lazy(() => import("./Ships/ShipsPage"));
const SystemsWaypointPage = React.lazy(() =>
  import("./SystemsWaypoint/SystemsWaypointPage")
);
const ShipyardPage = React.lazy(() => import("./Shipyard/ShipyardPage"));
const MarketPage = React.lazy(() => import("./Market/MarketPage"));

const BodyComponent = () => {
  const { isLoggedIn } = useAuth();
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
      <Suspense fallback={<h1>loading...</h1>}>
        <NavBar />
        <hr />
        <Routes>
          <Route path="/" element={<Navigate replace to="/main" />} />
          {!isLoggedIn ? (
            <Route
              path="main"
              element={
                <LoginRegisterPage
                  createAirtableRecord={createAirtableRecord}
                  deleteAirtableRecord={deleteAirtableRecord}
                  data={data}
                />
              }
            />
          ) : (
            <Route path="main" element={<DashboardPage />} />
          )}
          {isLoggedIn && (
            <>
              <Route path="contract" element={<ContractPage />} />
              <Route path="ships" element={<ShipsPage />} />
              <Route path="map" element={<SystemsWaypointPage />} />
              <Route path="shipyard" element={<ShipyardPage />} />
              <Route path="market" element={<MarketPage />} />
            </>
          )}
        </Routes>
      </Suspense>
    </div>
  );
};

export default BodyComponent;

import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";

const LoginComponent = ({ deleteAirtableRecord, data }) => {
  /*****************************************************************************
   *
   * Use States, Context & Variables
   *
   ****************************************************************************/
  // variables from auth context
  const { token } = useAuth();

  // functions from auth context
  const { setToken, setUserInfo, login } = useAuth();

  /*****************************************************************************
   *
   * Fetches
   *
   ****************************************************************************/

  const getAgent = async () => {
    const url = "https://api.spacetraders.io/v2/my/agent";
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
        setUserInfo(data.data);
        login(token);
      } else {
        alert(data.error.message);
      }
    } catch (error) {
      console.log("an error has occured with getAgent " + error);
    }
  };

  /*****************************************************************************
   *
   * Input Handlers
   *
   ****************************************************************************/

  const handleSelectChange = (event) => {
    const selectedAgent = data.find(
      (record) => record.fields.Name === event.target.value
    );
    if (selectedAgent) {
      setToken(selectedAgent.fields.Token);
    } else {
      setToken("");
    }
  };

  const handleOnClick = () => {
    const selectedData = data.find((record) => record.fields.Token === token);
    if (selectedData) deleteAirtableRecord(selectedData.id);
  };

  /*****************************************************************************
   *
   * useEffect
   *
   ****************************************************************************/

  /*****************************************************************************
   *
   * React stuffs
   *
   ****************************************************************************/
  return (
    <div className="row component">
      {/* Component Title */}
      <label className="col-md-12">Login</label>

      {/* Spacer */}
      <br />
      <br />
      {/* Spacer */}

      {/* Token input field */}
      <label className="col-md-2">Name:</label>
      <select className="col-md-6" onChange={handleSelectChange}>
        <option value="">Select...</option>
        {data.map((item, idx) => (
          <option key={idx} value={item.fields.Name}>
            {item.fields.Name}
          </option>
        ))}
      </select>
      {token && (
        <button className="col-md-3" onClick={handleOnClick}>
          Delete
        </button>
      )}

      {/* Spacer between input and button */}
      <div className="col-md-12">
        <br />
      </div>

      {/* submit button to login */}
      <div className="col-md-4" />
      <button className="col-md-4" onClick={getAgent}>
        Login
      </button>
      <div className="col-md-4" />
    </div>
  );
};

export default LoginComponent;

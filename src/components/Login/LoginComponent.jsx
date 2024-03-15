import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";

const LoginComponent = () => {
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
   * URL and Options
   *
   ****************************************************************************/

  const loginURL = "https://api.spacetraders.io/v2/my/agent";
  const loginFetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  /*****************************************************************************
   *
   * Fetches
   *
   ****************************************************************************/

  const getAgent = async () => {
    try {
      const res = await fetch(loginURL, loginFetchOptions);
      const data = await res.json();
      if (res.ok) {
        // console.log(data.data);
        setUserInfo(data.data);
        login(token);
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

  const handleInputChange = (event) => {
    setToken(event.target.value);
  };

  /*****************************************************************************
   *
   * useEffect (onMount)
   *
   ****************************************************************************/

  useEffect(() => {
    setToken(
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiVEVTVEVSRVIxIiwidmVyc2lvbiI6InYyLjIuMCIsInJlc2V0X2RhdGUiOiIyMDI0LTAzLTEwIiwiaWF0IjoxNzEwMzkwNDUzLCJzdWIiOiJhZ2VudC10b2tlbiJ9.LTXCGIQXUEjabCNtIV9n1qCcWJpY6NESdM1L-R1u3rnM3ds2-rwVWuu22ybVenJRN1UTUm6eOvueJ5oUFmRlXSrp9UJ8Ur0f3MVq3CAA1FL9O7FMKFbrag_2tzB80WBoR-oZoMErUTUxQgAeF3GmXksHw032AFONSuavAEmaz92UwbLNWshKhwGkaXalryuvdsdJfgNxWa0n122XyUux3d7B7ZoGrxdtdEhwF69gd8ELavGjfqWfCjixbqIIwL2q1VIcNDDvhv-sVFh2rZwFHCbw0qhkIpwbpoPsrXIocApmsMaeVaSXlEftTx0SWy7AooXlkbZuO8VxnTInNQkrPQ"
    );
  }, []);
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
      <label className="col-md-4">Token:</label>
      <input
        type="text"
        id="token"
        placeholder="Token"
        className="col-md-6"
        value={token}
        onChange={handleInputChange}
      />
      <div className="col-md-2" />

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

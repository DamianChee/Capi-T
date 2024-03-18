import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import ContractComponent from "./ContractComponent";

const ContractPage = () => {
  /*****************************************************************************
   *
   * Use States
   *
   ****************************************************************************/
  const { isLoggedIn, token } = useAuth();
  const [contracts, setContracts] = useState([]);

  /*****************************************************************************
   *
   * Fetches
   *
   ****************************************************************************/
  const getContracts = async () => {
    const url = "https://api.spacetraders.io/v2/my/contracts";
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
      if (res.ok) setContracts(data.data);
      else {
        alert(data.error.message);
      }
    } catch (error) {
      console.log("an error occurred in getContracts " + error);
    }
  };

  /*****************************************************************************
   *
   * Input Handlers
   *
   ****************************************************************************/

  /*****************************************************************************
   *
   * useEffect (onMount)
   *
   ****************************************************************************/
  useEffect(() => {
    getContracts();
  }, []);
  /*****************************************************************************
   *
   * React stuffs
   *
   ****************************************************************************/
  return (
    <div className="container">
      {isLoggedIn ? (
        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-10">
            {contracts.map((item, idx) => (
              <ContractComponent props={item} key={idx} />
            ))}
          </div>
          <div className="col-md-1" />
        </div>
      ) : (
        "[ Contracts ] Not Logged In Yet"
      )}
    </div>
  );
};

export default ContractPage;

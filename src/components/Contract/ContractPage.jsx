import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import Contract from "./Contract";

const ContractPage = () => {
  const { isLoggedIn, token } = useAuth();
  const [contracts, setContracts] = useState([]);

  const contractURL = "https://api.spacetraders.io/v2/my/contracts";
  const contractFetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const getContracts = async () => {
    try {
      const res = await fetch(contractURL, contractFetchOptions);
      const data = await res.json();
      if (res.ok) {
        setContracts(data.data);
      }
    } catch (error) {
      console.log("an error occurred in getContracts " + error);
    }
  };

  return (
    <div className="container">
      {isLoggedIn ? (
        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-10">
            {contracts.map((item, idx) => (
              <Contract props={item} key={idx} />
            ))}
          </div>
          <div className="col-md-1" />
          {contracts.length === 0 ? (
            <button className="col-md-12" onClick={getContracts}>
              Get Contracts
            </button>
          ) : (
            ""
          )}
        </div>
      ) : (
        "[ Contracts ] Not Logged In Yet"
      )}
    </div>
  );
};

export default ContractPage;

import React, { useEffect, useState } from "react";

const Contract = ({ props }) => {
  const [contract, setContract] = useState({
    id: "",
    type: "",
    terms: {
      deadline: "",
      payment: { onAccepted: 0, onFulfilled: 0 },
      deliver: [
        {
          tradeSymbol: "",
          destinationSymbol: "",
          unitsRequired: 0,
          unitsFulfilled: 0,
        },
      ],
    },
    accepted: false,
    fulfilled: false,
    expiration: "",
    deadlineToAccept: "",
  });

  const contractAcceptURL = `https://api.spacetraders.io/v2/my/contracts/${contract.id}/accept`;
  const contractAcceptFetchOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: undefined,
  };

  const acceptContract = async () => {
    try {
      const res = await fetch(contractAcceptURL, contractAcceptFetchOptions);
      const data = await res.json();
      if (res.ok) console.log(data);
    } catch (error) {
      console.log("an error has occurred in acceptContract " + error);
    }
  };

  useEffect(() => {
    setContract(props);
  });

  return (
    <div className="container component">
      {contract.id && (
        <div className="row">
          <div className="col-sm-12">Contract ID: {contract.id}</div>
          <div className="col-sm-12">Type: {contract.type}</div>
          <div className="col-sm-12 container">Terms:</div>
          <div className="row">
            <div className="col-sm-1" />
            <div className="col-sm-11">Deadline: {contract.terms.deadline}</div>
            <div className="col-sm-1" />
            <div className="col-sm-11 container">
              Payment:
              <div className="row">
                <div className="col-sm-1" />
                <div className="col-sm-11">
                  On Accept:{" "}
                  {contract.terms.payment.onAccepted ? "True" : "False"}
                </div>
                <div className="col-sm-1" />
                <div className="col-sm-11">
                  On Fulfill:{" "}
                  {contract.terms.payment.onFulfilled ? "True" : "False"}
                </div>
              </div>
            </div>
            <div className="col-sm-1" />
            <div className="col-sm-11 container">
              Deliver:
              <div className="row">
                {contract.terms.deliver.map((item, idx) => (
                  <div key={idx}>
                    <div className="col-sm-1" />
                    <div className="col-sm-11">Item: {item.tradeSymbol}</div>
                    <div className="col-sm-1" />
                    <div className="col-sm-11">
                      Destination: {item.destinationSymbol}
                    </div>
                    <div className="col-sm-1" />
                    <div className="col-sm-11">
                      Required: {item.unitsRequired}
                    </div>
                    <div className="col-sm-1" />
                    <div className="col-sm-11">
                      Fulfilled: {item.unitsFulfilled}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-sm-12">
            Acceptance Status: {contract.accepted ? "True" : "False"}
          </div>
          <div className="col-sm-12">
            Fulfilment Status: {contract.fulfilled ? "True" : "False"}
          </div>
          <div className="col-sm-12">Expiration: {contract.expiration}</div>
          <div className="col-sm-12">
            Deadline to Accept: {contract.deadlineToAccept}
          </div>
          <div className="col-sm-12">
            <br />
          </div>
          <div className="col-sm-4" />
          {!contract.accepted ? (
            <button className="col-sm-4" onClick={acceptContract}>
              Accept
            </button>
          ) : (
            ""
          )}
          <div className="col-sm-4" />
        </div>
      )}
    </div>
  );
};

export default Contract;

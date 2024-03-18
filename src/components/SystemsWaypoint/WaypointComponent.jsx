import React from "react";

const WaypointComponent = ({ props, fn }) => {
  return (
    <>
      {fn ? (
        <>
          <div className="col-sm-4">{props.symbol}</div>
          <div className="col-sm-4">{props.type}</div>
          <button
            className="col-sm-4"
            onClick={() => {
              fn(props.symbol);
            }}
          >
            Scan
          </button>
        </>
      ) : (
        <>
          <div className="col-sm-4" />
          <div className="col-sm-2">{props.symbol}</div>
          <div className="col-sm-2">{props.type}</div>
          <div className="col-sm-4" />
        </>
      )}
    </>
  );
};

export default WaypointComponent;

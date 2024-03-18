import React from "react";

const MarketComponent = ({ props }) => {
  /*****************************************************************************
   *
   * Use States
   *
   ****************************************************************************/

  /*****************************************************************************
   *
   * Fetches
   *
   ****************************************************************************/

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

  /*****************************************************************************
   *
   * React stuffs
   *
   ****************************************************************************/
  return (
    <div className="container component">
      <div className="row">
        <div className="col-sm-12">[{props.symbol}]</div>
        <div className="col-sm-1" />
        <div className="col-sm-11 container">
          Exchange:
          <div className="row">
            <div className="col-sm-1" />
            <div className="col-sm-11">
              {props.exchange.map((item, idx) => {
                return (
                  <div key={idx}>
                    <div className="col-sm-12">{item.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-sm-1" />
        <div className="col-sm-11 container">
          Imports:
          <div className="row">
            <div className="col-sm-1" />
            <div className="col-sm-11">
              {props.imports.map((item, idx) => {
                return (
                  <div key={idx}>
                    <div className="col-sm-12">{item.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-sm-1" />
        <div className="col-sm-11 container">
          Exports:
          <div className="row">
            <div className="col-sm-1" />
            <div className="col-sm-11">
              {props.exports.map((item, idx) => {
                return (
                  <div key={idx}>
                    <div className="col-sm-12">{item.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketComponent;

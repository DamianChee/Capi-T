import React from "react";

const MarketComponent = ({ props }) => {
  /*****************************************************************************
   *
   * Use States
   *
   ****************************************************************************/

  /*****************************************************************************
   *
   * URL and Options
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
        <div className="col-sm-12 container">
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
        <div className="col-sm-12 container">
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

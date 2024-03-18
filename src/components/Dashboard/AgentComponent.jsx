import React from "react";
import { useAuth } from "../Context/AuthContext";

const AgentComponent = () => {
  /*****************************************************************************
   *
   * Use States, Context & Variables
   *
   ****************************************************************************/

  const { userInfo } = useAuth();

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
        <label className="col-sm-12">Account ID: {userInfo.accountId}</label>
        <label className="col-sm-12">Name: {userInfo.symbol}</label>
        <label className="col-sm-12">Credits: {userInfo.credits}</label>
        <label className="col-sm-12">
          Headquarters: {userInfo.headquarters}
        </label>
        <label className="col-sm-12">Ships: {userInfo.shipCount}</label>
      </div>
    </div>
  );
};

export default AgentComponent;

import React, { useEffect } from "react";
import { useAuth } from "../Context/AuthContext";

const UserInfo = () => {
  /*****************************************************************************
   *
   * Use States, Context & Variables
   *
   ****************************************************************************/

  const { userInfo, logout } = useAuth();

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
  useEffect(() => {}, [userInfo]);
  /*****************************************************************************
   *
   * React stuffs
   *
   ****************************************************************************/
  return (
    <>
      {userInfo.accountId && (
        <>
          Credits: {userInfo.credits}, {userInfo.symbol}
          <button onClick={logout}>Logout</button>
        </>
      )}
    </>
  );
};

export default UserInfo;

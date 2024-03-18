import React, { createContext, useContext, useState } from "react";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState({});

  const login = (token) => {
    setIsLoggedIn(true);
    setToken(token);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken("");
    setUserInfo({});
  };

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

  const value = {
    isLoggedIn,
    token,
    setToken,
    userInfo,
    setUserInfo,
    login,
    logout,
    getAgent,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

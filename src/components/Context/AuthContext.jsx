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

  const value = {
    isLoggedIn,
    token,
    setToken,
    userInfo,
    setUserInfo,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

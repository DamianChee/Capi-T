import React from "react";
import RegisterComponent from "./RegisterComponent";
import LoginComponent from "./LoginComponent";

const LoginRegisterPage = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-1" />
        <div className="col-md-4">
          <RegisterComponent />
        </div>
        <div className="col-md-2" />
        <div className="col-md-4">
          <LoginComponent />
        </div>
        <div className="col-md-1" />
      </div>
    </div>
  );
};

export default LoginRegisterPage;

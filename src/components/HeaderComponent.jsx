import React from "react";
import UserInfo from "./HeaderInfo/UserInfo";
import AppTitle from "./HeaderInfo/AppTitle";

const HeaderComponent = () => {
  return (
    <div id="header" className="container pl-2 mt-3 mb-3">
      <div className="row">
        <div className="col-md-2 component d-flex flex-column align-items-center justify-content-center">
          <AppTitle />
        </div>
        <div className="col-md-6" />
        <div className="col-md-4 component d-flex flex-row align-items-center justify-content-end gap-2">
          <UserInfo />
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;

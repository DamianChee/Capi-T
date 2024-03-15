import React from "react";
import AgentDetails from "./AgentDetails";
import { useAuth } from "../Context/AuthContext";

const DashboardPage = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="container">
      {isLoggedIn ? (
        <div className="row">
          <div className="col-md-12">
            <AgentDetails />
          </div>
        </div>
      ) : (
        "[ Dashboard ] Not Logged In Yet"
      )}
    </div>
  );
};

export default DashboardPage;

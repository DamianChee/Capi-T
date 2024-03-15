import React from "react";
import { useState } from "react";
import StatusCircle from "./StatusCircle";
import { useEffect } from "react";

const FooterComponent = () => {
  const [serverStatus, setServerStatus] = useState(0);

  const getServerStatus = async () => {
    try {
      const url = "https://api.spacetraders.io/v2/";
      const res = await fetch(url);

      if (res.ok) setServerStatus(1);
    } catch (error) {
      console.log("error has occurred");
    }
  };

  useEffect(() => {
    getServerStatus();
  }, []);

  return (
    <div id="footer" className="component container mt-auto">
      Server Status
      {serverStatus ? (
        <StatusCircle color="mediumseagreen" />
      ) : (
        <StatusCircle color="firebrick" />
      )}
    </div>
  );
};

export default FooterComponent;

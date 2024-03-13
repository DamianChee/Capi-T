import React from "react";

const StatusCircle = ({ color }) => {
  const styles = { backgroundColor: color };

  return (
    <>
      <div className="colored-circle" style={styles} />
    </>
  );
};

export default StatusCircle;

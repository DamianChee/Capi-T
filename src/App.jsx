import React from "react";
import HeaderComponent from "./components/HeaderComponent";
import BodyComponent from "./components/BodyComponent";
import FooterComponent from "./components/FooterComponent";

function App() {
  return (
    <div className="d-flex flex-column">
      {/* Header */}
      <HeaderComponent />
      <hr />

      {/* Body */}
      <BodyComponent />

      <hr />
      {/* Footer */}
      <FooterComponent />
    </div>
  );
}

export default App;

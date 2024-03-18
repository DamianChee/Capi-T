import React from "react";
import HeaderComponent from "./components/HeaderComponent";
import BodyComponent from "./components/BodyComponent";
import FooterComponent from "./components/FooterComponent";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="d-flex flex-column">
      {/* Header */}
      <HeaderComponent />
      <hr />

      {/* Body */}
      <BrowserRouter>
        <BodyComponent />
      </BrowserRouter>
      <hr />
      {/* Footer */}
      <FooterComponent />
    </div>
  );
}

export default App;

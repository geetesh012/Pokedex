import React from "react";
import Pokedex from "./Pokedex.jsx";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1a1a1a",
        padding: "24px 12px",
      }}
    >
      <Pokedex />
    </div>
  );
}

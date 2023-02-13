import { useEffect, useState } from "react";
import "./App.css";
import Background from "./components/Background/Background";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <div className="relative w-screen h-screen">
      <Background />
      <Dashboard />
    </div>
  );
}

export default App;

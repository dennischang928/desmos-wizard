import React from "react";
import "./App.css";
import CameraCapture from "./camera_capture/camera_capture.js";
import Panel from "./panel/panel.js";

const App = () => {
  return (
    <div className="App">
      <Panel />
      <CameraCapture />
    </div>
  );
};

export default App;

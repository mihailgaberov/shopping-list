import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RoomProvider } from "./liveblocks.config";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RoomProvider id="shopping-list">
      <App />
    </RoomProvider>
  </React.StrictMode>
);

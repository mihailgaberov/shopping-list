import React from "react";
import ReactDOM from "react-dom/client";
import { LiveblocksProvider, RoomProvider } from "@liveblocks/react";
import { LiveList } from "@liveblocks/client";

import App from "./App";

import "./index.css";

const API_KEY = import.meta.env.VITE_API_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LiveblocksProvider publicApiKey={API_KEY}>
      <RoomProvider
        id="newShoppingListRoom"
        initialStorage={{ groceries: new LiveList([]) }}
        initialPresence={{ groceries: [] }}
      >
        <App />
      </RoomProvider>
    </LiveblocksProvider>
  </React.StrictMode>
);

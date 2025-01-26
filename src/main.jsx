import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RoomProvider } from "@liveblocks/react";
import { LiveList } from "@liveblocks/client";

const API_KEY = import.meta.env.VITE_API_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LiveblocksProvider
      publicApiKey={API_KEY}
      authEndpoint="/api/liveblocks-auth"
      throttle={16}
    >
      <RoomProvider
        id="shoppingList"
        initialStorage={{ groceries: new LiveList([]) }}
        initialPresence={{ groceries: [] }}
      >
        <App />
      </RoomProvider>
    </LiveblocksProvider>
  </React.StrictMode>
);

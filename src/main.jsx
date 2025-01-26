import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { RoomProvider } from "./liveblocks.config"
import { LiveList } from "@liveblocks/client"

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RoomProvider
            id="shoppingList"
            initialStorage={{ groceries: new LiveList([]) }}
            initialPresence={{ groceries: [] }}>
            <App/>
        </RoomProvider>
    </React.StrictMode>
)

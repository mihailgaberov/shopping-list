import { useState } from "react";
import loader from "../assets/loader.svg";
import { useList, useUpdateMyPresence } from "./liveblocks.config";

import { Avatars } from "./components/Avatars";
import { SomeoneIsTyping } from "./components/SomeoneIsTyping";
import { WhoIsHere } from "./components/WhoIsHere";

import "./App.css";

export default function App() {
  const [draft, setDraft] = useState("");
  const updateMyPresence = useUpdateMyPresence();
  const groceries = useList("groceries");

  if (groceries === null) {
    return (
      <div className="loading">
        <img src={loader} alt="Loading" />
      </div>
    );
  }

  const reversedGroceries = groceries.map((g) => g).reverse();

  return (
    <div className="container">
      <WhoIsHere />
      <Avatars />
      <input
        type="text"
        placeholder="What do you need to buy?"
        value={draft}
        onChange={(e) => {
          setDraft(e.target.value);
          updateMyPresence({ isTyping: true });
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateMyPresence({ isTyping: false });
            groceries.push({ text: draft });
            setDraft("");
          }
        }}
        onBlur={() => updateMyPresence({ isTyping: false })}
      />
      <SomeoneIsTyping />
      {reversedGroceries.map((grocery, index) => {
        return (
          <div key={index} className="row">
            <div className="ordering">{index + 1}.</div>
            <div className="grocery">{grocery.text}</div>
            <button
              className="delete-button"
              onClick={() => groceries.delete(index)}
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
}

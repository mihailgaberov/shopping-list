import "./App.css";
import { useOthers, useUpdateMyPresence, useList } from "./liveblocks.config";
import { useState } from "react";

function WhoIsHere() {
  const others = useOthers();

  return (
    <div className="who-is-here">
      There are {others.count} other users online.
    </div>
  );
}

function SomeoneIsTyping() {
  const someoneIsTyping = useOthers()
    .toArray()
    .some((user) => user.presence?.isTyping);

  return (
    <div className="someone-is-typing">
      {someoneIsTyping ? "Someone is typing..." : ""}
    </div>
  );
}

export default function App() {
  const [draft, setDraft] = useState("");
  const updateMyPresence = useUpdateMyPresence();
  const groceries = useList("groceries");

  if (groceries === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <WhoIsHere />
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
      {groceries.map((grocery, index) => {
        return (
          <div key={index} className="container">
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

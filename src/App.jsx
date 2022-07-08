import "./App.css";
import { useOthers, useUpdateMyPresence } from "./liveblocks.config";
import { useState } from "react";

function WhoIsHere() {
  const others = useOthers();

  return (
    <div className="who_is_here">
      There are {others.count} other users online
    </div>
  );
}

function SomeoneIsTyping() {
  const someoneIsTyping = useOthers()
    .toArray()
    .some((user) => user.presence?.isTyping);

  return (
    <div className="someone_is_typing">
      {someoneIsTyping ? "Someone is typing..." : ""}
    </div>
  );
}

export default function App() {
  const [draft, setDraft] = useState("");
  const updateMyPresence = useUpdateMyPresence();

  return (
    <div className="container">
      <WhoIsHere />
      <input
        type="text"
        placeholder="What needs to be done?"
        value={draft}
        onChange={(e) => {
          setDraft(e.target.value);
          updateMyPresence({ isTyping: true });
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateMyPresence({ isTyping: false });
            setDraft("");
          }
        }}
        onBlur={() => updateMyPresence({ isTyping: false })}
      />
      <SomeoneIsTyping />
    </div>
  );
}

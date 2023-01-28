import { useState } from "react";
import loader from "../assets/loader.svg";
import { useList, useUpdateMyPresence } from "./liveblocks.config";

import { Avatars } from "./components/Avatars";
import { SomeoneIsTyping } from "./components/SomeoneIsTyping";
import { WhoIsHere } from "./components/WhoIsHere";
import { Footer } from "./components/Footer";

import "./App.css";

export default function App() {
  const [draft, setDraft] = useState("");
  const [editItemIdx, setEditItem] = useState(-1);
  const updateMyPresence = useUpdateMyPresence();
  const groceries = useList("groceries");

  if (groceries === null) {
    return (
      <div className="loading">
        <img src={loader} alt="Loading" />
      </div>
    );
  }

  const reversedGroceries = groceries.toArray().reverse();

  const fillTextInput = (elementIndex) => {
    setDraft(groceries.get(elementIndex).text);
    setEditItem(elementIndex);
  };

  const updateGroceriesList = (elementText) => {
    if (elementText === "") {
      return;
    }
    const currentItem = groceries.get(editItemIdx);

    if (currentItem) {
      setEditItem(-1);
      groceries.set(groceries.indexOf(currentItem), { text: elementText });
    } else {
      groceries.push({ text: elementText });
    }
  };

  const handleOnChange = (e) => {
    setDraft(e.target.value);
    updateMyPresence({ isTyping: true });
  };

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      updateMyPresence({ isTyping: false });
      updateGroceriesList(draft);
      setDraft("");
    }
  };

  const handleOnBlur = () => {
    updateMyPresence({ isTyping: false })
  };

  return (
    <div className="container">
      <WhoIsHere />
      <Avatars />
      <input
        type="text"
        placeholder="What do you need to buy?"
        value={draft}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
        onBlur={handleOnBlur}
      />
      <SomeoneIsTyping />
      {reversedGroceries.map((grocery, index) => {
        return (
          <div key={index} className="row">
            <div className="ordering">{index + 1}.</div>
            <div
              className="grocery"
              onClick={() => fillTextInput(groceries.indexOf(grocery))}
            >
              {grocery.text}
            </div>
            <button
              className="delete-button"
              onClick={() => groceries.delete(groceries.indexOf(grocery))}
            >
              ✕
            </button>
          </div>
        );
      })}
      <Footer />
    </div>
  );
}

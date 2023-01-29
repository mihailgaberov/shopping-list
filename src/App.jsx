import { useState } from "react";
import loader from "../assets/loader.svg";
import {
  useList,
  useUpdateMyPresence,
  useHistory,
    useCanUndo,
  useCanRedo
} from "./liveblocks.config";

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
  const { undo, redo } = useHistory();
  const canRedo = useCanRedo();
  const canUndo = useCanUndo();

  if (groceries === null) {
    return (
        <div className="loading">
          <img src={loader} alt="Loading"/>
        </div>
    );
  }

  const reversedGroceries = groceries.toArray().reverse();

  const fillTextInput = (elementIndex) => {
    setDraft(groceries.get(elementIndex).text);
    setEditItem(elementIndex);
  };

  const addItem = (item) => groceries.push(item);

  const updateGroceriesList = (elementText) => {
    if (elementText === "") {
      return;
    }
    const currentItem = groceries.get(editItemIdx);

    if (currentItem) {
      setEditItem(-1);
      groceries.set(groceries.indexOf(currentItem), { text: elementText });
    } else {
      addItem({ text: elementText });
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

  const handleDeleteItem = (grocery) => {
    groceries.delete(groceries.indexOf(grocery))
  };

  return (
      <div className="container">
        <div className="history-controls">
          <button className="manage-history-btn" onClick={() => undo()} disabled={!canUndo}>Undo</button>
          <button className="manage-history-btn" onClick={() => redo()} disabled={!canRedo}>Redo</button>
        </div>
        <WhoIsHere/>
        <Avatars/>
        <input
            type="text"
            placeholder="What do you need to buy?"
            value={draft}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
            onBlur={handleOnBlur}
        />
        <SomeoneIsTyping/>
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
                    onClick={() => handleDeleteItem(grocery)}
                >
                  ✕
                </button>
              </div>
          );
        })}
        <Footer/>
      </div>
  );
}

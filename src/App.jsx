import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useStorage,
  useUpdateMyPresence,
} from "@liveblocks/react";
import { NotificationType, useNotify } from "@yoavik/notify";
import { useState } from "react";
import loader from "../assets/loader.svg";

import { Avatars } from "./components/Avatars";
import { Footer } from "./components/Footer";
import { SomeoneIsTyping } from "./components/SomeoneIsTyping";
import { WhoIsHere } from "./components/WhoIsHere";

import "./App.css";

export default function App() {
  const [draft, setDraft] = useState("");
  const [editItemIdx, setEditItem] = useState(-1);
  const updateMyPresence = useUpdateMyPresence();

  const groceries = useStorage((root) => root.groceries);

  const { undo, redo } = useHistory();
  const canRedo = useCanRedo();
  const canUndo = useCanUndo();
  const { add } = useNotify();

  const addItem = useMutation(({ storage }, item) => {
    const groceriesList = storage.get("groceries");
    if (groceriesList) {
      groceriesList.push(item);
    } else {
      console.error("Groceries list is not initialized!");
    }
  }, []);

  const updateItem = useMutation(({ storage }, index, newText) => {
    const groceriesList = storage.get("groceries");
    if (groceriesList) {
      groceriesList.set(index, { text: newText });
    } else {
      console.error("Groceries list is not initialized!");
    }
  }, []);

  const deleteItem = useMutation(({ storage }, index) => {
    const groceriesList = storage.get("groceries");
    if (groceriesList) {
      groceriesList.delete(index);
    } else {
      console.error("Groceries list is not initialized!");
    }
  }, []);

  if (!groceries) {
    return (
      <div className="loading">
        <img src={loader} alt="Loading" />
      </div>
    );
  }

  const copyToClipboard = (textToCopy) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        add({
          title: "Info Notification",
          content: "Text copied to clipboard.",
          timeout: 5000,
          type: NotificationType.info,
        });
      })
      .catch((error) => {
        add({
          title: "Error Notification",
          content: `Error copying text to clipboard: ${error}`,
          timeout: 5000,
          type: NotificationType.error,
        });
      });
  };

  const fillTextInput = (index) => {
    const textCopy = groceries[index]?.text;
    setDraft(textCopy);
    setEditItem(index);
    copyToClipboard(textCopy);
  };

  const updateGroceriesList = (elementText) => {
    if (elementText === "") return;

    if (editItemIdx !== -1) {
      updateItem(editItemIdx, elementText);
      setEditItem(-1);
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
    updateMyPresence({ isTyping: false });
  };

  return (
    <div className="container">
      <div className="history-controls">
        <button
          className="manage-history-btn"
          onClick={() => undo()}
          disabled={!canUndo}
        >
          Undo
        </button>
        <button
          className="manage-history-btn"
          onClick={() => redo()}
          disabled={!canRedo}
        >
          Redo
        </button>
      </div>
      <WhoIsHere />
      <SomeoneIsTyping />
      <Avatars />
      <input
        type="text"
        placeholder="What do you need to buy?"
        value={draft}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
        onBlur={handleOnBlur}
      />

      {groceries.map((grocery, index) => (
        <div key={index} className="row">
          <div className="ordering">{index + 1}.</div>
          <div className="grocery" onClick={() => fillTextInput(index)}>
            {grocery.text}
          </div>
          <button className="delete-button" onClick={() => deleteItem(index)}>
            ✕
          </button>
        </div>
      ))}
      <Footer />
    </div>
  );
}

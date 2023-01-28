import { useOthers } from "../../liveblocks.config";
import styles from "./someone-is-typing.module.scss";

export function SomeoneIsTyping() {
  const someoneIsTyping = useOthers()
    .toArray()
    .some((user) => user.presence?.isTyping);

  console.log(">>> someoneIsTyping", someoneIsTyping)

  return (
    <div className={styles.container}>
      {someoneIsTyping ? "Someone is typing..." : ""}
    </div>
  );
}

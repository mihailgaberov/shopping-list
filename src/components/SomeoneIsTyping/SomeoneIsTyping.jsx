import { useOthers } from "@liveblocks/react";
import styles from "./someone-is-typing.module.scss";

export function SomeoneIsTyping() {
  const isSomeoneTyping = useOthers((others) =>
    others.some((other) => other.presence.isTyping)
  );

  return (
    <div className={styles.container}>
      {isSomeoneTyping ? "Someone is typing..." : ""}
    </div>
  );
}

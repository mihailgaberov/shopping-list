import Avatar from "boring-avatars";
import { useOthers, useSelf } from "@liveblocks/react";
import styles from "./avatars.module.scss";

export function Avatars() {
  const users = useOthers((others) => others);
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 3;

  return (
    <div className={styles.container}>
      {users.slice(0, 3).map(({ connectionId }) => {
        return (
          <Avatar
            key={connectionId}
            name="Other"
            variant="beam"
            width={40}
            colors={["#8D9C9D", "#E00B5B", "#F5B04B", "#FCDFBD", "#45373E"]}
          />
        );
      })}

      {hasMoreUsers && <div className={styles.more}>+{users.length - 3}</div>}

      {currentUser && (
        <div>
          <Avatar
            name="You"
            variant="beam"
            width={40}
            colors={["#8D9C9D", "#E00B5B", "#F5B04B", "#FCDFBD", "#45373E"]}
          />
        </div>
      )}
    </div>
  );
}

import { Avatar } from "../Avatar";
import { useOthers, useSelf } from "../../liveblocks.config";
import styles from "./avatars.module.scss";

export function Avatars() {
  const users = useOthers().toArray();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 3;

  console.log(">>> ", users);

  return (
    <div className={styles.container}>
      {users.slice(0, 3).map(({ connectionId, info }) => {
        console.log(">>> info->", info);
        return (
          <Avatar key={connectionId} picture={info.picture} name={info.name} />
        );
      })}

      {hasMoreUsers && <div className={styles.more}>+{users.length - 3}</div>}

      {currentUser && (
        <div>
          <Avatar picture={currentUser.info?.picture} name="You" />
        </div>
      )}
    </div>
  );
}

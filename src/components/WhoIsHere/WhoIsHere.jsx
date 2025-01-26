import React from "react";
import { useOthers } from "@liveblocks/react";

import styles from "./who-is-here.module.scss";

export function WhoIsHere() {
  const others = useOthers();

  return (
    <div className={styles.container}>
      There are {others.count} other users online.
    </div>
  );
}

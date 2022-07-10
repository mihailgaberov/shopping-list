import React from "react";
import styles from "./avatar.module.scss";

const IMAGE_SIZE = 48;

export function Avatar({ picture, name }) {
  return (
    <div className={styles.avatar} data-tooltip={name}>
      <img
        src={picture}
        height={IMAGE_SIZE}
        width={IMAGE_SIZE}
        className={styles.avatar_picture}
      />
    </div>
  );
}

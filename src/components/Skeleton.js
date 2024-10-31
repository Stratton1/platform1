import React from "react";
import styles from "./Skeleton.module.css";

const Skeleton = () => (
  <div className={styles.skeleton}>
    <div className={styles.skeletonBox}></div>
  </div>
);

export default Skeleton;
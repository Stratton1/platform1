import React from "react";
import WelcomeBanner from "../components/Home/WelcomeBanner";
import styles from "../styles/Home.module.css";

const HomePage = () => {
  const userName = "Joseph";

  return (
    <div className={styles.container}>
      <WelcomeBanner userName={userName} />
      <section className={styles.features}>
        <h2>Recent Activity</h2>
        {/* ActivityLogger will go here */}
      </section>
      <section className={styles.features}>
        <h2>Settings</h2>
        {/* DarkModeToggle and NotificationManager will go here */}
      </section>
      <section className={styles.features}>
        <h2>Explore Features</h2>
        <div className={styles.featureItem}>Feature 1</div>
        <div className={styles.featureItem}>Feature 2</div>
        <div className={styles.featureItem}>Feature 3</div>
        <div className={styles.featureItem}>Feature 4</div>
      </section>
    </div>
  );
};

export default HomePage;

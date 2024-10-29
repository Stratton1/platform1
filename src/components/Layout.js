import React from 'react';
import styles from '../styles/Layout.module.css';

function Layout({ children }) {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        {/* Add your navigation here */}
      </nav>
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        {/* Add your footer content here */}
      </footer>
    </div>
  );
}

export default Layout; 
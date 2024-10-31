import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Layout.module.css';

function Layout({ children }) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path) => router.pathname === path;

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [router.pathname]);

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            Platform Builder
          </div>
          <button 
            className={styles.menuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            ☰
          </button>
          <div 
            className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}
            aria-hidden={!isMenuOpen}
          >
            <Link href="/" className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}>
              Home
            </Link>
            <Link href="/timeline" className={`${styles.navLink} ${isActive('/timeline') ? styles.active : ''}`}>
              Timeline
            </Link>
            <Link href="/vault" className={`${styles.navLink} ${isActive('/vault') ? styles.active : ''}`}>
              Vault
            </Link>
            <Link href="/messages" className={`${styles.navLink} ${isActive('/messages') ? styles.active : ''}`}>
              Messages
            </Link>
            <Link href="/settings" className={`${styles.navLink} ${isActive('/settings') ? styles.active : ''}`}>
              Settings
            </Link>
            <Link href="/docs" className={`${styles.navLink} ${isActive('/docs') ? styles.active : ''}`}>
              Docs
            </Link>
          </div>
        </nav>
      </header>
      <main className={styles.main}>
        <div className={styles.content}>
          {children}
        </div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>&copy; 2024 Platform Builder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout; 
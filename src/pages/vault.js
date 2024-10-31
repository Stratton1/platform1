import ActivityLogger from "../components/Activity/ActivityLogger"; 
import ConfirmationModal from "../components/Interactions/ConfirmationModal";
import Tooltip from "../components/Support/Tooltip";
import DarkModeToggle from "../components/Customization/DarkModeToggle";
import NotificationManager from "../components/Notifications/NotificationManager";
import ErrorBoundary from "../components/ErrorBoundary";
import Skeleton from "../components/Skeleton";
import Spinner from "../components/Spinner";
import React, { useState } from 'react';
import styles from '../styles/Vault.module.css';

export async function getServerSideProps() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const vaultItems = [
      {
        id: 1,
        name: 'Important Documents',
        type: 'folder',
        itemCount: 5,
        lastModified: '2024-01-15',
        size: '25MB',
      },
      {
        id: 2,
        name: 'Photos',
        type: 'folder',
        itemCount: 12,
        lastModified: '2024-01-20',
        size: '150MB',
      },
      {
        id: 3,
        name: 'Videos',
        type: 'folder',
        itemCount: 3,
        lastModified: '2024-01-25',
        size: '500MB',
      },
    ];

    return {
      props: {
        vaultItems,
        error: null,
        isLoading: false,
      },
    };
  } catch (error) {
    return {
      props: {
        vaultItems: [],
        error: 'Failed to fetch vault data',
        isLoading: false,
      },
    };
  }
}

function VaultPage({ vaultItems, error, isLoading }) {
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [localLoading, setLocalLoading] = useState(false);

  const sortedItems = [...vaultItems].sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;
    return a[sortBy] > b[sortBy] ? order : -order;
  });

  const toggleSort = (field) => {
    setLocalLoading(true);
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
    setTimeout(() => setLocalLoading(false), 300);
  };

  if (error) {
    return (
      <ErrorBoundary>
        <div className={styles.container}>
          <h1 className={styles.title}>Vault</h1>
          <div className={styles.error}>
            <p>Error: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className={styles.retryButton}
            >
              Retry
            </button>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  if (isLoading || localLoading) {
    return (
      <ErrorBoundary>
        <div className={styles.container}>
          <h1 className={styles.title}>Vault</h1>
          <div className={styles.loading}>
            <Spinner />
            <p>Loading vault contents...</p>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <h1 className={styles.title}>Vault</h1>
        <div className={styles.controls}>
          <div className={styles.sortButtons}>
            <button 
              onClick={() => toggleSort('name')}
              className={`${styles.sortButton} ${sortBy === 'name' ? styles.active : ''}`}
              disabled={isLoading || localLoading}
            >
              Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button 
              onClick={() => toggleSort('lastModified')}
              className={`${styles.sortButton} ${sortBy === 'lastModified' ? styles.active : ''}`}
              disabled={isLoading || localLoading}
            >
              Date {sortBy === 'lastModified' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button 
              onClick={() => toggleSort('size')}
              className={`${styles.sortButton} ${sortBy === 'size' ? styles.active : ''}`}
              disabled={isLoading || localLoading}
            >
              Size {sortBy === 'size' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
          </div>
        </div>
        <div className={styles.content}>
          {sortedItems.map((item) => (
            <div key={item.id} className={styles.vaultItem}>
              <div className={styles.itemHeader}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <span className={styles.itemType}>{item.type}</span>
              </div>
              <div className={styles.itemDetails}>
                <p className={styles.itemCount}>{item.itemCount} items</p>
                <p className={styles.itemDate}>Modified: {item.lastModified}</p>
                <p className={styles.itemSize}>Size: {item.size}</p>
              </div>
            </div>
          ))}
          {sortedItems.length === 0 && !isLoading && !error && (
            <p className={styles.noData}>No items found in vault.</p>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default VaultPage; 
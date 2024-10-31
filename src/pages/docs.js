import ActivityLogger from "../components/Activity/ActivityLogger";
import ConfirmationModal from "../components/Interactions/ConfirmationModal";
import Tooltip from "../components/Support/Tooltip";
import DarkModeToggle from "../components/Customization/DarkModeToggle";
import NotificationManager from "../components/Notifications/NotificationManager";
import ErrorBoundary from "../components/ErrorBoundary";
import Skeleton from "../components/Skeleton";
import Spinner from "../components/Spinner";
import React, { useState } from 'react';
import styles from '../styles/Docs.module.css';
export const metadata = {
  title: 'Documentation',
  description: 'Platform documentation and guides'
};

export async function getServerSideProps() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const docsData = [
      {
        id: 1,
        title: 'User Guide',
        description: 'Learn how to use the platform effectively.',
        lastUpdated: '2024-01-15',
      },
      {
        id: 2,
        title: 'Privacy Policy',
        description: 'Understand how your data is handled.',
        lastUpdated: '2024-01-20',
      },
      {
        id: 3,
        title: 'Terms of Service',
        description: 'Review the terms for using the platform.',
        lastUpdated: '2024-01-25',
      },
    ];

    return {
      props: {
        docsData,
        error: null,
        isLoading: false,
      },
    };
  } catch (error) {
    return {
      props: {
        docsData: [],
        error: 'Failed to fetch documentation data',
        isLoading: false,
      },
    };
  }
}

function DocsPage({ docsData, error, isLoading }) {
  const [filter, setFilter] = useState('all');

  if (error) {
    return (
      <ErrorBoundary>
        <div className={styles.container}>
          <h1 className={styles.title}>Documentation</h1>
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

  if (isLoading) {
    return (
      <ErrorBoundary>
        <div className={styles.container}>
          <h1 className={styles.title}>Documentation</h1>
          <div className={styles.loading}>
            <Spinner />
            <p>Loading documentation...</p>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <h1 className={styles.title}>Documentation</h1>
        <div className={styles.filters}>
          <button 
            onClick={() => setFilter('all')}
            className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('guides')}
            className={`${styles.filterButton} ${filter === 'guides' ? styles.active : ''}`}
          >
            Guides
          </button>
          <button 
            onClick={() => setFilter('policies')}
            className={`${styles.filterButton} ${filter === 'policies' ? styles.active : ''}`}
          >
            Policies
          </button>
        </div>
        <div className={styles.content}>
          {docsData.map((doc) => (
            <div key={doc.id} className={styles.docItem}>
              <div className={styles.docHeader}>
                <h3 className={styles.docTitle}>{doc.title}</h3>
                <span className={styles.docDate}>
                  Last Updated: {new Date(doc.lastUpdated).toLocaleDateString()}
                </span>
              </div>
              <p className={styles.docDescription}>{doc.description}</p>
            </div>
          ))}
          {docsData.length === 0 && !isLoading && !error && (
            <p className={styles.noData}>No documentation available.</p>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default DocsPage;
import ActivityLogger from "../components/Activity/ActivityLogger";
import ConfirmationModal from "../components/Interactions/ConfirmationModal";
import Tooltip from "../components/Support/Tooltip";
import DarkModeToggle from "../components/Customization/DarkModeToggle";
import NotificationManager from "../components/Notifications/NotificationManager";
import ErrorBoundary from "../components/ErrorBoundary";
import Skeleton from "../components/Skeleton";
import Spinner from "../components/Spinner";
import React, { useState } from 'react';
import styles from '../styles/Timeline.module.css';
export async function getStaticProps() {
  try {
    // This would typically fetch from your API
    const timelineData = [
      {
        id: 1,
        title: 'First Memory',
        date: '2024-01-01',
        description: 'Your first memory entry',
        category: 'personal',
      },
      {
        id: 2,
        title: 'Second Memory',
        date: '2024-01-15',
        description: 'Another important moment',
        category: 'work',
      },
      {
        id: 3,
        title: 'Recent Event',
        date: '2024-02-01',
        description: 'A more recent memory',
        category: 'family',
      },
    ];

    return {
      props: {
        timelineData,
        error: null,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    return {
      props: {
        timelineData: [],
        error: 'Failed to fetch timeline data',
      },
    };
  }
}

function TimelinePage({ timelineData, error }) {
  const [filter, setFilter] = useState('all');

  const filteredData = filter === 'all' 
    ? timelineData 
    : timelineData.filter(entry => entry.category === filter);

  if (error) {
    return (
      <ErrorBoundary>
        <div className={styles.container}>
          <h1 className={styles.title}>Timeline</h1>
          <div className={styles.error}>Error: {error}</div>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <h1 className={styles.title}>Timeline</h1>
        <div className={styles.filters}>
          <button 
            onClick={() => setFilter('all')}
            className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('personal')}
            className={`${styles.filterButton} ${filter === 'personal' ? styles.active : ''}`}
          >
            Personal
          </button>
          <button 
            onClick={() => setFilter('work')}
            className={`${styles.filterButton} ${filter === 'work' ? styles.active : ''}`}
          >
            Work
          </button>
          <button 
            onClick={() => setFilter('family')}
            className={`${styles.filterButton} ${filter === 'family' ? styles.active : ''}`}
          >
            Family
          </button>
        </div>
        <div className={styles.content}>
          {filteredData.map((entry) => (
            <div key={entry.id} className={styles.timelineEntry}>
              <h3 className={styles.entryTitle}>{entry.title}</h3>
              <p className={styles.entryDate}>{entry.date}</p>
              <p className={styles.entryDescription}>{entry.description}</p>
              <span className={styles.entryCategory}>{entry.category}</span>
            </div>
          ))}
          {filteredData.length === 0 && (
            <p className={styles.noData}>No entries found for this category.</p>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default TimelinePage; 

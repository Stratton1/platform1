import ActivityLogger from "../components/Activity/ActivityLogger";
import ConfirmationModal from "../components/Interactions/ConfirmationModal";
import Tooltip from "../components/Support/Tooltip";
import DarkModeToggle from "../components/Customization/DarkModeToggle";
import NotificationManager from "../components/Notifications/NotificationManager";
import ErrorBoundary from "../components/ErrorBoundary";
import Skeleton from "../components/Skeleton";
import Spinner from "../components/Spinner";
import React, { useState } from 'react';
import styles from '../styles/Settings.module.css';

export async function getServerSideProps() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const userSettings = {
      darkMode: false,
      notificationsEnabled: true,
      activityLogging: true,
    };

    return {
      props: {
        userSettings,
        error: null,
        isLoading: false,
      },
    };
  } catch (error) {
    return {
      props: {
        userSettings: null,
        error: 'Failed to fetch settings data',
        isLoading: false,
      },
    };
  }
}

function SettingsPage({ userSettings, error, isLoading }) {
  const [settings, setSettings] = useState(userSettings || {});
  const [localLoading, setLocalLoading] = useState(false);

  const handleToggle = (setting) => {
    setLocalLoading(true);
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
    setTimeout(() => setLocalLoading(false), 300); // Simulate API delay
  };

  if (error) {
    return (
      <ErrorBoundary>
        <div className={styles.container}>
          <h1 className={styles.title}>Settings</h1>
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
          <h1 className={styles.title}>Settings</h1>
          <div className={styles.loading}>
            <Spinner />
            <p>Loading settings...</p>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <h1 className={styles.title}>Settings</h1>
        <div className={styles.settingsOptions}>
          <div className={styles.option}>
            <span>Dark Mode</span>
            <button 
              onClick={() => handleToggle('darkMode')}
              className={`${styles.toggleButton} ${settings.darkMode ? styles.active : ''}`}
            >
              {settings.darkMode ? 'Enabled' : 'Disabled'}
            </button>
          </div>
          <div className={styles.option}>
            <span>Notifications</span>
            <button 
              onClick={() => handleToggle('notificationsEnabled')}
              className={`${styles.toggleButton} ${settings.notificationsEnabled ? styles.active : ''}`}
            >
              {settings.notificationsEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>
          <div className={styles.option}>
            <span>Activity Logging</span>
            <button 
              onClick={() => handleToggle('activityLogging')}
              className={`${styles.toggleButton} ${settings.activityLogging ? styles.active : ''}`}
            >
              {settings.activityLogging ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default SettingsPage;
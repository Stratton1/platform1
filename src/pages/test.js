-e 
import ActivityLogger from "../components/Activity/ActivityLogger";
-e 
import ConfirmationModal from "../components/Interactions/ConfirmationModal";
-e 
import Tooltip from "../components/Support/Tooltip";
-e 
import DarkModeToggle from "../components/Customization/DarkModeToggle";
-e 
import NotificationManager from "../components/Notifications/NotificationManager";
-e 
import ErrorBoundary from "../components/ErrorBoundary";
-e 
import Skeleton from "../components/Skeleton";
-e 
import Spinner from "../components/Spinner";
import React from 'react';
import styles from '../styles/Media.module.css';

function TestPage() {
  return (
    <ErrorBoundary>
    <div className={styles.container}>
      <h1 className={styles.title}>Test Page</h1>
      <div className={styles.content}>
        {/* Add your test page content here */}
      </div>
    </ErrorBoundary>
    </div>
    </ErrorBoundary>
  );
}

export default TestPage; 

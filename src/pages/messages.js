import ActivityLogger from "../components/Activity/ActivityLogger";
import ConfirmationModal from "../components/Interactions/ConfirmationModal";
import Tooltip from "../components/Support/Tooltip";
import DarkModeToggle from "../components/Customization/DarkModeToggle";
import NotificationManager from "../components/Notifications/NotificationManager";
import ErrorBoundary from "../components/ErrorBoundary";
import Skeleton from "../components/Skeleton";
import Spinner from "../components/Spinner";
import React, { useState } from 'react';
import styles from '../styles/Media.module.css';

export async function getServerSideProps() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const messages = [
      {
        id: 1,
        sender: 'John Doe',
        content: 'Hello, how are you?',
        timestamp: '2024-01-15T10:30:00Z',
        status: 'read'
      },
      {
        id: 2,
        sender: 'Jane Smith',
        content: 'Meeting at 3 PM',
        timestamp: '2024-01-15T09:15:00Z',
        status: 'unread'
      }
    ];

    return {
      props: {
        messages,
        error: null,
        isLoading: false,
      },
    };
  } catch (error) {
    return {
      props: {
        messages: [],
        error: 'Failed to fetch messages',
        isLoading: false,
      },
    };
  }
}

function MessagesPage({ messages, error, isLoading }) {
  const [filter, setFilter] = useState('all');

  if (error) {
    return (
      <ErrorBoundary>
        <div className={styles.container}>
          <h1 className={styles.title}>Messages</h1>
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
          <h1 className={styles.title}>Messages</h1>
          <div className={styles.loading}>
            <Spinner />
            <p>Loading messages...</p>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <h1 className={styles.title}>Messages</h1>
        <div className={styles.filters}>
          <button 
            onClick={() => setFilter('all')}
            className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('unread')}
            className={`${styles.filterButton} ${filter === 'unread' ? styles.active : ''}`}
          >
            Unread
          </button>
        </div>
        
        <div className={styles.content}>
          {messages.map((message) => (
            <div key={message.id} className={styles.messageItem}>
              <div className={styles.messageHeader}>
                <h3 className={styles.messageSender}>{message.sender}</h3>
                <span className={styles.messageTime}>
                  {new Date(message.timestamp).toLocaleString()}
                </span>
              </div>
              <p className={styles.messageContent}>{message.content}</p>
              <span className={`${styles.messageStatus} ${styles[message.status]}`}>
                {message.status}
              </span>
            </div>
          ))}
          {messages.length === 0 && (
            <p className={styles.noData}>No messages found.</p>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default MessagesPage; 
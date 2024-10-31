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
export default function Diary() {
  return (
    <ErrorBoundary>
    <div className="container">
      <h1>My Diary</h1>
      <div className="diary-entries">
        {/* Diary entries will be listed here */}
      </div>
    </ErrorBoundary>
    </div>
    </ErrorBoundary>
  );
} 

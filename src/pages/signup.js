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
export default function Signup() {
  return (
    <ErrorBoundary>
    <div className="container">
      <h1>Sign Up</h1>
      <div className="signup-form">
        {/* Signup form will go here */}
      </div>
    </ErrorBoundary>
    </div>
    </ErrorBoundary>
  );
} 

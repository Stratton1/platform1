import React from "react";

const WelcomeBanner = ({ userName }) => {
  return (
    <div>
      <h1>Welcome, {userName}!</h1>
    </div>
  );
};

export default WelcomeBanner;

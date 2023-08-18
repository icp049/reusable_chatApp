import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const LandingPage = () => {
    const { currentUser } = useContext(AuthContext);

  const getGreetingMessage = () => {
    if (currentUser) {
      // If a user is logged in, show the greeting with the username
      return `Hi, ${currentUser.displayName || "user"}!`;
    } else {
      // If no user is logged in, show a generic message
      return "Welcome!";
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <h1>{getGreetingMessage()}</h1>
      </div>
    </div>
  );
};

export default LandingPage;
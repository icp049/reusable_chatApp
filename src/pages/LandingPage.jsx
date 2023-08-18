import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";


const LandingPage = () => {
    const { currentUser } = useContext(AuthContext);

  const getGreetingMessage = () => {
    if (currentUser) {
      // If a user is logged in, show the greeting with the username
      return `Hi, ${user.displayName || "user"}!`;
    } else {
      // If no user is logged in, show a generic message
      return "Welcome!";
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <h1>{getGreetingMessage()}</h1>
      </div>
    </div>
  );
};

export default LandingPage;
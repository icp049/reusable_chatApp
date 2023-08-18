import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {Link} from "react-router-dom";
import Landingpagenavbar from "../navbars/Landingpagenavbar";

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
        <Landingpagenavbar/>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <h1>{getGreetingMessage()}</h1>
      </div>

       <div>
        <Link to = "message"><h1> View Messages</h1></Link>
       </div>


    </div>

    
  );
};

export default LandingPage;
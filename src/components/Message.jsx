import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const [showTimestamp, setShowTimestamp] = useState(false);
  const [timeDisplay, setTimeDisplay] = useState("Just now");

  const ref = useRef();
  const timeoutRef = useRef(null); // To store the timeout reference

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });

    const calculateTimeDifference = () => {
      const formattedTimestamp = message.date?.toDate();
      const now = new Date();
      const timeDifferenceInSeconds = Math.floor(
        (now - formattedTimestamp) / 1000
      );

      if (timeDifferenceInSeconds <= 60) {
        setTimeDisplay("Just now");
      } else {
        setTimeDisplay(formattedTimestamp.toLocaleString());
      }
    };

    calculateTimeDifference();

    const interval = setInterval(calculateTimeDifference, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [message]);

  const handleToggleTimestamp = () => {
    setShowTimestamp(true);

    // Clear any previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout to hide the timestamp after 5 seconds
    timeoutRef.current = setTimeout(() => {
      setShowTimestamp(false);
    }, 5000);
  };

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
      onClick={handleToggleTimestamp}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        
      </div>

    

    
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
        {showTimestamp && <span className="timestamp">{timeDisplay}</span>}
      </div>
     
    </div>
    
  );
};

export default Message;

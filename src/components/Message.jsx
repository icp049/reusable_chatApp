import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const [timeDisplay, setTimeDisplay] = useState("Just now"); // Initial state

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });

    // Calculate the time difference and update time display
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

    calculateTimeDifference(); // Calculate initially

    // Recalculate the time difference after 1 minute
    const interval = setInterval(calculateTimeDifference, 60000); // 1 minute in milliseconds

    return () => {
      clearInterval(interval); // Clear interval on component unmount
    };
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
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
        <span className = "timestamp">{timeDisplay}</span> {/* Display formatted timestamp */}
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;

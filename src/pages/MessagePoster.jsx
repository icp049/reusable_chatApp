import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { setDoc, doc, serverTimestamp, Timestamp  } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const MessagePoster = ({ onClose, postedBy }) => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);

  const handleSend = async () => {
    if (!currentUser || !postedBy) {
      console.error("User or postedBy not available");
      return;
    }

    try {
      // Create the message object
      const message = {
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
        receiverId: currentUser.uid, // Assuming sender and receiver are the same for a new chat
        postedBy,
      };

      // Handle image upload if an image is provided
      if (img) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);

        await uploadTask;

        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        // Create a new chat document with the initial message
        await setDoc(doc(db, "chats", uuid()), {
          messages: [{
            ...message,
            img: downloadURL,
          }],
        });
      } else {
        // Create a new chat document with the initial message
        await setDoc(doc(db, "chats", uuid()), {
          messages: [message],
        });
      }

      // Additional actions if needed for the new chat scenario

      // Reset input fields
      setText("");
      setImg(null);
      onClose(); // Close the modal or perform other actions as needed
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default MessagePoster;

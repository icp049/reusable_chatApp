import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Landingpagenavbar from "../navbars/Landingpagenavbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { db } from "../firebase";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import ToggleSwitch from "../semicomponents/ToggleSwitch";

// Rename the component to MyNestPage
const MyNest = () => {
  const { currentUser } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        // Create a query to fetch all posts where "postedBy" matches the current user's username
        const postsQuery = query(
          collection(db, "Posts"),
          where("postedBy", "==", currentUser.displayName) // Assuming displayName matches the username
        );

        const postsQuerySnapshot = await getDocs(postsQuery);

        // Extract and set the user's posts
        const userPostsData = postsQuerySnapshot.docs.map((doc) => doc.data());
        setUserPosts(userPostsData);
      } catch (error) {
        console.error("Error fetching user's posts:", error);
      }
    };

    if (currentUser && currentUser.displayName) {
      fetchUserPosts();
    }
  }, [currentUser]);

  return (
    <Box>
      <Typography variant="h5">My Posts</Typography>
      {userPosts.length > 0 ? (
        <ul style={{ listStyleType: "none" }}>
          {userPosts.map((post, index) => (
            <li key={index} style={{ backgroundColor: "skyblue", borderRadius: "20px", width: "500px", height: "70px" }}>
              <h3 style={{ paddingTop: "10px" }}>{post.listingName}</h3>
              <ToggleSwitch />
              {/* ... Other post details ... */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts by you yet.</p>
      )}
    </Box>
  );
};

export default MyNest; // Export the renamed component

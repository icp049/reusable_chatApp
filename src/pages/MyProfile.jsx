import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Landingpagenavbar from "../navbars/Landingpagenavbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { db } from "../firebase";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import ToggleSwitch from "../semicomponents/ToggleSwitch";

import MyNest from "./MyNest";



const MyProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);



  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Fetch user details from the "profileDetails" collection
        const userDetailsQuery = query(
          collection(db, "users", currentUser.uid, "profileDetails")
        );
        const userDetailsQuerySnapshot = await getDocs(userDetailsQuery);

        if (!userDetailsQuerySnapshot.empty) {
          // Assuming there is only one document in "profileDetails" collection
          const userDoc = userDetailsQuerySnapshot.docs[0];
          setUserProfile(userDoc.data());
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (currentUser) {
      fetchUserDetails();
    }
  }, [currentUser]);

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


  const getGreetingMessage = () => {
    if (currentUser) {
      return ` @${currentUser.displayName}`;
    } else {
      return "Welcome!";
    }
  };

  return (
    <Box>
      <Landingpagenavbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          padding: "20px",
          gap: "40px",
          marginTop: "40px",
        }}
      >
        {/* Left Column: Profile Picture */}
        <Box
          sx={{
            flex: "0 0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <img
            src={currentUser.photoURL}
            alt="Profile"
            style={{
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              border: "2px solid #fff",
            }}
          />

          <Typography variant="h4">{getGreetingMessage()}</Typography>
          {/* Small Details */}
          <Typography variant="body1">
            {currentUser.email || "No email available"}
          </Typography>

          <Typography variant="body1">
            {userProfile ? userProfile.firstName : "No FirstName"}{" "}
            {userProfile ? userProfile.lastName : "No last Name"}
          </Typography>

          <Typography variant="body1">
            {userProfile ? userProfile.location : "Location not available"}
          </Typography>

          <Box sx={{ marginTop: "20px" }}>
            <Link to="/editprofile">
              <button>Edit My Profile</button>
            </Link>
          </Box>
        </Box>

        {/* Right Column: Description, Interests, etc. */}
        <Box
          sx={{
            flex: "1 1 auto",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            paddingTop: "50px",
          }}
        >
          {/* About Me */}
          <Box>
            <Typography variant="h5">
              {userProfile ? userProfile.firstName : ""} is...
            </Typography>
            <Typography>{userProfile?.aboutMe || ""}</Typography>
          </Box>

          {/* Snaps */}
          <Box>
            <Typography variant="h5">
              {userProfile ? userProfile.firstName : ""}'s Snaps
            </Typography>
            <div
              className="photo-grid"
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px",
              }}
            >
              {userProfile?.photos?.map((photoURL, index) => (
                <img
                  key={index}
                  src={photoURL}
                  alt={`Uploaded ${index}`}
                  style={{
                    maxWidth: "250px",
                    height: "auto",
                    borderRadius: "10px",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                />
              ))}
            </div>
          </Box>

          {/* Interests */}
          <Box>
            <Typography variant="h5">Interests</Typography>
            <Typography>{userProfile?.interests || ""}</Typography>
          </Box>

          {/* NestMate Preferences */}
          <Box>
            <Typography variant="h5">NestMate Preferences</Typography>
            <Typography>{userProfile?.nest || ""}</Typography>
          </Box>

          <Box>
            <Typography variant="h5">Nest Location</Typography>
            <Typography>{userProfile?.nestLocation || ""}</Typography>
          </Box>


          
          <Box>
            <Typography variant="h5">My Posts</Typography>
            {userPosts.length > 0 ? (
              <ul style = {{listStyleType: "none"}}>
                {userPosts.map((post, index) => (
                  <li key={index} style = {{backgroundColor: "skyblue", borderRadius: "20px", width: "500px", height: "70px" }}>

                    <h3 style = {{paddingTop: "10px"}}>{post.listingName}</h3>
                    <ToggleSwitch />


                    {/* ... Other post details ... */}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No posts by you yet.</p>
            )}
          </Box>
          <Link to="/mynest" state={{ userPosts }}>
  <button>Go to My Nest</button>
</Link>
         
        </Box>
        
      </Box>
    </Box>
  );
};

export default MyProfile;

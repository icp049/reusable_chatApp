import React, { useContext, useEffect, useState } from "react";
// ... other imports ...


import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Landingpagenavbar from "../navbars/Landingpagenavbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";


const MyProfile = () => {
  const { currentUser } = useContext(AuthContext);

  // Add your query to fetch additional user details here
  // const userDetailsQuery = useUserDetailsQuery(currentUser.id);

  const [userProfile, setUserProfile] = useState(null);


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Get a reference to the user's Firestore document
        const userDocRef = doc(db, "users", currentUser.uid, "profileDetails", "your-document-id");
        
        // Fetch the user's profile details
        const userProfileDoc = await getDoc(userDocRef);

        if (userProfileDoc.exists()) {
          const userProfileData = userProfileDoc.data();
          setUserProfile(userProfileData);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [currentUser.uid]);

  
  const getGreetingMessage = () => {
    if (currentUser) {
      return `Hi, ${currentUser.displayName || "there"}`;
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
          gap: "40px", // Add spacing between columns
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
              width: "400px", // Increase the size of the profile picture
              height: "400px", // Increase the size of the profile picture
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
              Ian Jericho Pedeglorio
          </Typography>

          <Typography variant="body1">
              Regina, SK
          </Typography>

          <Box sx={{ marginTop: "20px" }}>
            <Link to="/editprofile">
              <button>Edit My Profile</button>
            </Link>
          </Box>




          {/* Add more small details here */}
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
            <Typography variant="h5">Ian is...</Typography>
            <Typography>{userProfile?.aboutMe || ""}</Typography>
          </Box>


          <Box>
  <Typography variant="h5">Ian's Snaps</Typography>
  <div
    className="photo-grid"
    sx={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)", // Adjust the number of columns
      gap: "10px", // Adjust the gap between photos
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
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
        }}
      />
    ))}
  </div>
</Box>


          {/* Roommate Preferences */}
          <Box>
            <Typography variant="h5">Interests</Typography>
            <Typography>{userProfile?.interests || ""}</Typography>
          </Box>

          {/* Interests */}
          <Box>
            <Typography variant="h5">NestMate Preferences</Typography>
            <Typography>{userProfile?.nest || ""}</Typography>
          </Box>


          <Box>
            <Typography variant="h5">Nest Location</Typography>
            <Typography>{userProfile?.nestLocation || ""}</Typography>
          </Box>


          <Box>
            <Typography variant="h5">Ian's Nest</Typography>
            {/* Add query result here */}
            {/* <Typography>
              {userDetailsQuery.data?.interests || ""}
            </Typography> */}
            Put container boxes here later on
          </Box>

         
          
        </Box>
      </Box>
    </Box>
  );
};

export default MyProfile;

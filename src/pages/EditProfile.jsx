import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Landingpagenavbar from "../navbars/Landingpagenavbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const EditProfile = () => {
  const { currentUser } = useContext(AuthContext);

  // State to store the user's profile data
  const [profileData, setProfileData] = useState({
    displayName: currentUser.displayName || "",
    email: currentUser.email || "",
    aboutMe: "",
    snaps: "",
    interests: "",
    nestLocation: "",
    nest: "",
  });

  // Function to handle input changes
  const handleInputChange = (field, value) => {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Function to save profile data (you need to implement saving logic)
  const saveProfile = () => {
    // Implement your logic to save the profile data
    // For example: call an API to update the user's profile
    console.log("Profile data saved:", profileData);
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
          <Typography variant="h4">{`Hi, ${profileData.displayName || "there"}`}</Typography>
          {/* Small Details */}
          <input
            type="text"
            value={profileData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
          {/* Add more small details here */}

          <Link to="/edit-profile">
            <button onClick={saveProfile}>Save Profile</button>
          </Link>
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
            <Typography variant="h5">About Me</Typography>
            <textarea
              value={profileData.aboutMe}
              onChange={(e) => handleInputChange("aboutMe", e.target.value)}
            />
          </Box>

          <Box>
            <Typography variant="h5">Snaps</Typography>
            <textarea
              value={profileData.snaps}
              onChange={(e) => handleInputChange("snaps", e.target.value)}
            />
          </Box>

          {/* Roommate Preferences */}
          <Box>
            <Typography variant="h5">Interests</Typography>
            <textarea
              value={profileData.interests}
              onChange={(e) => handleInputChange("interests", e.target.value)}
            />
          </Box>

          {/* Interests */}
          <Box>
            <Typography variant="h5">NestMate Preferences</Typography>
            <textarea
              value={profileData.nest}
              onChange={(e) => handleInputChange("nest", e.target.value)}
            />
          </Box>

          <Box>
            <Typography variant="h5">Nest Location</Typography>
            <textarea
              value={profileData.nestLocation}
              onChange={(e) => handleInputChange("nestLocation", e.target.value)}
            />
          </Box>

          <Box>
            <Typography variant="h5">Nest</Typography>
            <textarea
              value={profileData.nest}
              onChange={(e) => handleInputChange("nest", e.target.value)}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProfile;

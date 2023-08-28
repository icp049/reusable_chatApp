import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Landingpagenavbar from "../navbars/Landingpagenavbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const MyProfile = () => {
  const { currentUser } = useContext(AuthContext);

  // Add your query to fetch additional user details here
  // const userDetailsQuery = useUserDetailsQuery(currentUser.id);

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
            <Link to="/edit-profile">
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
            {/* Add query result here */}
            {/* <Typography>
              {userDetailsQuery.data?.aboutMe || ""}
            </Typography> */}
          </Box>


          <Box>
            <Typography variant="h5">Ian's Snaps</Typography>
            {/* Add query result here */}
            {/* <Typography>
              {userDetailsQuery.data?.aboutMe || ""}
            </Typography> */}
          </Box>

          {/* Roommate Preferences */}
          <Box>
            <Typography variant="h5">Interests</Typography>
            {/* Add query result here */}
            {/* <Typography>
              {userDetailsQuery.data?.roommatePreferences || ""}
            </Typography> */}
          </Box>

          {/* Interests */}
          <Box>
            <Typography variant="h5">NestMate Preferences</Typography>
            {/* Add query result here */}
            {/* <Typography>
              {userDetailsQuery.data?.interests || ""}
            </Typography> */}
          </Box>


          <Box>
            <Typography variant="h5">Nest Location</Typography>
            {/* Add query result here */}
            {/* <Typography>
              {userDetailsQuery.data?.interests || ""}
            </Typography> */}
          </Box>


          <Box>
            <Typography variant="h5">Ian's Nest</Typography>
            {/* Add query result here */}
            {/* <Typography>
              {userDetailsQuery.data?.interests || ""}
            </Typography> */}
          </Box>

         
          
        </Box>
      </Box>
    </Box>
  );
};

export default MyProfile;

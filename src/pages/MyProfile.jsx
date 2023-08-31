import React, { useContext, useEffect, useState } from "react";
// ... other imports ...


import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Landingpagenavbar from "../navbars/Landingpagenavbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { db, auth } from "../firebase";
import { doc, getDocs, getDoc, collection } from "firebase/firestore";


const MyProfile = () => {
  const { currentUser } = useContext(AuthContext);

  // Add your query to fetch additional user details here
  // const userDetailsQuery = useUserDetailsQuery(currentUser.id);

  const [userProfile, setUserProfile] = useState(null);
  const [userMyPosts, setUserMyPosts] = useState([]);



    useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
  
          if (userDoc.exists()) {
            const userData = userDoc.data();
            // Here you can extract and set specific fields like first name, last name, location, etc.
            // For example:
           
            // Set the extracted fields to state or use them as needed

            const { firstName, lastName, location } = userData;

            // Set the extracted fields to state or use them as needed
            // For example, you can set them to state variables like this:
            // setUserFirstName(firstName);
            // setUserLastName(lastName);
            // setUserLocation(location);
    
            // Since you're using state, you can update your state for these fields
            setUserProfile({
              ...userProfile,
              firstName: firstName,
              lastName: lastName,
              location: location
            });
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };
  
      fetchUserDetails();
    }, [currentUser.uid]);
  












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






  function UserPostsComponent({ currentUser }) {
    const [userMyPosts, setUserMyPosts] = useState([]);
  }
    useEffect(() => {
      const fetchUserMyPosts = async () => {
        try {
          // Get a reference to the user's myPosts subcollection
          const myPostsCollectionRef = collection(db, 'users', currentUser.uid, 'myPosts');
          const myPostsQuerySnapshot = await getDocs(myPostsCollectionRef);
  
          // Extract the post IDs from the myPosts documents
          const postIds = myPostsQuerySnapshot.docs.map((doc) => doc.id);
  
          // Fetch post content using the IDs
          const userMyPostsData = await Promise.all(
            postIds.map(async (postId) => {
              const postDocRef = doc(db, 'Posts', postId);
              const postDoc = await getDoc(postDocRef);
              if (postDoc.exists()) {
                return { id: postId, ...postDoc.data() };
              }
              return null;
            })
          );
  
          setUserMyPosts(userMyPostsData.filter((post) => post !== null));
        } catch (error) {
          console.error("Error fetching user's myPosts:", error);
        }
      };
  
      if (currentUser && currentUser.uid) {
        fetchUserMyPosts();
      }
    }, [currentUser]);
  
  
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
          marginTop: "40px"
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
          {userProfile ? userProfile.firstName : "No FirstName"}   {userProfile ? userProfile.lastName : "No last Name"}
          </Typography>

          <Typography variant="body1">
          {userProfile ? userProfile.location : "Location not available"}
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
            <Typography variant="h5">{userProfile.firstName} is...</Typography>
            <Typography>{userProfile?.aboutMe || ""}</Typography>
          </Box>


          <Box>
  <Typography variant="h5">
    {userProfile? userProfile.firstName: ""}'s
    
    Snaps</Typography>
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
      <Typography variant="h5">{userProfile.firstName}'s' Nest</Typography>
      {userMyPosts.length > 0 ? (
        <ul>
          {userMyPosts.map((post) => (
            <li key={post.id}>
              {/* Display post content */}
              <h3>{post.listingName}</h3>
              <p>{post.description}</p>
              {/* ... Other post details ... */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts in Ian's Nest yet.</p>
      )}
    </Box>

         
          
        </Box>
      </Box>
    </Box>
  );
};

export default MyProfile;

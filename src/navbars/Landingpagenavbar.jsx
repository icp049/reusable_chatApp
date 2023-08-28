import { Box, IconButton } from '@mui/material';
import {
  
  SearchOutlined,
  ExitToAppOutlined, // 1. Import the ExitToAppOutlined icon
} from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {auth} from "../firebase"
const Landingpagenavbar = () => {
  const navigate = useNavigate(); // Hook to access the navigation function

  const { currentUser } = useContext(AuthContext);

  const handleLogout = () => {
    if (currentUser) {
      auth.signOut() // Assuming you have access to auth here
        .then(() => {
          navigate('/login');
        })
        .catch(error => {
          console.error('Error logging out:', error);
        });
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      backgroundColor="grey"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="2"
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          sx={{ ':hover': { cursor: "pointer" } }}
          color="blue"
        >
          <Link to = "/" >
          NestMates
          </Link>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >
          <Link to="/myprofile">My Profile</Link>
          <Link to="/message">Messages</Link>
          <Link to="">My Nest</Link>

          <IconButton sx={{ color: "black" }}>
            <SearchOutlined />
          </IconButton>

          {/* Logout Button */}
          <IconButton sx={{ color: "black" }} onClick={handleLogout}>
            <ExitToAppOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Landingpagenavbar;
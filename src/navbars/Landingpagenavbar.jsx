import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import { MenuOutlined, SearchOutlined, ExitToAppOutlined } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";

const Landingpagenavbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleLogout = () => {
    if (currentUser) {
      auth.signOut()
        .then(() => {
          navigate('/login');
        })
        .catch(error => {
          console.error('Error logging out:', error);
        });
    }
  };

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      backgroundColor="skyblue;"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="3"
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          sx={{ ':hover': { cursor: "pointer", textDecoration: "none", color: "black" } }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            NestMates
          </Link>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
          marginTop="20px"
        >
          <Box
            display={{ xs: 'block', md: 'none' }}
          >
            {/* Hamburger Menu */}
            <IconButton
              sx={{ color: "black"  }}
              onClick={handleMenuOpen}
            >
              <MenuOutlined />
            </IconButton>
            {/* Menu for small screens */}
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
            >
              <MenuItem component={Link} to="/myprofile" onClick={handleMenuClose}>
                My Profile
              </MenuItem>
              <MenuItem component={Link} to="/message" onClick={handleMenuClose}>
                Messages
              </MenuItem>
              <MenuItem component={Link} to="" onClick={handleMenuClose}>
                My Nest
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <IconButton sx={{ color: "black" }}>
                  <SearchOutlined />
                </IconButton>
              </MenuItem>
              <MenuItem onClick={() => { handleLogout(); handleMenuClose(); }}>
                <IconButton sx={{ color: "black" }}>
                  <ExitToAppOutlined />
                </IconButton>
              </MenuItem>
            </Menu>
          </Box>

          {/* Navigation Links (Visible on larger screens) */}
          <Box
            display={{ xs: 'none', md: 'flex' }}
            justifyContent="space-between"
            columnGap="20px"
            zIndex="2"
          >
            <Link to="/myprofile" style={{ textDecoration: "none", color: "black" }}>My Profile</Link>
            <Link to="/message" style={{ textDecoration: "none", color: "black" }}>Messages</Link>
            <Link to="" style={{ textDecoration: "none", color: "black" }}>My Nest</Link>

            <IconButton sx={{ color: "black" }}>
              <SearchOutlined />
            </IconButton>

            <IconButton sx={{ color: "black" }} onClick={handleLogout}>
              <ExitToAppOutlined />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Landingpagenavbar;

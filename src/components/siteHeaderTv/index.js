import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getAuth, signOut } from "firebase/auth";


const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeaderTv = ({ history }) => {
  const [user, setUser] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const auth = getAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  const sign = () => {
    signOut(auth).then(() => {
        localStorage.clear()
        setUser()
      }).catch((error) => {
        console.log(error)
      });
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("user");
    if (loggedIn) {
      const foundUser = JSON.parse(loggedIn);
      setUser(foundUser);
    }
  }, []);

  const menuOptions = [
    { label: "Discover Tv", path: "/tv" },
    { label: "Top Rated TV", path: "/tv/top" },
    { label: "Trending TV", path: "/tv/trending" },
    { label: "Favorite TV", path: "/tv/favorites" },
    { label: "Must Watch", path: "/tv/mustwatch" },
    { label: "Movies", path: "/movies" },
    { label: "Search", path: "/search" },
    { label: "Log Out", path: "/login" }
  ];




  const handleMenuSelect = (pageURL) => {
    if (pageURL === "/login") sign();
    navigate(pageURL, { replace: true });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            All you ever wanted to know about TV!
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1, mr: 1 }}>
            {user.email}
          </Typography>
            {isMobile ? (
              <>
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {menuOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <>
                {menuOptions.map((opt) => (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </Button>
                ))}
              </>
            )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeaderTv;
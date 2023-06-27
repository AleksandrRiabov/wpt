import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { ColorModeContext, tokens } from "../../theme";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";

const RightSideNavbar = () => {
  const [anchorElUser, setAnchorElUser] = useState<HTMLButtonElement | null>(
    null
  );

  const navigate = useNavigate();
  const { user, signOutUser } = UserAuth();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const isDarkMode = theme.palette.mode === "dark";

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate("/");
      console.log("User logged out!");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={`Switch to ${isDarkMode ? "Light" : "Dark"} Mode`}>
        <IconButton onClick={colorMode.toggleColorMode} sx={{ mr: 2 }}>
          {isDarkMode ? <LightModeOutlined /> : <DarkModeOutlined />}
        </IconButton>
      </Tooltip>
      {user ? (
        <Tooltip title={user.displayName || user.email}>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              alt={user.displayName || user.email || "User"}
              src={user.photoURL || "/static/images/avatar/2.jpg"}
            />
          </IconButton>
        </Tooltip>
      ) : (
        <Link to={"/login"}>
          <Typography
            variant="h4"
            sx={{ color: colors.secondary[500], display: "inline" }}
          >
            {" "}
            LOGIN
          </Typography>
        </Link>
      )}
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography onClick={handleSignOut} textAlign="center">
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default RightSideNavbar;

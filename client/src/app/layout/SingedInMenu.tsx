import { Button, Menu, MenuItem, Typography, Box, Avatar } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { signOut } from "../../features/account/accountSlice";
import { clearBasket } from "../../features/basket/basketSlice"; // ✅ Import correct action
import { useNavigate } from "react-router-dom";

export default function SignedInMenu() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.account);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(signOut());
    dispatch(clearBasket()); // ✅ Clear basket on logout
    navigate("/");
  };

  return (
    <Box>
      <Button
        color="inherit"
        onClick={handleClick}
        startIcon={
          <Avatar sx={{ width: 28, height: 28 }}>
            {user?.email?.charAt(0).toUpperCase()}
          </Avatar>
        }
        endIcon={<KeyboardArrowDown />}
        sx={{
          textTransform: 'none',
          color: 'text.primary',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {user?.email}
        </Typography>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 180,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            '& .MuiMenuItem-root': {
              typography: 'body2',
              px: 2,
              py: 1
            }
          }
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My orders</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem> {/* ✅ Working now */}
      </Menu>
    </Box>
  );
}

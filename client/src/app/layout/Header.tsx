import {
  AppBar,
  Switch,
  Toolbar,
  Typography,
  Box,
  List,
  ListItem,
  IconButton,
  Badge,
  styled,
  useTheme
} from "@mui/material";
import { NavLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const midLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: "none",
  typography: "h6",
  fontWeight: 500,
  margin: theme.spacing(0, 1.5),
  padding: theme.spacing(1, 0),
  position: "relative",
  transition: "all 0.3s ease",
  
  "&:hover": {
    color: theme.palette.secondary.light,
    transform: "translateY(-2px)",
  },
  
  "&.active": {
    color: theme.palette.secondary.main,
    fontWeight: "bold",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "60%",
      height: "3px",
      backgroundColor: theme.palette.secondary.main,
      borderRadius: "3px"
    }
  }
}));

export default function Header({ darkMode, handleThemeChange }: Props) {
  const theme = useTheme();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        mb: 4,
        background: darkMode 
          ? theme.palette.background.default 
          : "linear-gradient(135deg, rgba(35,44,175,1) 0%, rgba(100,187,245,1) 100%)",
        borderBottom: `1px solid ${theme.palette.divider}`,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 2, sm: 4 },
          maxWidth: "xl",
          mx: "auto",
          width: "100%"
        }}
      >
        {/* Logo + Theme Toggle */}
        <Box display="flex" alignItems="center">
          <Typography
            variant="h5"
            component={NavLink}
            to="/"
            sx={{
              color: "common.white",
              fontWeight: 700,
              letterSpacing: 1,
              mr: 3,
              textDecoration: "none",
              "&:hover": {
                color: "secondary.light"
              }
            }}
          >
            RE-STORE
          </Typography>
          
          <IconButton 
            onClick={handleThemeChange} 
            color="inherit"
            sx={{ ml: 1 }}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>

        {/* Middle Navigation */}
        <List sx={{ display: { xs: "none", md: "flex" } }}>
          {midLinks.map(({ title, path }) => (
            <ListItem 
              key={path} 
              disablePadding
              sx={{ width: "auto" }}
            >
              <StyledNavLink to={path}>
                {title.toUpperCase()}
              </StyledNavLink>
            </ListItem>
          ))}
        </List>

        {/* Right Side Actions */}
        <Box display="flex" alignItems="center">
          <IconButton 
            size="large" 
            color="inherit" 
            component={NavLink}
            to="/cart"
            sx={{ 
              mr: 2,
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)"
              }
            }}
          >
            <Badge
              badgeContent={4}
              color="secondary"
              sx={{
                "& .MuiBadge-badge": {
                  borderRadius: "50%",
                  fontSize: "0.75rem",
                  padding: "0 4px",
                  minWidth: "20px",
                  height: "20px",
                },
              }}
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <List sx={{ display: { xs: "none", sm: "flex" } }}>
            {rightLinks.map(({ title, path }) => (
              <ListItem 
                key={path} 
                disablePadding
                sx={{ width: "auto" }}
              >
                <StyledNavLink to={path}>
                  {title.toUpperCase()}
                </StyledNavLink>
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
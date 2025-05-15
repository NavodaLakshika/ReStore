import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  List,
  ListItem,
  IconButton,
  Badge,
  styled,
  useTheme,
  useMediaQuery,
  Button
} from "@mui/material";
import { NavLink, Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useStoreContext } from "../api/context/StoreContext";
import { useAppSelector } from "../store/configureStore";

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const midLinks = [
  
  { title: "Catalog", path: "/catalog" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

const rightLinks = [
  { title: "Login", path: "/login", variant: "outlined" },
  { title: "Register", path: "/register", variant: "contained" },
];

// Styled NavLink for mid & right links
const StyledNavLink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: "none",
  fontWeight: 500,
  fontSize: "1rem",
  margin: theme.spacing(0, 1.5),
  position: "relative",
  transition: "all 0.3s ease",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "2px",
    width: "0%",
    backgroundColor: theme.palette.primary.light,
    transition: "width 0.3s ease",
  },
  "&:hover::after": {
    width: "100%",
  },
  "&.active": {
    color: theme.palette.primary.main,
    fontWeight: 600,
    "&::after": {
      width: "100%",
    },
  },
}));

export default function Header({ darkMode, handleThemeChange }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { basket } = useAppSelector(state => state.basket);
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(250, 250, 250, 0.98)",
        backdropFilter: "blur(15px)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 2, md: 5 },
          py: 1,
          maxWidth: "1440px",
          mx: "auto",
        }}
      >
        {/* Logo + Nav Links */}
        <Box display="flex" alignItems="center">
          <Typography
            variant="h4"
            component={NavLink}
            to="/"
            sx={{
              fontWeight: 800,
              fontFamily: "Poppins, sans-serif",
              textDecoration: "none",
              background: "linear-gradient(90deg, #6366f1, #3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mr: 5,
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.05)" }
            }}
          >
            RE<span style={{ fontWeight: 300 }}>STORE</span>
          </Typography>

          {!isMobile && (
            <List sx={{ display: "flex", p: 0 }}>
              {midLinks.map(({ title, path }) => (
                <ListItem key={path} disablePadding>
                  <StyledNavLink to={path}>{title}</StyledNavLink>
                </ListItem>
              ))}
            </List>
          )}
        </Box>

        {/* Right Side */}
        <Box display="flex" alignItems="center" gap={2}>
          {/* Theme Switch */}
          <IconButton onClick={handleThemeChange} color="default">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {/* Cart */}
          <IconButton
            component={Link}
            to="/basket"
            sx={{
              color: theme.palette.text.primary,
              "&:hover": { transform: "scale(1.1)" },
              transition: "all 0.2s ease",
            }}
          >
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* Auth Links */}
          {!isMobile && rightLinks.map(({ title, path, variant }) => (
            <Button
              key={title}
              component={NavLink}
              to={path}
              variant={variant as "outlined" | "contained"}
              sx={{
                textTransform: "none",
                borderRadius: "20px",
                fontWeight: 500,
                px: variant === "outlined" ? 2 : 3,
                color: variant === "outlined" ? theme.palette.primary.main : "#fff",
                borderColor: variant === "outlined" ? theme.palette.primary.main : undefined,
                background: variant === "contained" ? "linear-gradient(90deg, #6366f1, #3b82f6)" : undefined,
                boxShadow: variant === "contained" ? "0 4px 14px rgba(59, 130, 246, 0.3)" : undefined,
                "&:hover": {
                  background: variant === "contained" ? "#4f46e5" : theme.palette.primary.light,
                  borderColor: theme.palette.primary.main,
                  boxShadow: variant === "contained" ? "0 6px 20px rgba(59, 130, 246, 0.4)" : undefined,
                },
              }}
            >
              {title}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

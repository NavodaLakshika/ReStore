import { AppBar, Switch, Toolbar, Typography, Box, List, ListItem, IconButton, Badge } from "@mui/material";
import { NavLink } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Correct import

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const midLinks = [
  { title: 'catalog', path: '/catalog' },
  { title: 'about', path: '/about' },
  { title: 'contact', path: '/contact' },
];

const rightLinks = [
  { title: 'login', path: '/login' },
  { title: 'register', path: '/register' },
];

const navStyles = { 
  color: 'inherit',
  textDecoration: 'none',
  typography: 'h6',
  '&:hover': { color: 'grey.500' },
  '&.active': { color: 'text.secondary' },
};

export default function Header({ darkMode, handleThemeChange }: Props) {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Left Side: Logo + Switch */}
        <Box display="flex" alignItems="center">
          <Typography 
            variant="h6" 
            noWrap 
            component={NavLink} 
            to="/"
            sx={navStyles}
          >
            RE-STORE
          </Typography>
          <Switch checked={darkMode} onChange={handleThemeChange} color="default" sx={{ ml: 2 }} />
        </Box>

        {/* Center: Navigation Links */}
        <List sx={{ display: 'flex' }}>
          {midLinks.map(({ path, title }) => (
            <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={navStyles}
            >
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        {/* Right Side: Cart + Auth Links */}
        <Box display="flex" alignItems="center">
          <IconButton size="large" edge="start" color="inherit" sx={{ ml: 2 }}>
            <Badge badgeContent={4} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <List sx={{ display: 'flex' }}>
            {rightLinks.map(({ path, title }) => (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={navStyles}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>

      </Toolbar>
    </AppBar>
  );
}

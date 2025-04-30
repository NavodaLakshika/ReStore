import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Catalog from '../../features/catalog/Catalog';
import Header from "./Header";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light'; 
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background:{
        default: paletteType === 'light' ? '#eaeaea' : '#121212' // Set the default background color based on the mode
      },
      } // Corrected here, use 'mode' instead of 'Mode'
    }
  )

   function handleThemeChange() {
    setDarkMode(!darkMode);
   }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures proper baseline styles are applied */}
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;

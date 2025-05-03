import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./Header";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#f5f7fa" : "#121212",
        paper: paletteType === "light" ? "#ffffff" : "#1e1e1e",
      },
      primary: {
        main: paletteType === "light" ? "#3f51b5" : "#90caf9", // Indigo / Light Blue
        contrastText: "#ffffff",
      },
      secondary: {
        main: paletteType === "light" ? "#ff4081" : "#f48fb1", // Pink tones
        contrastText: "#ffffff",
      },
      text: {
        primary: paletteType === "light" ? "#212121" : "#ffffff",
        secondary: paletteType === "light" ? "#555" : "#cccccc",
      },
    },
    typography: {
      fontFamily: "'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif",
      h4: {
        fontWeight: 700,
        textAlign: "center",
      },
      body1: {
        fontSize: "1rem",
      },
    },
    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingTop: "2rem",
            paddingBottom: "2rem",
          },
        },
      },
    },
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>
    <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;

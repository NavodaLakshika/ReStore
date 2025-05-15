import { Container, createTheme, CssBaseline, ThemeProvider, GlobalStyles } from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStoreContext } from "../api/context/StoreContext";
import { getCookie } from "../util/util";
import { agent } from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../features/basket/basketSlice";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => dispatch(setBasket(basket)))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#f5f7fa" : "#121212",
        paper: paletteType === "light" ? "#ffffff" : "#1e1e1e",
      },
      primary: {
        main: paletteType === "light" ? "#3f51b5" : "#90caf9",
        contrastText: "#ffffff",
      },
      secondary: {
        main: paletteType === "light" ? "#ff4081" : "#f48fb1",
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
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "none",
            fontWeight: 600,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: paletteType === "light" ? "0 4px 20px rgba(0,0,0,0.1)" : "0 4px 20px rgba(255,255,255,0.05)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            '&:hover': {
              transform: "translateY(-6px)",
              boxShadow: paletteType === "light" ? "0 6px 30px rgba(0,0,0,0.15)" : "0 6px 30px rgba(255,255,255,0.1)",
            },
          },
        },
      },
    },
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  if (loading) return <LoadingComponent message="Initialising App..." />;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { WebkitFontSmoothing: "antialiased" } }} />
      <CssBaseline />
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
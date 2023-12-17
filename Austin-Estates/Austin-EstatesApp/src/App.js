import * as React from "react";
import "./App.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";

import HomePage from "./HomePage";
import AboutUsPage from "./AboutUsPage";

import NotFoundPage from "./components/NotFoundPage";
import AddedPropertyPage from "./components/AddedPropertyPage";
import PropertyProfile from "./components/PropertyProfile";

import AddProperty from "./AddProperty";
import FilterProperties from "./FilterProperties";
import Client from "./Client";
import Landlord from "./Landlord";
import Landlords from "./LandlordsPage";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: "#003580",
          },
          secondary: {
            main: "#f50057",
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: "#003580",
          },
          secondary: {
            main: "#f50057",
          },
        }),
  },
  overrides: {
    MuiSwitch: {
      root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: 8,
      },
      switchBase: {
        padding: 1,
        "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
          transform: "translateX(16px)",
          color: "#fff",
          "& + $track": {
            opacity: 1,
            border: "none",
          },
        },
      },
      thumb: {
        width: 24,
        height: 24,
      },
      track: {
        borderRadius: 13,
        border: "1px solid #bdbdbd",
        backgroundColor: "#fafafa",
        opacity: 1,
        transition:
          "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
    },
  },
  shape: {
    borderRadius: 0,
  },
  typography: {
    fontFamily: "Source Sans Pro",
  },
});

const themeOptions = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#27285C",
    },
    secondary: {
      main: "#f50057",
    },
  },
  overrides: {
    MuiSwitch: {
      root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: 8,
      },
      switchBase: {
        padding: 1,
        "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
          transform: "translateX(16px)",
          color: "#fff",
          "& + $track": {
            opacity: 1,
            border: "none",
          },
        },
      },
      thumb: {
        width: 24,
        height: 24,
      },
      track: {
        borderRadius: 13,
        border: "1px solid #bdbdbd",
        backgroundColor: "#fafafa",
        opacity: 1,
        transition:
          "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: "Montserrat",
  },
});

const themeOptions2 = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#228a8a",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#303030",
      paper: "#424242",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255,255,255,0.7)",
      disabled: "rgba(255,255,255,0.7)",
      hint: "rgba(255,255,255,0.5)",
    },
  },
  overrides: {
    MuiSwitch: {
      root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: 8,
      },
      switchBase: {
        padding: 1,
        "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
          transform: "translateX(16px)",
          color: "#fff",
          "& + $track": {
            opacity: 1,
            border: "none",
          },
        },
      },
      thumb: {
        width: 24,
        height: 24,
      },
      track: {
        borderRadius: 13,
        border: "1px solid #bdbdbd",
        backgroundColor: "#fafafa",
        opacity: 1,
        transition:
          "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: "Montserrat",
  },
});

const themes = [themeOptions, themeOptions2];
export let changeTheme;

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export default function App() {
  const [mode, setMode] = React.useState(
    localStorage.getItem("mode") ?? "light"
  );
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
        localStorage.setItem(
          "mode",
          localStorage.getItem("mode") === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  React.useEffect(() => {
    // clearData();
    // loadUserData();
  }, []);

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route
            path="/Home"
            element={
              <Header
                Component={HomePage}
                ThemeHandler={colorMode.toggleColorMode}
              />
            }
          />
          <Route
            path="/"
            element={
              <Header
                Component={HomePage}
                ThemeHandler={colorMode.toggleColorMode}
              />
            }
          />
          <Route
            path="/About"
            element={
              <Header
                Component={AboutUsPage}
                ThemeHandler={colorMode.toggleColorMode}
              />
            }
          />
          <Route
            path="/FilterProperties"
            element={
              <Header
                Component={FilterProperties}
                ThemeHandler={colorMode.toggleColorMode}
              />
            }
          />
          <Route
            path="*"
            element={
              <Header
                Component={NotFoundPage}
                ThemeHandler={colorMode.toggleColorMode}
              />
            }
          />
          <Route
            path="/Landlord/:id"
            element={
              <Header
                Component={Landlord}
                ThemeHandler={colorMode.toggleColorMode}
              />
            }
          />
          <Route
            path="/AddProperty/:id"
            element={
              <Header
                Component={AddProperty}
                ThemeHandler={colorMode.toggleColorMode}
              />
            }
          />
          <Route
            path="/Client/:id"
            element={
              <Header
                Component={Client}
                ThemeHandler={colorMode.toggleColorMode}
              />
            }
          />
          <Route
            path="/Landlords"
            element={
              <Header
                Component={Landlords}
                ThemeHandler={colorMode.toggleColorMode}
              />
            }
          />
          
          <Route
            path="/AddedPropertyPage"
            element={
              <Header
                Component={AddedPropertyPage}
                ThemeHandler={colorMode.toggleColorMode}
              />
            }
          />
          
          <Route
            path="/PropertyProfile/:id"
            element={
              <Header
                Component={PropertyProfile}
                ThemeHandler={colorMode.toggleColorMode}
              />
            }
          />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

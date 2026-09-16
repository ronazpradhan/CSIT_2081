import { Nunito } from "next/font/google";

import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import localFont from "next/font/local";

export const nunito = Nunito({ weight: ["600", "700", "800"], subsets: ["latin"], display: "swap" });

export const fonts = {
  "Nunito": nunito,
};

const productSans = localFont({
  src: [
    {
      path: "../public/static/fonts/Product Sans/ProductSans.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/static/fonts/Product Sans/ProductSans-Bold.woff",
      weight: "700",
      style: "bold",
    },
  ],
});

// Create a theme instance.
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 720,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: "#1e3a8a",
      light: "#3b82f6",
      dark: "#1e40af",
    },
    secondary: {
      main: "#4f46e5",
      light: "#818cf8",
      dark: "#3730a3",
    },
    background: {
      default: "#f0f4f8",
      paper: "#ffffff",
    },
    error: {
      main: red.A400,
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: `'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif`,
    fontWeightRegular: 600,
    fontWeightMedium: 700,
    fontWeightBold: 800,
    h1: { fontFamily: "'Fredoka One', 'Comic Sans MS', cursive" },
    h2: { fontFamily: "'Fredoka One', 'Comic Sans MS', cursive" },
    h3: { fontFamily: "'Fredoka One', 'Comic Sans MS', cursive" },
    h4: { fontFamily: "'Fredoka One', 'Comic Sans MS', cursive" },
    h5: { fontFamily: "'Fredoka One', 'Comic Sans MS', cursive", fontWeight: 900 },
    h6: { fontFamily: "'Fredoka One', 'Comic Sans MS', cursive", fontWeight: 900 },
    button: { fontWeight: 900 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#fefefe",
          backgroundImage: `
            linear-gradient(90deg, transparent 60px, #ff9aa2 60px, #ff9aa2 64px, transparent 64px),
            linear-gradient(#e1e8f0 2px, transparent 2px)
          `,
          backgroundSize: "100% 100%, 100% 40px",
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "4px solid #333",
          boxShadow: "6px 6px 0px #333",
          transition: "transform 0.1s, box-shadow 0.1s",
          "&:hover": {
            transform: "translate(-2px, -2px)",
            boxShadow: "8px 8px 0px #333",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "3px solid #333",
        },
        elevation1: { boxShadow: "4px 4px 0px #333" },
        elevation2: { boxShadow: "6px 6px 0px #333" },
        elevation3: { boxShadow: "8px 8px 0px #333" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: "3px solid #333",
          boxShadow: "3px 3px 0px #333",
          textTransform: "none",
          fontWeight: 900,
          "&:hover": {
            transform: "translate(-2px, -2px)",
            boxShadow: "5px 5px 0px #333",
          },
          "&:active": {
            transform: "translate(1px, 1px)",
            boxShadow: "2px 2px 0px #333",
          }
        },
        containedPrimary: {
          backgroundColor: "#c7ceea",
          color: "#333",
          "&:hover": { backgroundColor: "#b5bce0" }
        },
        outlinedPrimary: {
          backgroundColor: "#fff",
          color: "#333",
          borderColor: "#333",
          "&:hover": { borderColor: "#333", backgroundColor: "#fefefe" }
        }
      }
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: "#1e3a8a",
          "&.Mui-checked": {
            color: "#1e3a8a",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 12,
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;

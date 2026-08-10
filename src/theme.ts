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
      main: "#0f766e",
      light: "#14b8a6",
      dark: "#115e59",
    },
    secondary: {
      main: "#06b6d4",
      light: "#67e8f9",
      dark: "#0e7490",
    },
    background: {
      default: "#f0fdf4",
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
    fontFamily: `${nunito.style.fontFamily}, sans-serif`,
    fontWeightRegular: 600,
    fontWeightMedium: 700,
    fontWeightBold: 800,
    body1: {
      fontWeight: 600,
    },
    body2: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },
    h6: {
      fontWeight: 800,
      letterSpacing: "-0.01em",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 10px 30px -5px rgba(15, 118, 110, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 20px 40px -10px rgba(15, 118, 110, 0.15), 0 8px 16px -4px rgba(0, 0, 0, 0.06)",
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: "#0f766e",
          "&.Mui-checked": {
            color: "#0f766e",
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

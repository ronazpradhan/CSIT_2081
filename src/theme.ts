import { Plus_Jakarta_Sans } from "next/font/google";
import { createTheme } from "@mui/material/styles";

export const sans = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap", variable: "--font-sans" });

export const fontClassNames = sans.variable;

const SANS = `var(--font-sans), "Segoe UI", system-ui, sans-serif`;
// Codes and timers use the same face with tabular figures so digits line up.
export const MONO = SANS;

// "Exam desk": warm paper, ink, and one red-pen accent. Light only.
const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
    primary: { main: "#a32a17", light: "#c4432d", dark: "#7f1f10", contrastText: "#ffffff" },
    secondary: { main: "#1f3a5f", light: "#3a5a85", dark: "#132640", contrastText: "#ffffff" },
    background: { default: "#f6f2ea", paper: "#ffffff" },
    text: { primary: "#1a1714", secondary: "#4f483f", disabled: "#857b6e" },
    divider: "rgba(60, 45, 25, 0.18)",
    error: { main: "#b42318" },
  },
  breakpoints: {
    values: { xs: 0, sm: 720, md: 900, lg: 1200, xl: 1536 },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: SANS,
    fontSize: 15,
    h1: { fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.05 },
    h2: { fontWeight: 700, letterSpacing: "-0.01em" },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700, fontSize: "1.35rem", lineHeight: 1.3 },
    body1: { lineHeight: 1.6 },
    body2: { lineHeight: 1.6, fontSize: "0.95rem" },
    button: { fontWeight: 700, textTransform: "none", letterSpacing: 0, fontSize: "1rem" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        html: {
          WebkitTapHighlightColor: "transparent",
          colorScheme: "light",
          scrollBehavior: "smooth",
          "@media (prefers-reduced-motion: reduce)": { scrollBehavior: "auto" },
        },
        // Keep anchored headings clear of the fixed header.
        "[id]": { scrollMarginTop: 88 },
        body: {
          fontVariantNumeric: "tabular-nums",
          WebkitFontSmoothing: "antialiased",
        },
        "::selection": {
          backgroundColor: theme.vars.palette.primary.main,
          color: theme.vars.palette.primary.contrastText,
        },
        "*": { caretColor: theme.vars.palette.primary.main },
        // Strong, always-visible keyboard focus ring.
        ":focus-visible": {
          outline: `3px solid ${theme.vars.palette.secondary.main}`,
          outlineOffset: 3,
          borderRadius: 6,
        },
        "@media (prefers-reduced-motion: reduce)": {
          "*, *::before, *::after": { animationDuration: "0.01ms !important", transitionDuration: "0.01ms !important" },
        },
        a: { textUnderlineOffset: "0.2em" },
        "::-webkit-scrollbar": { width: 10, height: 10 },
        "::-webkit-scrollbar-track": { background: "transparent" },
        "::-webkit-scrollbar-thumb": {
          background: theme.vars.palette.divider,
          borderRadius: 10,
          border: `2px solid ${theme.vars.palette.background.default}`,
        },
      }),
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: { root: { backgroundImage: "none" } },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 14,
          border: `1px solid ${theme.vars.palette.divider}`,
          backgroundColor: theme.vars.palette.background.paper,
          boxShadow: "0 1px 2px rgba(40, 28, 10, 0.04), 0 8px 24px -12px rgba(40, 28, 10, 0.12)",
        }),
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 20,
          minHeight: 44,
          transition: "background-color .2s cubic-bezier(.16,1,.3,1), transform .2s cubic-bezier(.16,1,.3,1)",
          "&:active": { transform: "scale(0.98)" },
        },
        sizeLarge: { paddingBlock: 11, fontSize: "0.98rem" },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 10,
          backgroundColor: theme.vars.palette.background.default,
          "& .MuiOutlinedInput-notchedOutline": { borderColor: theme.vars.palette.divider },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: theme.vars.palette.text.disabled },
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({ borderColor: theme.vars.palette.divider }),
        head: ({ theme }) => ({
          fontWeight: 600,
          fontSize: "0.72rem",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: theme.vars.palette.text.secondary,
        }),
      },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 600, borderRadius: 999 } },
    },
    MuiDialog: {
      styleOverrides: { paper: { borderRadius: 16 } },
    },
  },
});

export default theme;

import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CloudOffRoundedIcon from "@mui/icons-material/CloudOffRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import Logo from "./Logo";

export default function Navbar() {
  const [online, setOnline] = useState(
    typeof window === "undefined" || navigator.onLine
  );

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "Asia/Kathmandu",
  });

  return (
    <>
      <Box
        component="a"
        href="#main"
        sx={{
          position: "fixed",
          top: 8,
          left: 8,
          zIndex: 2000,
          px: 2,
          py: 1.25,
          borderRadius: 2,
          fontWeight: 700,
          backgroundColor: "secondary.main",
          color: "secondary.contrastText",
          transform: "translateY(-200%)",
          "&:focus": { transform: "none" },
        }}
      >
        Skip to main content
      </Box>

      <AppBar
        component="header"
        elevation={0}
        position="fixed"
        sx={{
          backgroundColor: "background.default",
          color: "text.primary",
          borderBottom: 1,
          borderColor: "divider",
          zIndex: 1500,
        }}
      >
        <Box sx={{ height: "env(safe-area-inset-top)" }} />
        <Container>
          <Toolbar disableGutters sx={{ minHeight: { xs: 60, sm: 68 }, gap: { xs: 1, sm: 2 } }}>
            <Box component="a" href="/" aria-label="CSIT 2081 home" sx={{ display: "flex", alignItems: "center", gap: 1.25, flexGrow: 1, minWidth: 0, color: "inherit", textDecoration: "none" }}>
              <Logo size={34} />
              <Typography
                component="p"
                sx={{ fontSize: { xs: "1.3rem", sm: "1.45rem" }, fontWeight: 800, letterSpacing: "-0.01em", lineHeight: 1 }}
              >
                CSIT{" "}
                <Box component="span" sx={{ color: "primary.main" }}>
                  2081
                </Box>
              </Typography>
            </Box>

            {!online && (
              <Box
                role="status"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  color: "text.primary",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 999,
                  backgroundColor: "#fdecc8",
                }}
              >
                <CloudOffRoundedIcon sx={{ fontSize: 18 }} aria-hidden />
                Offline
              </Box>
            )}

            <Typography
              component="p"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                px: 1.5,
                py: 0.75,
                borderRadius: 999,
                border: 1,
                borderColor: "divider",
                backgroundColor: "background.paper",
                fontSize: "0.9rem",
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              <CalendarTodayRoundedIcon sx={{ fontSize: 16, color: "primary.main" }} aria-hidden />
              {today}
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

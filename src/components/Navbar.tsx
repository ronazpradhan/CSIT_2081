import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const drawerWidth = 240;
// const navItems = ["Home", "About", "Contact"];
const navItems = [];

function DrawerAppBar(props: {
  text: string;
  window?: () => Window;
}) {
  const { window: _window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const [online, setOnline] = useState(
    typeof window === "undefined" || navigator.onLine
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.addEventListener("online", () => setOnline(true));
    window.addEventListener("offline", () => setOnline(false));
    return () => {
      window.removeEventListener("online", () => setOnline(true));
      window.removeEventListener("offline", () => setOnline(false));
    };
  }, []);

  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsInstallable(!window.matchMedia("(display-mode: standalone)").matches);
    }
  }, []);

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => {
      setDeferredPrompt(null);
      setIsInstallable(false);
    });
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  const [installDialogOpen, setInstallDialogOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {props.text}
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    _window !== undefined ? () => _window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          component="nav"
          sx={{
            background: "linear-gradient(90deg, #0f766e, #06b6d4)",
            zIndex: 1500, // just greater than dropdown,
          }}
        >
          <Box
            sx={{
              height: "env(safe-area-inset-top)",
            }}
          ></Box>
          <Toolbar>
            {navItems.length ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            ) : null}
            <Typography
              variant="h6"
              component="div"
              sx={{
                textAlign: "center",
                flexGrow: 1,
                fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" },
                fontWeight: "bold",
              }}
            >
              {props.text} {online ? "" : "- Offline"}
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button key={item} sx={{ color: "#fff" }}>
                  {item}
                </Button>
              ))}
            </Box>
            {isInstallable && (
              <Button 
                onClick={() => {
                  if (deferredPrompt) {
                    handleInstall();
                  } else {
                    setInstallDialogOpen(true);
                  }
                }}
                variant="outlined" 
                size="small"
                sx={{ 
                  color: "#fff", 
                  borderColor: "rgba(255,255,255,0.5)",
                  marginLeft: 1,
                  "&:hover": { borderColor: "#fff", background: "rgba(255,255,255,0.1)" }
                }}
              >
                Install App
              </Button>
            )}
          </Toolbar>
        </AppBar>
        
        <Dialog
          open={installDialogOpen}
          onClose={() => setInstallDialogOpen(false)}
          aria-labelledby="install-dialog-title"
          aria-describedby="install-dialog-description"
        >
          <DialogTitle id="install-dialog-title">
            Install App Manually
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="install-dialog-description">
              It looks like your browser isn't triggering the automatic install prompt.
              <br/><br/>
              <b>On Android (Chrome):</b> Tap the three dots menu (⋮) at the top right and select <b>"Add to Home screen"</b>.
              <br/><br/>
              <b>On iPhone (Safari):</b> Tap the Share button (square with an arrow pointing up) at the bottom and select <b>"Add to Home Screen"</b>.
              <br/><br/>
              <b>On Desktop:</b> Look for an install icon (a screen with a down arrow) on the far right of your address bar.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setInstallDialogOpen(false)} autoFocus>
              Got it
            </Button>
          </DialogActions>
        </Dialog>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;

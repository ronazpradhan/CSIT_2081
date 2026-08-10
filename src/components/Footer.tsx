import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Link from "next/link";
import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <Toolbar
      variant="dense"
      sx={{
        background: "linear-gradient(90deg, #0f766e, #06b6d4)",
        minHeight: "36px !important",
        p: "0.2rem env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left) !important",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          py: "0.25rem",
        }}
      >
        <Link
          href="https://github.com/ronazpradhan/CSIT_2081"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "white",
            margin: "0.1rem 0.5rem",
            fontSize: "0.85rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* add github icon */}
          <GitHubIcon
            style={{
              marginRight: "0.35rem",
              fontSize: "1rem",
            }}
          />
          GitHub Repository
        </Link>
      </Box>
    </Toolbar>
  );
};

export default Footer;

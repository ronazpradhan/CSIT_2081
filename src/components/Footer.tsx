import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

const INK = "#1a1714";
const PAPER = "#f6f2ea";
const MUTED = "#b9b0a3";

const quickLinks = [
  { label: "Subjects", href: "#subjects-heading" },
  { label: "Front page generator", href: "#fpg-heading" },
  { label: "Feedback", href: "#feedback-heading" },
];

const linkSx = {
  color: PAPER,
  fontWeight: 600,
  fontSize: "0.95rem",
  textDecorationColor: "rgba(246, 242, 234, 0.4)",
  "&:hover": { textDecorationColor: PAPER },
  "&:focus-visible": { outlineColor: PAPER },
};

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: { xs: 2, sm: 4 },
        backgroundColor: INK,
        color: PAPER,
        pb: "calc(env(safe-area-inset-bottom) + 8px)",
        pl: "env(safe-area-inset-left)",
        pr: "env(safe-area-inset-right)",
      }}
    >
      <Container sx={{ pt: { xs: 4, sm: 5 }, pb: 3 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr auto" },
            gap: { xs: 3, sm: 6 },
            alignItems: "start",
          }}
        >
          <Box>
            <Typography sx={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.01em", lineHeight: 1 }}>
              CSIT{" "}
              <Box component="span" sx={{ color: "#f07a62" }}>
                2081
              </Box>
            </Typography>
            <Typography sx={{ color: MUTED, mt: 1, fontSize: "0.95rem", maxWidth: "38ch" }}>
              Syllabus, exams and front pages for the 2081 BSc. CSIT batch, all in one place.
            </Typography>
          </Box>

          <Box component="nav" aria-label="Footer">
            <Box
              component="ul"
              sx={{
                listStyle: "none",
                m: 0,
                p: 0,
                display: "flex",
                flexDirection: { xs: "row", sm: "column" },
                flexWrap: "wrap",
                gap: { xs: "8px 20px", sm: 1 },
              }}
            >
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} underline="hover" sx={linkSx}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            mt: { xs: 3.5, sm: 4.5 },
            pt: 2.5,
            borderTop: "1px solid rgba(246, 242, 234, 0.14)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Link
            href="https://github.com/ronazpradhan/CSIT_2081"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{ ...linkSx, display: "inline-flex", alignItems: "center", gap: 0.75, fontSize: "0.9rem", color: MUTED }}
          >
            <GitHubIcon sx={{ fontSize: 18 }} aria-hidden />
            Source code on GitHub
          </Link>
          <ButtonBase
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.75,
              height: 40,
              px: 2,
              borderRadius: 999,
              fontWeight: 700,
              fontSize: "0.9rem",
              color: INK,
              backgroundColor: PAPER,
              transition: "transform .2s cubic-bezier(.16,1,.3,1)",
              "&:hover": { transform: "translateY(-2px)" },
              "&.Mui-focusVisible": { outline: `3px solid ${PAPER}`, outlineOffset: 3 },
              "& svg": { transition: "transform .25s cubic-bezier(.16,1,.3,1)" },
              "&:hover svg": { transform: "translateY(-2px)" },
            }}
          >
            <ArrowUpwardRoundedIcon sx={{ fontSize: 18 }} aria-hidden />
            Back to top
          </ButtonBase>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

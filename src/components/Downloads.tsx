import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { downloads } from "../constants/downloads";
import EditOnGithubButton from "./EditOnGithubButton";

export function GradientButton({
  name,
  link,
  bgColor,
  bgImage,
  onClick,
}: {
  name: string | React.ReactNode;
  link: string;
  bgColor: string;
  bgImage: string;
  onClick?: () => void;
}) {
  return (
    <Button
      href={link}
      onClick={onClick}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        textAlign: "left",
        color: "white",
        fontSize: "1.1rem",
        minWidth: "6.2rem",
        borderRadius: "0.75rem",
        height: "5.4rem",
        fontWeight: "bold",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        px: 1.6,
        m: 1,
        lineHeight: 1.2,
        backgroundColor: bgColor,
        backgroundImage: bgImage,
        boxShadow: `0 8px 16px -4px ${bgColor}66`,
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-3px) scale(1.02)",
          boxShadow: `0 14px 28px -4px ${bgColor}99`,
        },
      }}
    >
      {name}
    </Button>
  );
}

export default function Downlaods() {
  return (
    <>
      <Card
        sx={{
          mt: 2,
          display: "flex",
          borderRadius: ".6rem",
          "&:hover": {
            boxShadow:
              "0 20px 20px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
          },
        }}
        elevation={3}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent
            sx={{
              flex: 1,
              position: "relative",
              pb: 0,
              pt: 2,
            }}
          >
            <EditOnGithubButton link="https://github.com/CSIT21/blob/main/src/constants/downloads.tsx" />
            <Typography variant="h5" component="div">
              Downloads
            </Typography>
            <Box
              sx={{
                my: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {downloads.map(
                (
                  { name, link, onClick, bgColor, bgImage },
                  index
                ) => (
                  <GradientButton
                    key={index}
                    name={name}
                    link={link}
                    onClick={onClick}
                    bgColor={bgColor}
                    bgImage={bgImage}
                  />
                )
              )}
            </Box>
          </CardContent>
        </Box>
      </Card>
    </>
  );
}

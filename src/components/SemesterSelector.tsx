import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Sem } from "../constants/types";

export default function SemesterSelector({
  sem,
  setSem,
}: {
  sem: Sem;
  setSem: (sem: Sem) => void;
}) {
  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: "1rem",
        background: "linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)",
        border: "1px solid rgba(15, 118, 110, 0.15)",
      }}
      elevation={2}
    >
      <CardContent sx={{ p: 2, pb: "16px !important" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#0f766e",
              fontWeight: 800,
              fontSize: "1.05rem",
              mb: 1,
            }}
          >
            Select Semester
          </Typography>
          <Box sx={{ width: "100%", maxWidth: "400px" }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: { xs: 1, sm: 1.5 },
                width: "100%",
                justifyItems: "center",
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => {
                const isSelected = sem === `sem${s}`;
                let ordinal = "th";
                if (s === 1) ordinal = "st";
                else if (s === 2) ordinal = "nd";
                else if (s === 3) ordinal = "rd";
                const label = `${s}${ordinal} Sem`;

                return (
                  <Button
                    key={s}
                    variant={isSelected ? "contained" : "outlined"}
                    onClick={() => setSem(`sem${s}` as Sem)}
                    size="small"
                    sx={{
                      width: "100%",
                      minWidth: 0,
                      p: { xs: 0.5, sm: 1 },
                      borderRadius: "0.5rem",
                      fontWeight: 700,
                      fontSize: { xs: "0.75rem", sm: "0.85rem" },
                      backgroundColor: isSelected ? "#0f766e" : "transparent",
                      color: isSelected ? "#fff" : "#0f766e",
                      borderColor: "#0f766e",
                      "&:hover": {
                        backgroundColor: isSelected
                          ? "#0d645e"
                          : "rgba(15, 118, 110, 0.04)",
                        borderColor: "#0d645e",
                      },
                    }}
                  >
                    {label}
                  </Button>
                );
              })}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

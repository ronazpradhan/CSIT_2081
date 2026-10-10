import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { Sem } from "../constants/types";


export default function SemesterSelector({
  sem,
  setSem,
}: {
  sem: Sem;
  setSem: (sem: Sem) => void;
}) {
  return (
    <Box
      role="group"
      aria-labelledby="semester-label"
      sx={{
        display: "inline-grid",
        gridTemplateColumns: "repeat(8, minmax(38px, 1fr))",
        gap: "3px",
        p: "3px",
        borderRadius: 999,
        border: 1,
        borderColor: "divider",
        backgroundColor: "background.paper",
        width: { xs: "100%", sm: "auto" },
      }}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => {
        const isSelected = sem === `sem${s}`;
        return (
          <ButtonBase
            key={s}
            aria-pressed={isSelected}
            aria-label={`Semester ${s}`}
            onClick={() => setSem(`sem${s}` as Sem)}
            sx={{
              height: 44,
              minWidth: { sm: 48 },
              borderRadius: 999,
              fontSize: "1.05rem",
              fontWeight: 700,
              color: isSelected ? "primary.contrastText" : "text.primary",
              backgroundColor: isSelected ? "primary.main" : "transparent",
              transition: "background-color .25s cubic-bezier(.16,1,.3,1), color .25s",
              "&:hover": {
                backgroundColor: isSelected ? "primary.main" : "action.hover",
                color: isSelected ? "primary.contrastText" : "text.primary",
              },
              "&.Mui-focusVisible": {
                outline: 2,
                outlineColor: "primary.main",
                outlineOffset: 2,
              },
            }}
          >
            {s}
          </ButtonBase>
        );
      })}
    </Box>
  );
}

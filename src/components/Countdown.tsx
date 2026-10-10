import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MONO } from "../theme";

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function getTimeLeft(target: Date): TimeLeft | null {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown({
  title,
  subtitle,
  yyyymmddDate,
}: {
  title: string;
  subtitle?: string;
  yyyymmddDate: `${number}/${number}/${number}`;
}) {
  const target = new Date(yyyymmddDate + " GMT+05:45");
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() => getTimeLeft(target));

  useEffect(() => {
    const startDay = new Date(yyyymmddDate + " GMT+05:45");
    const tick = () => setTimeLeft(getTimeLeft(startDay));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [yyyymmddDate]);

  const dateLabel = target.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "Asia/Kathmandu",
  });

  const units = timeLeft
    ? [
        { label: "days", value: timeLeft.days },
        { label: "hrs", value: timeLeft.hours },
        { label: "min", value: timeLeft.minutes },
        { label: "sec", value: timeLeft.seconds },
      ]
    : [];

  return (
    <Box
      component="section"
      aria-label="Next exam countdown"
      sx={{
        position: "relative",
        p: { xs: 2.25, sm: 2.75 },
        borderRadius: "14px",
        border: 1,
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
        <Typography
          component="h2"
          sx={{ fontSize: "1.25rem", fontWeight: 700 }}
        >
          Next exam:{" "}
          <Box component="span" sx={{ color: "primary.main" }}>
            {title}
          </Box>
        </Typography>
        <Typography sx={{ fontSize: "0.95rem", fontWeight: 700, color: "text.secondary" }}>
          {dateLabel}
        </Typography>
      </Box>
      {subtitle && (
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.25 }}>
          {subtitle}
        </Typography>
      )}

      {timeLeft ? (
        <Box
          role="timer"
          aria-live="off"
          aria-label={timeLeft ? `${timeLeft.days} days, ${timeLeft.hours} hours and ${timeLeft.minutes} minutes left` : undefined}
          sx={{
            mt: 2,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: { xs: 1, sm: 1.5 },
          }}
        >
          {units.map((unit) => (
            <Box key={unit.label} sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
              <Typography
                sx={{
                  fontFamily: MONO,
                  fontVariantNumeric: "tabular-nums",
                  fontSize: { xs: "2rem", sm: "2.6rem" },
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {unit.value.toString().padStart(2, "0")}
              </Typography>
              <Typography sx={{ fontSize: "0.9rem", color: "text.secondary", fontWeight: 700 }}>
                {unit.label}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography sx={{ mt: 1.5, fontWeight: 600, color: "primary.main" }}>
          Underway today. Good luck!
        </Typography>
      )}
    </Box>
  );
}

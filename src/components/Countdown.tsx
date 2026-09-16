import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function Countdown({
  text,
  yyyymmddDate,
  hideTomorrow,
}: {
  text?: string;
  yyyymmddDate: `${number}/${number}/${number}`;
  hideTomorrow?: boolean;
}) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  const nowDate = new Date();
  const [hideDate, setHideDate] = useState(
    hideTomorrow
      ? new Date(nowDate.setDate(nowDate.getDate() + 1))
      : nowDate
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const current = new Date();
      setHideDate(
        hideTomorrow
          ? new Date(current.setDate(current.getDate() + 1))
          : current
      );
    }, 60000);
    return () => clearInterval(interval);
  }, [hideTomorrow]);

  useEffect(() => {
    const startDay = new Date(yyyymmddDate + " GMT+05:45");
    function updateCounter() {
      const now = new Date();
      const diff = startDay.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeLeft((prev) => {
          if (prev?.days === 0 && prev?.hours === 0 && prev?.minutes === 0 && prev?.seconds === 0) {
            return prev;
          }
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        });
        return;
      }
      
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }

    const interval = setInterval(updateCounter, 1000);
    updateCounter();
    return () => clearInterval(interval);
  }, [yyyymmddDate]);

  const startDay = new Date(yyyymmddDate + " GMT+05:45");

  if (startDay < hideDate) {
    if (!text) return null;
    if (startDay > new Date()) {
      return (
        <Typography
          variant="h5"
          component="div"
          sx={{
            textAlign: "center",
            marginBottom: ".8rem",
            color: "#1e3a8a",
            fontWeight: 800
          }}
        >
          {text} tomorrow
        </Typography>
      );
    } else {
      return null;
    }
  }

  if (!timeLeft) return null;

  return (
    <Box sx={{ my: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {text && (
        <Typography variant="h6" sx={{ color: '#1e3a8a', fontWeight: 800, mb: 2 }}>
          {text}
        </Typography>
      )}
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          gap: { xs: 2, sm: 4 },
          justifyContent: 'center',
          backgroundColor: 'rgba(30, 58, 138, 0.08)',
          borderRadius: 2,
          py: 1.5,
          px: { xs: 3, sm: 5 },
        }}
      >
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Mins', value: timeLeft.minutes },
          { label: 'Secs', value: timeLeft.seconds },
        ].map((unit, index) => (
          <Box key={unit.label} sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, sm: 4 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h4" sx={{ color: '#1e3a8a', fontWeight: 800, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                {unit.value.toString().padStart(2, '0')}
              </Typography>
              <Typography variant="caption" sx={{ color: '#1e3a8a', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.65rem' }}>
                {unit.label}
              </Typography>
            </Box>
            {index < 3 && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" sx={{ color: 'rgba(30, 58, 138, 0.4)', fontWeight: 800 }}>
                  :
                </Typography>
              </Box>
            )}
          </Box>
        ))}
      </Paper>
    </Box>
  );
}

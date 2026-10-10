import { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { classRoutine } from "../constants/classRoutine";
import { Sem } from "../constants/types";

// Same slots the full ClassRoutine table uses (Nepal time).
const slots = [
  { start: "6:30", end: "7:35", from: 6 * 60 + 30, to: 7 * 60 + 35 },
  { start: "7:35", end: "8:45", from: 7 * 60 + 35, to: 8 * 60 + 45 },
  { start: "9:15", end: "10:45", from: 9 * 60 + 15, to: 10 * 60 + 45 },
  { start: "10:45", end: "11:45", from: 10 * 60 + 45, to: 11 * 60 + 45 },
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function nepalNow() {
  const npt = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" }));
  return { day: weekDays[npt.getDay()], minutes: npt.getHours() * 60 + npt.getMinutes() };
}

type ClassEntry = { subjects: { shortName: string; name: string }[]; teacher: string };

// A routine cell is either [subject, teacherOrRoom] or a list of those (electives).
function toEntry(cell: any): ClassEntry {
  const parts = Array.isArray(cell[0]) ? cell : [cell];
  return {
    subjects: parts.map((p: any) => p[0]).filter(Boolean),
    teacher: parts
      .map((p: any) => String(p[1] ?? ""))
      .filter((t: string) => t && !/^\d+$/.test(t))
      .join(" / "),
  };
}

function Toggle<T extends string>({
  label,
  options,
  value,
  onChange,
  format = (v) => v,
}: {
  label: string;
  options: T[];
  value: T;
  onChange: (v: T) => void;
  format?: (v: T) => string;
}) {
  return (
    <Box role="group" aria-label={label} sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
      {options.map((opt) => {
        const selected = opt === value;
        return (
          <ButtonBase
            key={opt}
            aria-pressed={selected}
            onClick={() => onChange(opt)}
            sx={{
              px: 1.75,
              height: 36,
              borderRadius: 999,
              fontWeight: 700,
              fontSize: "0.9rem",
              color: selected ? "primary.contrastText" : "text.primary",
              backgroundColor: selected ? "secondary.main" : "action.hover",
              transition: "background-color .2s",
              "&:hover": { backgroundColor: selected ? "secondary.main" : "action.selected" },
            }}
          >
            {format(opt)}
          </ButtonBase>
        );
      })}
    </Box>
  );
}

export default function TodayClasses({ sem }: { sem: Sem }) {
  const routine = (classRoutine as any)[sem] as { day: string; a: any[]; b: any[] }[] | undefined;
  const days = useMemo(() => (routine || []).map((r) => r.day), [routine]);

  const [now, setNow] = useState(nepalNow);
  useEffect(() => {
    const t = setInterval(() => setNow(nepalNow()), 30000);
    return () => clearInterval(t);
  }, []);

  const [section, setSection] = useState<"a" | "b">(() => {
    try {
      return localStorage.getItem("section") === "b" ? "b" : "a";
    } catch {
      return "a";
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("section", section);
    } catch {}
  }, [section]);

  const isClassDay = days.includes(now.day);
  const [day, setDay] = useState<string>(now.day);
  useEffect(() => {
    // On off-days (or a sem without that day) fall back to the next class day.
    if (days.includes(now.day)) {
      setDay(now.day);
    } else if (days.length) {
      const start = weekDays.indexOf(now.day);
      const next = [1, 2, 3, 4, 5, 6, 7].map((i) => weekDays[(start + i) % 7]).find((d) => days.includes(d));
      setDay(next || days[0]);
    }
  }, [days, now.day]);

  if (!routine || routine.length === 0) return null;

  const row = routine.find((r) => r.day === day) || routine[0];
  const entries: ClassEntry[] = (row[section] || []).map(toEntry);
  const viewingToday = day === now.day;
  const allDone = viewingToday && entries.length > 0 && now.minutes >= slots[entries.length - 1].to;

  const heading = viewingToday
    ? "Today's classes"
    : `${isClassDay ? "Classes on" : "No classes today. Next up:"} ${day}`;

  return (
    <Card component="section" aria-labelledby="today-heading" sx={{ p: { xs: 2, sm: 2.5 } }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1.5, flexWrap: "wrap", mb: 2 }}>
        <Typography id="today-heading" variant="h6" component="h2">
          {heading}
        </Typography>
        <Toggle<"a" | "b">
          label="Section"
          options={["a", "b"] as ("a" | "b")[]}
          value={section}
          onChange={setSection}
          format={(v) => `Section ${v.toUpperCase()}`}
        />
      </Box>

      <Box sx={{ mb: 2, overflowX: "auto", mx: -0.5, px: 0.5, pb: 0.5 }}>
        <Toggle
          label="Day"
          options={days}
          value={day}
          onChange={setDay}
          format={(d) => (d === now.day ? `${d} · today` : d)}
        />
      </Box>

      <Box component="ol" sx={{ listStyle: "none", m: 0, p: 0, display: "flex", flexDirection: "column", gap: 1 }}>
        {entries.map((entry, i) => {
          const slot = slots[i];
          const live = viewingToday && slot && now.minutes >= slot.from && now.minutes < slot.to;
          const done = viewingToday && slot && now.minutes >= slot.to;
          return (
            <Box
              component="li"
              key={i}
              aria-current={live ? "time" : undefined}
              sx={{
                display: "grid",
                gridTemplateColumns: "92px 1fr",
                alignItems: "center",
                gap: 1.5,
                px: 1.5,
                py: 1.25,
                borderRadius: 2,
                backgroundColor: live ? "rgba(163, 42, 23, 0.08)" : "background.default",
                outline: live ? 2 : 0,
                outlineColor: "primary.main",
                opacity: done ? 0.55 : 1,
              }}
            >
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", lineHeight: 1.2 }}>
                  {slot ? slot.start : "–"}
                </Typography>
                <Typography sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
                  {slot ? `to ${slot.end}` : ""}
                </Typography>
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: "1.05rem" }} noWrap>
                    {entry.subjects.map((s) => s.shortName).join(" / ")}
                  </Typography>
                  {live && (
                    <Box
                      component="span"
                      sx={{
                        fontSize: "0.72rem",
                        fontWeight: 800,
                        letterSpacing: "0.04em",
                        px: 1,
                        py: 0.25,
                        borderRadius: 999,
                        color: "primary.contrastText",
                        backgroundColor: "primary.main",
                      }}
                    >
                      NOW
                    </Box>
                  )}
                </Box>
                <Typography sx={{ fontSize: "0.88rem", color: "text.secondary" }} noWrap>
                  {entry.subjects.map((s) => s.name).join(" / ")}
                  {entry.teacher ? ` · ${entry.teacher}` : ""}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>

      {allDone && (
        <Typography sx={{ mt: 1.5, fontSize: "0.9rem", color: "text.secondary", fontWeight: 600 }}>
          That&apos;s all for today.
        </Typography>
      )}
    </Card>
  );
}

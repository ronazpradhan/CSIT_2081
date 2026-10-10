import React, { useEffect, useMemo, useRef, useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { subjects } from "../constants/subjects";
import { classRoutine } from "../constants/classRoutine";
import { getSubjectTheme } from "../constants/subjectThemes";
import useFrontPageGenerator, { prefetchDocument } from "../utils/frontPageGenerator";
import { useBaseStore, useWordStore } from "../store";
import { Sem } from "../constants/types";

function readSaved(key: string, fallback = "") {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

function findTeacher(sem: Sem, subject: string) {
  for (const day of classRoutine[sem] || []) {
    for (const cell of [...day.a, ...day.b]) {
      const parts = Array.isArray(cell[0]) ? cell : [cell];
      for (const [subj, who] of parts as any[]) {
        if (subj?.shortName === subject && who && !/Lab/.test(who) && !/^\d+$/.test(who)) return String(who);
      }
    }
  }
  return "";
}

function semLabel(sem: Sem) {
  const n = sem.replace("sem", "");
  const suffix = n === "1" ? "st" : n === "2" ? "nd" : n === "3" ? "rd" : "th";
  return `${n}${suffix} Semester`;
}

// A scaled-down, faithful sketch of the Word template so students see what they'll get.
function CoverPreview({
  subjectName,
  teacher,
  name,
  roll,
  sem,
  ink,
}: {
  subjectName: string;
  teacher: string;
  name: string;
  roll: string;
  sem: Sem;
  ink: string;
}) {
  const blank = (v: string, placeholder: string) =>
    v ? (
      <Box component="span" sx={{ fontWeight: 700 }}>
        {v}
      </Box>
    ) : (
      <Box component="span" sx={{ color: "#b3aa9c" }}>
        {placeholder}
      </Box>
    );

  return (
    <Box
      aria-label="Preview of your front page"
      role="img"
      sx={{
        width: { xs: 170, sm: 190 },
        aspectRatio: "1 / 1.414",
        flexShrink: 0,
        backgroundColor: "#fff",
        borderRadius: "4px",
        boxShadow: "0 1px 2px rgba(40,28,10,.08), 0 14px 30px -14px rgba(40,28,10,.35)",
        p: "14px 12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        color: "#1a1714",
        fontSize: "6.4px",
        lineHeight: 1.45,
        transform: "rotate(-1.5deg)",
        transition: "transform .4s cubic-bezier(.16,1,.3,1)",
        ".fpg:hover &": { transform: "rotate(0deg) translateY(-2px)" },
        userSelect: "none",
      }}
    >
      <Box sx={{ fontWeight: 800, fontSize: "7.2px", letterSpacing: "0.02em" }}>TRIBHUWAN UNIVERSITY</Box>
      <Box sx={{ fontWeight: 800, fontSize: "7.2px", letterSpacing: "0.02em" }}>VEDAS COLLEGE</Box>
      <Box sx={{ color: "#5d554a" }}>Jawalakhel, Lalitpur Nepal</Box>
      <Box component="img" src="/static/images/cover-logo.png" alt="" sx={{ width: 34, my: "8px" }} />
      <Box sx={{ fontSize: "7px", mb: "auto", px: 0.5 }}>
        Subject:{" "}
        <Box component="span" sx={{ fontWeight: 800, color: ink }}>
          {subjectName}
        </Box>
      </Box>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", textAlign: "left", gap: "6px" }}>
        <Box sx={{ minWidth: 0 }}>
          <Box sx={{ fontWeight: 800, textDecoration: "underline" }}>Submitted To:</Box>
          <Box sx={{ overflowWrap: "anywhere" }}>{blank(teacher, "Teacher's name")}</Box>
          <Box>Department of BSc. CSIT</Box>
          <Box sx={{ mt: "4px" }}>Date: ______</Box>
        </Box>
        <Box sx={{ minWidth: 0, textAlign: "right" }}>
          <Box sx={{ fontWeight: 800, textDecoration: "underline" }}>Submitted By:</Box>
          <Box sx={{ overflowWrap: "anywhere" }}>{blank(name, "Your name")}</Box>
          <Box>Roll No: {blank(roll, "–")}</Box>
          <Box>{semLabel(sem)}</Box>
        </Box>
      </Box>
    </Box>
  );
}

export default function FrontPageGenerator({ sem }: { sem: Sem }) {
  const wordFileLoaded = useBaseStore((state) => state.wordFileLoaded);

  const semSubjects = useMemo(
    () => Object.entries(subjects[sem] || {}).map(([key, val]: [string, any]) => ({ key, ...val })),
    [sem]
  );

  const [subject, setSubject] = useState(semSubjects[0]?.key ?? "");
  const [customName, setCustomName] = useState(() => readSaved("fpg:name"));
  const [customRoll, setCustomRoll] = useState(() => readSaved("fpg:roll"));
  const [teacherName, setTeacherName] = useState("");
  const [justDownloaded, setJustDownloaded] = useState(false);

  useEffect(() => {
    setSubject(semSubjects[0]?.key ?? "");
  }, [semSubjects]);

  // Prefill the teacher from the class routine (when one exists), still editable.
  useEffect(() => {
    setTeacherName(readSaved(`fpg:teacher:${sem}:${subject}`) || findTeacher(sem, subject));
  }, [sem, subject]);

  useEffect(() => save("fpg:name", customName), [customName]);
  useEffect(() => save("fpg:roll", customRoll), [customRoll]);

  const wordFiles = useWordStore() as any;
  const { generateFrontPage, error, loading, setError } = useFrontPageGenerator();

  useEffect(() => {
    setError(null);
    if (subject) {
      prefetchDocument({ sem, wordFiles, subject, roll: parseInt(customRoll) || 1, setLoad: false });
    }
  }, [subject, setError]); // eslint-disable-line react-hooks/exhaustive-deps

  // Flash a "Downloaded" state when a generation finishes without error.
  const wasLoading = useRef(false);
  useEffect(() => {
    const finished = wasLoading.current && !loading;
    wasLoading.current = loading;
    if (finished && !error) {
      setJustDownloaded(true);
      const t = setTimeout(() => setJustDownloaded(false), 2500);
      return () => clearTimeout(t);
    }
  }, [loading, error]);

  const [fieldError, setFieldError] = useState<"name" | "roll" | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = customName.trim();
    if (!name) {
      setFieldError("name");
      setError("Enter your name so it appears on the cover.");
      return;
    }
    const numRoll = parseInt(customRoll, 10);
    if (isNaN(numRoll) || numRoll < 1 || numRoll > 99) {
      setFieldError("roll");
      setError("Roll number should be between 1 and 99.");
      return;
    }
    setFieldError(null);
    save(`fpg:teacher:${sem}:${subject}`, teacherName.trim());
    generateFrontPage({
      sem,
      roll: numRoll,
      customName: name,
      customRoll: String(numRoll),
      subject,
      assignmentNumber: 1,
      teacherName: teacherName.trim(),
      wordFiles,
    });
  };

  const current = semSubjects.find((s) => s.key === subject);
  const theme = getSubjectTheme(current?.name);

  return (
    <Card component="section" aria-labelledby="fpg-heading" className="fpg" sx={{ overflow: "hidden" }}>
      {/* Desk strip with the live preview */}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 2.5,
          p: { xs: 2.5, sm: 3 },
          pb: { xs: 3, sm: 3.5 },
          backgroundColor: theme.bg,
          transition: "background-color .4s cubic-bezier(.16,1,.3,1)",
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography id="fpg-heading" variant="h6" component="h2">
            Front page generator
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
            Your cover page, ready to print. Fill in the details and download it as a Word file.
          </Typography>
        </Box>
        <CoverPreview
          subjectName={current?.name || "—"}
          teacher={teacherName.trim()}
          name={customName.trim()}
          roll={customRoll}
          sem={sem}
          ink={theme.ink}
        />
      </Box>

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ p: { xs: 2.5, sm: 3 }, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Box>
          <Typography id="fpg-subject-label" component="p" sx={{ fontWeight: 700, fontSize: "0.9rem", mb: 1 }}>
            Subject
          </Typography>
          <Box role="radiogroup" aria-labelledby="fpg-subject-label" sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
            {semSubjects.map((s) => {
              const t = getSubjectTheme(s.name);
              const Icon = t.icon;
              const selected = s.key === subject;
              return (
                <ButtonBase
                  key={s.key}
                  role="radio"
                  aria-checked={selected}
                  aria-label={s.name}
                  onClick={() => setSubject(s.key)}
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.75,
                    height: 38,
                    pl: 1.25,
                    pr: 1.5,
                    borderRadius: 999,
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    border: 1.5,
                    borderColor: selected ? t.ink : "transparent",
                    color: selected ? t.ink : "text.primary",
                    backgroundColor: t.bg,
                    transition: "border-color .2s, transform .2s cubic-bezier(.16,1,.3,1)",
                    "&:hover": { borderColor: t.ink },
                    "&:active": { transform: "scale(0.96)" },
                  }}
                >
                  <Icon sx={{ fontSize: 18, color: t.ink }} aria-hidden />
                  {s.shortName}
                </ButtonBase>
              );
            })}
          </Box>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 110px", gap: 1.5 }}>
          <TextField
            label="Your name"
            value={customName}
            onChange={(e) => {
              setCustomName(e.target.value.substring(0, 20));
              if (fieldError === "name") setFieldError(null);
            }}
            autoComplete="name"
            error={fieldError === "name"}
            required
          />
          <TextField
            label="Roll no."
            value={customRoll}
            onChange={(e) => {
              setCustomRoll(e.target.value.replace(/\D/g, "").slice(0, 2));
              if (fieldError === "roll") setFieldError(null);
            }}
            error={fieldError === "roll"}
            slotProps={{ htmlInput: { inputMode: "numeric", pattern: "[0-9]*" } }}
            required
          />
        </Box>

        <TextField
          label="Submitted to (teacher)"
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value.substring(0, 60))}
          placeholder="Leave empty to write it by hand"
          slotProps={{ inputLabel: { shrink: true } }}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={loading}
          color={justDownloaded ? "success" : "primary"}
          startIcon={
            loading ? (
              <CircularProgress size={18} variant="determinate" value={wordFileLoaded} color="inherit" />
            ) : justDownloaded ? (
              <CheckRoundedIcon />
            ) : (
              <DownloadRoundedIcon />
            )
          }
          sx={{ mt: 0.5 }}
        >
          {loading ? "Preparing your file…" : justDownloaded ? "Downloaded. Check your files" : "Download front page (.docx)"}
        </Button>

        {error ? (
          <Typography role="alert" sx={{ color: "error.main", fontSize: "0.9rem", fontWeight: 600, mt: -0.5 }}>
            {error}
          </Typography>
        ) : (
          <Typography sx={{ color: "text.secondary", fontSize: "0.82rem", mt: -0.5, textAlign: "center" }}>
            Your name and roll number are remembered on this device.
          </Typography>
        )}
      </Box>
    </Card>
  );
}

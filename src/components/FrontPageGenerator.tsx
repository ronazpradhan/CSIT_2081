import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState, useMemo } from "react";
import TextField from "@mui/material/TextField";
import { subjects } from "../constants/subjects";
import { classRoutine } from "../constants/classRoutine";
import { prefetchDocument } from "../utils/frontPageGenerator";
import useFrontPageGenerator from "../utils/frontPageGenerator";
import CircularProgress from "@mui/material/CircularProgress";
import { useBaseStore, useWordStore } from "../store";
import { Sem } from "../constants/types";

export default function FrontPageGenerator({ sem }: { sem: Sem }) {
  const wordFileLoaded = useBaseStore((state) => state.wordFileLoaded);

  const semSubjectList = useMemo(() => {
    const semData = subjects[sem] || {};
    return Object.entries(semData).map(([key, val]: [string, any]) => ({
      shortHand: key,
      longHand: `${val.name} (${val.shortName || key})`,
    }));
  }, [sem]);

  const [subject, setSubject] = useState(
    semSubjectList.length > 0 ? semSubjectList[0].shortHand : ""
  );

  const [customName, setCustomName] = useState("");
  const [customRoll, setCustomRoll] = useState("1");
  const [teacherName, setTeacherName] = useState("");

  useEffect(() => {
    if (semSubjectList.length > 0) {
      setSubject(semSubjectList[0].shortHand);
    }
  }, [sem, semSubjectList]);

  useEffect(() => {
    // Attempt to find the teacher's name in the classRoutine
    let foundTeacher = "";
    const semRoutine = classRoutine[sem as keyof typeof classRoutine];
    if (semRoutine && subject) {
      for (const day of semRoutine) {
        const classes = [...day.a, ...day.b];
        for (const cls of classes) {
          // Check if it is a nested array (e.g., electives)
          if (Array.isArray(cls[0])) {
            for (const nestedCls of cls) {
              if (
                nestedCls[0]?.shortName === subject &&
                nestedCls[1] &&
                !String(nestedCls[1]).includes("Lab") &&
                !String(nestedCls[1]).match(/^\d+$/)
              ) {
                foundTeacher = String(nestedCls[1]);
                break;
              }
            }
          } else {
            if (
              cls[0]?.shortName === subject &&
              cls[1] &&
              !String(cls[1]).includes("Lab") &&
              !String(cls[1]).match(/^\d+$/)
            ) {
              foundTeacher = String(cls[1]);
              break;
            }
          }
          if (foundTeacher) break;
        }
        if (foundTeacher) break;
      }
    }
    setTeacherName(foundTeacher);
  }, [sem, subject]);

  const wordFiles = useWordStore() as any;
  const { generateFrontPage, error, loading, setError } = useFrontPageGenerator();

  useEffect(() => {
    setError(null);
    if (subject) {
      prefetchDocument({
        sem,
        wordFiles,
        subject,
        roll: parseInt(customRoll) || 1,
        setLoad: false,
      });
    }
  }, [subject, customRoll, setError]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card
      sx={{
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
        <FormControl
          component="form"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            if (!customName || customName.length > 20) {
              setError("Please enter a valid name (max 20 characters).");
              return;
            }
            const numRoll = parseInt(customRoll, 10);
            if (isNaN(numRoll) || numRoll < 1 || numRoll > 99) {
              setError("Please enter a valid roll number between 1 and 99.");
              return;
            }
            generateFrontPage({
              sem,
              roll: numRoll,
              customName,
              customRoll,
              subject,
              assignmentNumber: 1,
              teacherName,
              wordFiles,
            });
          }}
        >
          <CardContent
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h6" component="div">
              Front Page Generator
            </Typography>

            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={customName}
              onChange={(e) => setCustomName(e.target.value.substring(0, 20))}
              placeholder="Enter your name"
              required
            />

            <TextField
              fullWidth
              type="number"
              label="Roll Number"
              variant="outlined"
              value={customRoll}
              onChange={(e) => setCustomRoll(e.target.value)}
              inputProps={{ min: 1, max: 99 }}
              required
            />

            <FormControl fullWidth>
              <InputLabel>Subject</InputLabel>
              <Select
                label="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value as string)}
                required
              >
                {semSubjectList.map((subj) => (
                  <MenuItem key={subj.shortHand} value={subj.shortHand}>
                    {subj.longHand}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          </CardContent>
          <CardActions
            sx={{
              flexWrap: "wrap",
            }}
          >
            <Button type="submit" size="small">
              Generate Front Page
            </Button>
            {error ? (
              <Typography
                sx={{
                  color: "#ee8888",
                  px: 1,
                  fontSize: "0.8125rem",
                }}
              >
                {error}
              </Typography>
            ) : loading ? (
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <CircularProgress
                  size={24}
                  variant="determinate"
                  value={100}
                  sx={{
                    position: "absolute",
                    mx: 2,
                    opacity: loading ? 0.25 : 0,
                  }}
                />
                <CircularProgress
                  size={24}
                  variant="determinate"
                  value={wordFileLoaded}
                  sx={{
                    mx: 2,
                    opacity: loading ? 1 : 0,
                  }}
                />
              </Box>
            ) : null}
          </CardActions>
        </FormControl>
      </Box>
    </Card>
  );
}

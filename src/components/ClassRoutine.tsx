import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Fragment, useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Skeleton from "@mui/material/Skeleton";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useBaseStore } from "../store";
import ContributeDialog from "./ContributeDialog";
import { classRoutine } from "../constants/classRoutine";
import EditOnGithubButton from "./EditOnGithubButton";
import { Sem } from "../constants/types";

const tCellStyles = {
  px: { xs: 0.6, sm: 1.5 },
  py: { xs: 0.5, sm: 1 },
  fontSize: { xs: "0.8rem", sm: "0.875rem" },
  textAlign: "center",
  border: "1px solid rgba(15, 118, 110, 0.12)",
};

const DAYS_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri"];

type ClickOpens = "syllabus" | "notes" | "question" | "meet";

const RoutineTableCell = ({
  onlySection,
  section,
  routineRow,
  isToday,
  isTomorrow,
  setContributeDialogOpen,
  setContributeDialogTitle,
}: {
  onlySection: boolean;
  section: string;
  routineRow: any;
  isToday?: boolean;
  isTomorrow?: boolean;
  setContributeDialogOpen: (open: boolean) => void;
  setContributeDialogTitle: (title: string) => void;
}) => {
  return routineRow[section].map((subjectsAndRoom: any, index: number) => {
    let subject: any;
    let room: string = "";
    if (!Array.isArray(subjectsAndRoom[0])) {
      subject = subjectsAndRoom?.[0];
      room = subjectsAndRoom?.[1];
    }
    const cell = (
      <TableCell
        role={subject?.microSyllabus ? "button" : null}
        onClick={() => {
          const clickOpens: ClickOpens =
            (localStorage.getItem("clickOpens") as ClickOpens) ||
            "syllabus";
          if (clickOpens === "syllabus") {
            if (subject?.microSyllabus) {
              window.open(subject.microSyllabus, "_blank");
            } else {
              setContributeDialogOpen(true);
              setContributeDialogTitle(
                `${subject?.shortName} syllabus not found`
              );
            }
          }
          if (clickOpens === "notes") {
            if (subject?.notes) {
              window.open(subject.notes, "_blank");
            } else {
              setContributeDialogOpen(true);
              setContributeDialogTitle(
                `${subject?.shortName} notes not found`
              );
            }
          }
          if (clickOpens === "question") {
            if (subject?.questions) {
              window.open(subject.questions, "_blank");
            } else {
              setContributeDialogOpen(true);
              setContributeDialogTitle(
                `${subject?.shortName} question bank not found`
              );
            }
          }
        }}
        key={index}
        sx={{
          ...tCellStyles,
          backgroundColor: isToday
            ? "rgba(15, 118, 110, 0.08)"
            : isTomorrow
            ? "rgba(6, 182, 212, 0.06)"
            : "inherit",
          transition: "all .15s ease",
          cursor: subject?.microSyllabus ? "pointer" : null,
          "&:hover": {
            backgroundColor: subject?.microSyllabus
              ? "rgba(15, 118, 110, 0.18)"
              : null,
          },
          whiteSpace: "pre-wrap",
          fontWeight: 600,
        }}
      >
        <span style={{ fontWeight: 700, color: "#0f766e" }}>{subject?.shortName}</span>
        <br />
        <span style={{ fontSize: "0.8rem", color: "#666" }}>{room}</span>
      </TableCell>
    );

    const breakCell =
      index === 1 ? (
        <TableCell
          key={`break-${index}`}
          align="center"
          sx={{
            ...tCellStyles,
            backgroundColor: isToday
              ? "rgba(15, 118, 110, 0.12)"
              : isTomorrow
              ? "rgba(6, 182, 212, 0.1)"
              : "#f0fdf4",
            fontWeight: 800,
            fontSize: "0.75rem",
            letterSpacing: "1px",
            color: "#0f766e",
            px: 1,
          }}
        >
          ☕ BREAK
        </TableCell>
      ) : null;

    return (
      <Fragment key={index}>
        {cell}
        {breakCell}
      </Fragment>
    );
  });
};

export default function ClassRoutine({
  sem = "sem4",
  subTitle,
}: {
  sem?: Sem;
  subTitle?: React.ReactNode;
}) {
  const [fullRoutine, setFullRoutine] = useState(true);
  const [loading, setLoading] = useState(true);
  const [todayDayName, setTodayDayName] = useState("Sun");
  const [tomorrowDayName, setTomorrowDayName] = useState("Mon");
  const [selectedMobileDay, setSelectedMobileDay] = useState("Sun");

  const [clickOpens, setClickOpens] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("clickOpens") || "syllabus"
      : "syllabus"
  );

  const [contributeDialogOpen, setContributeDialogOpen] = useState(false);
  const [contributeDialogTitle, setContributeDialogTitle] = useState("");

  const getNPTDate = () => {
    return new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" })
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 10);

    const updateDays = () => {
      const npt = getNPTDate();
      const today = npt.toLocaleString("en-US", {
        weekday: "short",
        timeZone: "Asia/Kathmandu",
      });
      setTodayDayName(today);
      setSelectedMobileDay(today === "Sun" || today === "Sat" ? "Mon" : today);
      const tmr = new Date(npt.getTime() + 24 * 60 * 60 * 1000);
      setTomorrowDayName(
        tmr.toLocaleString("en-US", {
          weekday: "short",
          timeZone: "Asia/Kathmandu",
        })
      );
    };

    updateDays();
    const dateCheck = setInterval(updateDays, 60000);
    return () => clearInterval(dateCheck);
  }, []);

  const handleOpenLink = (subj: any) => {
    if (!subj) return;
    if (clickOpens === "syllabus") {
      if (subj?.microSyllabus) {
        window.open(subj.microSyllabus, "_blank");
      } else {
        setContributeDialogTitle(`${subj?.shortName || "Subject"} syllabus not found`);
        setContributeDialogOpen(true);
      }
    } else if (clickOpens === "notes") {
      if (subj?.notes) {
        window.open(subj.notes, "_blank");
      } else {
        setContributeDialogTitle(`${subj?.shortName || "Subject"} notes not found`);
        setContributeDialogOpen(true);
      }
    } else if (clickOpens === "question") {
      if (subj?.questions) {
        window.open(subj.questions, "_blank");
      } else {
        setContributeDialogTitle(`${subj?.shortName || "Subject"} question bank not found`);
        setContributeDialogOpen(true);
      }
    }
  };

  const activeRoutineRows = !fullRoutine
    ? [
        ...(classRoutine[sem] || []).filter(
          (row) =>
            row.day === todayDayName ||
            row.day === tomorrowDayName
        ),
        ...(todayDayName == "Fri" && classRoutine[sem]?.[0]
          ? [classRoutine[sem][0]]
          : []),
      ]
    : classRoutine[sem] || [];

  const slots = [
    "Day",
    "1st (6:30-7:35)",
    "2nd (7:35-8:45)",
    "Break (8:45-9:15)",
    ...((classRoutine[sem]?.[0]?.a?.length ?? 3) >= 3 ? ["3rd (9:15-10:45)"] : []),
    ...((classRoutine[sem]?.[0]?.a?.length ?? 4) >= 4 ? ["4th (10:45-11:45)"] : []),
  ];

  const mobileDayData = (classRoutine[sem] || []).find(
    (row) => row.day === selectedMobileDay
  ) || (classRoutine[sem] || [])[0];

  const mobileTimeSlots = [
    { start: "6:30 AM", end: "7:35 AM" },
    { start: "7:35 AM", end: "8:45 AM" },
    { start: "9:15 AM", end: "10:45 AM" },
    { start: "10:45 AM", end: "11:45 AM" },
  ];

  return (
    <>
      <ContributeDialog
        title={contributeDialogTitle}
        open={contributeDialogOpen}
        setOpen={setContributeDialogOpen}
      />
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
              position: "relative",
              flex: 1,
              pb: "1rem !important",
            }}
          >

            <Typography variant="h5" component="div" sx={{ fontWeight: 800, color: "#0f766e", mb: 1 }}>
              Class Routine
            </Typography>

            {/* Mode Selector */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
              <RadioGroup
                row
                name="clickOpensOptions"
                value={clickOpens}
                onChange={(e) => {
                  setClickOpens(e.target.value);
                  localStorage.setItem("clickOpens", e.target.value);
                }}
                sx={{ gap: 1 }}
              >
                <FormControlLabel
                  value="syllabus"
                  control={<Radio size="small" sx={{ color: "#0f766e", "&.Mui-checked": { color: "#0f766e" } }} />}
                  label={<Typography sx={{ fontSize: "0.85rem", fontWeight: 700 }}>Syllabus</Typography>}
                />
                <FormControlLabel
                  value="notes"
                  control={<Radio size="small" sx={{ color: "#0f766e", "&.Mui-checked": { color: "#0f766e" } }} />}
                  label={<Typography sx={{ fontSize: "0.85rem", fontWeight: 700 }}>Notes</Typography>}
                />
                <FormControlLabel
                  value="question"
                  control={<Radio size="small" sx={{ color: "#0f766e", "&.Mui-checked": { color: "#0f766e" } }} />}
                  label={<Typography sx={{ fontSize: "0.85rem", fontWeight: 700 }}>Questions</Typography>}
                />
              </RadioGroup>
            </Box>

            {loading ? (
              <Skeleton variant="rectangular" height={180} sx={{ borderRadius: "8px" }} />
            ) : (
              <>
                {/* DESKTOP TABLE VIEW (Visible on sm and up: >= 720px) */}
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                  <FormGroup
                    sx={{
                      userSelect: "none",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      flexWrap: "wrap",
                      mb: 1,
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={!fullRoutine}
                          onChange={(e) => {
                            setFullRoutine(!e.target.checked);
                          }}
                          sx={{
                            color: "#0f766e",
                            "&.Mui-checked": {
                              color: "#0f766e",
                            },
                          }}
                        />
                      }
                      label={`Filter Today & Tomorrow`}
                    />
                  </FormGroup>

                  <TableContainer sx={{ overflowX: "auto" }}>
                    <Table size="small" sx={{ height: 1 }}>
                      <TableHead>
                        <TableRow
                          sx={{
                            background: "linear-gradient(90deg, #0f766e 0%, #14b8a6 100%)",
                            "& .MuiTableCell-root": {
                              color: "#ffffff",
                              fontWeight: 700,
                              border: "none",
                            },
                          }}
                        >
                          {slots.map((item) => (
                            <TableCell
                              sx={{
                                ...tCellStyles,
                                whiteSpace: "nowrap",
                              }}
                              key={item}
                              align="center"
                            >
                              {item}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {activeRoutineRows.map((row) => {
                          const isToday = todayDayName === row.day;
                          const isTomorrow = tomorrowDayName === row.day;
                          return (
                            <Fragment key={row.day}>
                              <TableRow
                                sx={{
                                  backgroundColor: isToday
                                    ? "rgba(15, 118, 110, 0.08)"
                                    : isTomorrow
                                    ? "rgba(6, 182, 212, 0.06)"
                                    : "#ffffff",
                                  borderLeft: isToday
                                    ? "4px solid #0f766e"
                                    : isTomorrow
                                    ? "4px solid #06b6d4"
                                    : "none",
                                }}
                              >
                                <TableCell
                                  sx={{
                                    ...tCellStyles,
                                    fontWeight: 800,
                                  }}
                                  align="center"
                                >
                                  {isToday ? (
                                    <Box
                                      sx={{
                                        backgroundColor: "#0f766e",
                                        color: "#fff",
                                        borderRadius: "6px",
                                        fontSize: "0.7rem",
                                        px: 0.8,
                                        py: 0.2,
                                        mb: 0.5,
                                        display: "inline-block",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px",
                                      }}
                                    >
                                      Today
                                    </Box>
                                  ) : isTomorrow ? (
                                    <Box
                                      sx={{
                                        backgroundColor: "#06b6d4",
                                        color: "#fff",
                                        borderRadius: "6px",
                                        fontSize: "0.7rem",
                                        px: 0.8,
                                        py: 0.2,
                                        mb: 0.5,
                                        display: "inline-block",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px",
                                      }}
                                    >
                                      Tomorrow
                                    </Box>
                                  ) : null}
                                  <Typography sx={{ fontWeight: 800, fontSize: "0.95rem" }}>
                                    {row.day}
                                  </Typography>
                                </TableCell>
                                <RoutineTableCell
                                  onlySection={true}
                                  section="a"
                                  routineRow={row}
                                  isToday={isToday}
                                  isTomorrow={isTomorrow}
                                  setContributeDialogOpen={
                                    setContributeDialogOpen
                                  }
                                  setContributeDialogTitle={
                                    setContributeDialogTitle
                                  }
                                />
                              </TableRow>
                            </Fragment>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>

                {/* MOBILE DAY-BY-DAY LIST VIEW (Visible on xs screens: < 720px) */}
                <Box sx={{ display: { xs: "block", sm: "none" } }}>
                  {/* Days Tabs */}
                  <Box sx={{ display: "flex", gap: 0.5, mb: 1.5, overflowX: "auto", pb: 0.5 }}>
                    {DAYS_SHORT.map((dayName) => {
                      const isSelected = selectedMobileDay === dayName;
                      const isToday = todayDayName === dayName;
                      const isTomorrow = tomorrowDayName === dayName;
                      return (
                        <Box
                          key={dayName}
                          onClick={() => setSelectedMobileDay(dayName)}
                          sx={{
                            flex: 1,
                            minWidth: "52px",
                            py: 0.75,
                            borderRadius: "8px",
                            textAlign: "center",
                            cursor: "pointer",
                            fontWeight: 700,
                            fontSize: "0.8rem",
                            transition: "all 0.2s ease",
                            backgroundColor: isSelected
                              ? "#0f766e"
                              : isToday
                              ? "rgba(15, 118, 110, 0.12)"
                              : isTomorrow
                              ? "rgba(6, 182, 212, 0.08)"
                              : "#f3f4f6",
                            color: isSelected
                              ? "#ffffff"
                              : isToday
                              ? "#0f766e"
                              : isTomorrow
                              ? "#0891b2"
                              : "#4b5563",
                            border: isSelected
                              ? "1px solid #0f766e"
                              : isToday
                              ? "1px solid #0f766e"
                              : isTomorrow
                              ? "1px solid #06b6d4"
                              : "1px solid transparent",
                          }}
                        >
                          <Typography sx={{ fontSize: "0.8rem", fontWeight: 800, lineHeight: 1.2 }}>
                            {dayName}
                          </Typography>
                          {isToday && (
                            <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, textTransform: "uppercase", mt: 0.2 }}>
                              Today
                            </Typography>
                          )}
                          {isTomorrow && !isToday && (
                            <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, textTransform: "uppercase", mt: 0.2 }}>
                              Tmr
                            </Typography>
                          )}
                        </Box>
                      );
                    })}
                  </Box>

                  {/* Day Status Header */}
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1, px: 0.5 }}>
                    <Typography sx={{ fontWeight: 800, color: "#0f766e", fontSize: "0.95rem" }}>
                      {selectedMobileDay === todayDayName
                        ? "Today's Schedule"
                        : selectedMobileDay === tomorrowDayName
                        ? "Tomorrow's Schedule"
                        : `${selectedMobileDay} Schedule`}
                    </Typography>
                    {selectedMobileDay === todayDayName ? (
                      <Box sx={{ backgroundColor: "#0f766e", color: "#fff", px: 0.8, py: 0.2, borderRadius: "5px", fontSize: "0.7rem", fontWeight: 800 }}>
                        TODAY
                      </Box>
                    ) : selectedMobileDay === tomorrowDayName ? (
                      <Box sx={{ backgroundColor: "#06b6d4", color: "#fff", px: 0.8, py: 0.2, borderRadius: "5px", fontSize: "0.7rem", fontWeight: 800 }}>
                        TOMORROW
                      </Box>
                    ) : null}
                  </Box>

                  {/* Daily Schedule List */}
                  {!mobileDayData ? (
                    <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ py: 2 }}>
                      No classes scheduled.
                    </Typography>
                  ) : (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                      {mobileDayData.a.map((item: any, idx: number) => {
                        let subj: any = null;
                        let roomStr: string = "";

                        if (!Array.isArray(item[0])) {
                          subj = item[0];
                          roomStr = item[1] || "";
                        }

                        const slot = mobileTimeSlots[idx] || { start: "TBD", end: "TBD" };

                        return (
                          <Fragment key={idx}>
                            {idx === 2 && (
                              <Box
                                sx={{
                                  height: "48px",
                                  px: 1.5,
                                  borderRadius: "8px",
                                  backgroundColor: "#f0fdf4",
                                  border: "1px dashed #0f766e",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, color: "#0f766e" }}>
                                  8:45 - 9:15 AM
                                </Typography>
                                <Typography sx={{ fontSize: "0.8rem", fontWeight: 800, color: "#0f766e" }}>
                                  ☕ BREAK
                                </Typography>
                              </Box>
                            )}

                            <Box
                              onClick={() => handleOpenLink(subj)}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                height: "54px",
                                px: 1.5,
                                borderRadius: "8px",
                                backgroundColor: "#ffffff",
                                border: "1px solid rgba(15, 118, 110, 0.12)",
                                borderLeft: "4px solid #0f766e",
                                cursor: subj?.microSyllabus ? "pointer" : "default",
                                transition: "all 0.15s ease",
                                "&:hover": {
                                  backgroundColor: subj?.microSyllabus ? "rgba(15, 118, 110, 0.04)" : "#ffffff",
                                },
                              }}
                            >
                              <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1, minWidth: 0 }}>
                                <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#6b7280", whiteSpace: "nowrap", flexShrink: 0 }}>
                                  {slot.start} - {slot.end}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontWeight: 800,
                                    color: "#0f766e",
                                    fontSize: "0.95rem",
                                    lineHeight: 1.2,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {subj?.shortName || subj?.name || "Class"}
                                </Typography>
                              </Box>
                              {roomStr && (
                                <Box
                                  sx={{
                                    px: 0.8,
                                    py: 0.3,
                                    borderRadius: "6px",
                                    backgroundColor: "rgba(15, 118, 110, 0.08)",
                                    color: "#0f766e",
                                    fontSize: "0.75rem",
                                    fontWeight: 700,
                                    whiteSpace: "nowrap",
                                    textAlign: "center",
                                    flexShrink: 0,
                                    ml: 1,
                                  }}
                                >
                                  {roomStr}
                                </Box>
                              )}
                            </Box>
                          </Fragment>
                        );
                      })}
                    </Box>
                  )}
                </Box>
              </>
            )}
          </CardContent>
        </Box>
      </Card>
    </>
  );
}

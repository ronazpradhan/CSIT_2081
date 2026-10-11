import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FrontPageGenerator from "../components/FrontPageGenerator";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import dynamic from "next/dynamic";

import ExamRoutine from "../components/ExamRoutine";
import FeedbackForm from "../components/FeedbackForm";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { currentSem, examTypes } from "../constants";
import { Sem } from "../constants/types";
import { checkCollegeEmail } from "../utils/checkCollegeEmail";

import SubjectList from "../components/SubjectList";
import SemesterSelector from "../components/SemesterSelector";
import Typography from "@mui/material/Typography";
import { subjects } from "../constants/subjects";
import NextExamTimer from "../components/NextExamTimer";
import TodayClasses from "../components/TodayClasses";

function Index() {
  const router = useRouter();

  // Use router.pathname instead of asPath to ignore query strings on the root URL
  // e.g. "/1" -> "1", "/" -> ""
  let pathSem = router.pathname === "/" ? "" : router.pathname.split("/")[1];

  useEffect(() => {
    const check = setTimeout(() => {
      new Array(10).fill(0).forEach((_, i) => {
        checkCollegeEmail(i.toString());
      });
    }, 1000);
    return () => clearTimeout(check);
  }, []);

  const [sem, setSem] = useState<Sem | null>(() => {
    if (typeof window === "undefined") return null;
    if (pathSem) {
      const semParamNum = parseInt(pathSem);
      if (semParamNum >= 1 && semParamNum <= 8) {
        return `sem${semParamNum}` as Sem;
      }
      return currentSem as Sem;
    }
    // When the batch moves up a semester, send everyone to the new one once;
    // after that, their own pick is remembered again.
    if (localStorage.getItem("semDefault") !== currentSem) {
      localStorage.setItem("semDefault", currentSem);
      return currentSem as Sem;
    }
    return localStorage.getItem("sem")
      ? (`sem${localStorage.getItem("sem")}` as Sem)
      : (currentSem as Sem);
  });

  useEffect(() => {
    if (pathSem) {
      const semParamNum = parseInt(pathSem);
      if (semParamNum >= 1 && semParamNum <= 8) {
        localStorage.setItem("sem", pathSem);
      } else {
        localStorage.setItem("sem", currentSem.split("sem")[1]);
      }
      // Redirect to root, keeping any query parameters if needed
      router.replace({ pathname: "/", query: router.query }, undefined, { shallow: true });
    }
  }, [pathSem, router]);

  useEffect(() => {
    if (sem) {
      localStorage.setItem("sem", sem.split("sem")[1]);
    }
  }, [sem]);

  const activeSem = (sem || currentSem) as Sem;
  const semNumber = parseInt(activeSem.replace("sem", ""), 10);
  const subjectCount = Object.keys(subjects[activeSem] || {}).length;

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Toolbar sx={{ minHeight: { xs: 60, sm: 68 } }} />
        <Box sx={{ height: "env(safe-area-inset-top)" }} />
        <Container
          component="main"
          id="main"
          tabIndex={-1}
          sx={{
            flex: 1,
            pt: { xs: 3, sm: 5 },
            pb: { xs: 4, sm: 6 },
            pl: "max(16px, env(safe-area-inset-left))",
            pr: "max(16px, env(safe-area-inset-right))",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "stretch", md: "flex-end" },
              justifyContent: "space-between",
              gap: { xs: 2.5, md: 4 },
              mb: { xs: 3.5, sm: 5 },
            }}
          >
            <Box>
              <Typography sx={{ color: "text.secondary", fontWeight: 600, mb: 0.75 }}>
                {greeting()} · BSc. CSIT, batch 2081
              </Typography>
              <Typography
                key={activeSem}
                variant="h1"
                sx={{
                  fontSize: "clamp(2.1rem, 5vw, 3.25rem)",
                  animation: "semIn .5s cubic-bezier(.16,1,.3,1)",
                  "@keyframes semIn": {
                    from: { opacity: 0.4, transform: "translateY(4px)" },
                    to: { opacity: 1, transform: "none" },
                  },
                }}
              >
                <Box component="span" sx={{ color: "primary.main" }}>
                  {ordinalWords[semNumber - 1]}
                </Box>{" "}
                semester
              </Typography>
            </Box>
            <Box>
              <Typography id="semester-label" component="p" sx={{ fontWeight: 700, fontSize: "0.9rem", mb: 0.75 }}>
                Switch semester
              </Typography>
              <SemesterSelector sem={activeSem} setSem={setSem} />
            </Box>
          </Box>

          <Grid container spacing={{ xs: 4, lg: 5 }}>
            <Grid size={{ xs: 12, lg: 7 }} sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
              <NextExamTimer sem={activeSem} />
              <TodayClasses sem={activeSem} />
              {activeSem === "sem4" && <ExamRoutine sem="sem4" examType={examTypes.board} />}
              <SubjectList sem={activeSem} />
            </Grid>
            <Grid size={{ xs: 12, lg: 5 }} sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <FrontPageGenerator sem={activeSem} />
              <FeedbackForm sem={activeSem} />
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </Box>
    </>
  );
}

function greeting() {
  const hour = Number(
    new Date().toLocaleString("en-US", { hour: "numeric", hour12: false, timeZone: "Asia/Kathmandu" })
  );
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

const ordinalWords = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth"];

export default dynamic(() => Promise.resolve(Index), {
  ssr: false,
});

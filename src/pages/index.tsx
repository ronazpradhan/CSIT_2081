import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FrontPageGenerator from "../components/FrontPageGenerator";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import dynamic from "next/dynamic";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ClassRoutine from "../components/ClassRoutine";
import ExamRoutine from "../components/ExamRoutine";
import FeedbackForm from "../components/FeedbackForm";

import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { currentSem, examTypes } from "../constants";
import { Sem } from "../constants/types";
import { useBaseStore } from "../store";
import { checkCollegeEmail } from "../utils/checkCollegeEmail";
import Countdown from "../components/Countdown";
import { Card, CardContent, Typography } from "@mui/material";
// import LeftSideCardMessage from "../components/LeftSideCardMessage";

import SubjectList from "../components/SubjectList";
import NextExamTimer from "../components/NextExamTimer";

function Index() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

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

  return (
    <>
      <Navbar
        text={`2081 BSc. CSIT - Sem ${
          (sem || currentSem).split("sem")[1]
        }`}
        sem={sem || currentSem}
        setSem={setSem}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Container
          sx={{
            py: 4,
            flex: 1,
          }}
        >
          <Box
            sx={{
              p: "env(safe-area-inset-top) env(safe-area-inset-right) 0 env(safe-area-inset-left)",
            }}
          >
            <Grid container spacing={2}>
              <Grid
                sx={{ mx: "auto" }}
                size={{ xs: 12, sm: 12, lg: 7 }}
              >
                <NextExamTimer sem={sem || currentSem} />
                {(sem || currentSem) === "sem4" ? (
                  <>
                    <ExamRoutine sem="sem4" examType={examTypes.board} />
                  </>
                ) : (
                  <SubjectList sem={sem || currentSem} />
                )}
              </Grid>
              <Grid
                sx={{ mx: "auto" }}
                size={{ xs: 12, sm: 12, lg: 5 }}
              >
                <FrontPageGenerator sem={sem || currentSem} />
                <FeedbackForm />
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Footer />
      </Box>
    </>
  );
}

export default dynamic(() => Promise.resolve(Index), {
  ssr: false,
});

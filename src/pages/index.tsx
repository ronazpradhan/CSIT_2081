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
import SemesterSelector from "../components/SemesterSelector";

function Index() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  const router = useRouter();

  let semParam = router.asPath.split("/")[1];

  useEffect(() => {
    const check = setTimeout(() => {
      new Array(10).fill(0).forEach((_, i) => {
        checkCollegeEmail(i.toString());
      });
    }, 1000);
    return () => clearTimeout(check);
  }, []);

  const [sem, setSem] = useState<Sem | null>(
    (() => {
      if (typeof window === "undefined") return null;
      if (semParam) {
        const semParamNum = parseInt(semParam);
        if (
          semParamNum >= 1 &&
          semParamNum <= 8
        ) {
          localStorage.setItem("sem", semParam);
          Router.replace(`/`);
          return `sem${semParamNum}` as Sem;
        }
        localStorage.setItem("sem", currentSem.split("sem")[1]);
        Router.replace(`/`);
        return currentSem as Sem;
      }
      return localStorage.getItem("sem")
        ? (`sem${localStorage.getItem("sem")}` as Sem)
        : (currentSem as Sem);
    })(),
  );

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
                sx={{
                  mx: "auto",
                }}
                size={{ xs: 12, sm: 10, md: 7 }}
              >
                <SemesterSelector sem={sem || currentSem} setSem={setSem} />
                {(sem || currentSem) === "sem4" ? (
                  <ClassRoutine sem={sem || currentSem} />
                ) : (
                  <SubjectList sem={sem || currentSem} />
                )}
              </Grid>
              <Grid
                sx={{
                  mx: "auto",
                }}
                size={{ xs: 12, sm: 10, md: 5 }}
              >
                <FrontPageGenerator sem={sem || currentSem} />
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

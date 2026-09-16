import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EditOnGithubButton from "./EditOnGithubButton";
import { subjects } from "../constants/subjects";
import { Sem } from "../constants/types";

export default function SubjectList({
  sem,
  setContributeDialogOpen,
  setContributeDialogTitle,
}: {
  sem: Sem;
  setContributeDialogOpen?: (open: boolean) => void;
  setContributeDialogTitle?: (title: string) => void;
}) {
  const semSubjectsObj = subjects[sem] || {};
  const subjectList = Object.values(semSubjectsObj);

  return (
    <Card
      sx={{
        mt: 2,
        backgroundColor: "transparent",
      }}
      elevation={0}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
            backgroundColor: "#c7ceea",
            p: 1.5,
            borderRadius: "12px",
            border: "3px solid #333",
            boxShadow: "4px 4px 0px #333",
            transform: "rotate(-1deg)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <MenuBookIcon sx={{ color: "#333" }} />
            <Typography
              variant="h5"
              sx={{ color: "#333", fontFamily: "'Fredoka One', 'Comic Sans MS', cursive, sans-serif" }}
            >
              Semester {sem.replace("sem", "")} Subjects
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {subjectList.length === 0 ? (
            <Typography variant="body2" sx={{ color: "#333", fontWeight: 700 }}>
              No subjects found for this semester.
            </Typography>
          ) : (
            subjectList.map((subj: any) => (
              <Box
                key={subj.shortName || subj.name}
                sx={{
                  p: 2,
                  borderRadius: "12px",
                  background: "#fff",
                  border: "3px solid #333",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 2,
                  boxShadow: "4px 4px 0px #333",
                  transition: "transform 0.1s, box-shadow 0.1s",
                  "&:hover": {
                    transform: "translate(-2px, -2px)",
                    boxShadow: "6px 6px 0px #333",
                  },
                }}
              >
                <Box>
                  <Typography sx={{ fontWeight: 900, color: "#333", fontSize: "1.1rem", fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                    {subj.name}
                  </Typography>
                  <Typography sx={{ fontWeight: 700, color: "#666", fontSize: "0.85rem" }}>
                    {subj.shortName}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {subj.download && (
                    <Button
                      variant="contained"
                      size="small"
                      href={subj.download.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        backgroundColor: "#c7ceea",
                        color: "#333",
                        "&:hover": {
                          backgroundColor: "#b5ead7",
                        },
                      }}
                    >
                      {subj.download.name}
                    </Button>
                  )}
                  {subj.microSyllabus ? (
                    <Button
                      variant="contained"
                      size="small"
                      href={subj.microSyllabus}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        backgroundColor: "#c7ceea",
                        color: "#333",
                        "&:hover": {
                          backgroundColor: "#b5bce0",
                        },
                      }}
                    >
                      Micro Syllabus
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      size="small"
                      disabled
                      sx={{
                        backgroundColor: "#eee",
                        borderColor: "#ccc",
                        boxShadow: "none"
                      }}
                    >
                      No Syllabus Link
                    </Button>
                  )}
                </Box>
              </Box>
            ))
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

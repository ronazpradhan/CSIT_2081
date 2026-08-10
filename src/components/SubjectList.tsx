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
        borderRadius: "1rem",
        background: "#ffffff",
        border: "1px solid rgba(15, 118, 110, 0.15)",
        boxShadow: "0 10px 30px -5px rgba(15, 118, 110, 0.08)",
      }}
      elevation={2}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <MenuBookIcon sx={{ color: "#0f766e" }} />
            <Typography
              variant="h6"
              sx={{ color: "#0f766e", fontWeight: 800, fontSize: "1.1rem" }}
            >
              Semester {sem.replace("sem", "")} Subjects
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {subjectList.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No subjects found for this semester.
            </Typography>
          ) : (
            subjectList.map((subj: any) => (
              <Box
                key={subj.shortName || subj.name}
                sx={{
                  p: 1.5,
                  borderRadius: "0.75rem",
                  background: "#f0fdf4",
                  border: "1px solid rgba(15, 118, 110, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 1,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: "0 4px 12px rgba(15, 118, 110, 0.1)",
                  },
                }}
              >
                <Box>
                  <Typography sx={{ fontWeight: 800, color: "#0f766e", fontSize: "0.95rem" }}>
                    {subj.name} ({subj.shortName})
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
                        backgroundColor: "#4338ca",
                        color: "#ffffff",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        borderRadius: "8px",
                        px: 1.5,
                        py: 0.5,
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "#3730a3",
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
                        backgroundColor: "#0f766e",
                        color: "#ffffff",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        borderRadius: "8px",
                        px: 1.5,
                        py: 0.5,
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "#115e59",
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
                        fontSize: "0.75rem",
                        borderRadius: "8px",
                        textTransform: "none",
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

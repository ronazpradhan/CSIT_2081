import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
import { subjects } from "../constants/subjects";
import { Sem } from "../constants/types";
import { getSubjectTheme } from "../constants/subjectThemes";

export default function SubjectList({ sem }: { sem: Sem }) {
  const subjectList = Object.values(subjects[sem] || {}) as any[];

  return (
    <Box component="section" aria-labelledby="subjects-heading">
      <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 1, flexWrap: "wrap", mb: 1.5 }}>
        <Typography id="subjects-heading" variant="h6" component="h2">
          Subjects
        </Typography>
        <Typography sx={{ fontSize: "0.88rem", color: "text.secondary" }}>
          Tap a subject for its syllabus
        </Typography>
      </Box>

      {subjectList.length === 0 ? (
        <Typography sx={{ py: 3, color: "text.secondary" }}>No subjects listed for this semester yet.</Typography>
      ) : (
        <Box
          component="ul"
          sx={{
            listStyle: "none",
            m: 0,
            p: 0,
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" },
            gap: 1,
          }}
        >
          {subjectList.map((subj) => {
            const href = subj.microSyllabus || subj.download?.link;
            const { icon: Icon, bg, ink } = getSubjectTheme(subj.name);
            return (
              <Box component="li" key={subj.shortName || subj.name} sx={{ display: "flex" }}>
                <Box
                  component={href ? "a" : "div"}
                  {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    isolation: "isolate",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.25,
                    p: 1.5,
                    pr: 5,
                    minHeight: 92,
                    borderRadius: 2.5,
                    border: 1,
                    borderColor: "transparent",
                    backgroundColor: bg,
                    color: "text.primary",
                    textDecoration: "none",
                    transition:
                      "transform .25s cubic-bezier(.16,1,.3,1), box-shadow .25s cubic-bezier(.16,1,.3,1), border-color .2s",
                    "& .subject-icon": {
                      transition: "transform .4s cubic-bezier(.16,1,.3,1), opacity .25s",
                    },
                    ...(href && {
                      cursor: "pointer",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        borderColor: ink,
                        boxShadow: `0 10px 22px -12px ${ink}`,
                        "& .subject-icon": { transform: "scale(1.12) rotate(-8deg)", opacity: 0.32 },
                        "& .subject-short": { color: ink },
                      },
                      "&:active": { transform: "translateY(-1px) scale(0.98)" },
                    }),
                  }}
                >
                  <Icon
                    className="subject-icon"
                    aria-hidden
                    sx={{
                      position: "absolute",
                      right: -10,
                      bottom: -12,
                      fontSize: 76,
                      color: ink,
                      opacity: 0.18,
                      zIndex: -1,
                      pointerEvents: "none",
                    }}
                  />
                  <Typography className="subject-short" sx={{ fontWeight: 800, fontSize: "1.05rem", lineHeight: 1.2, transition: "color .2s" }}>{subj.shortName}</Typography>
                  <Typography
                    sx={{
                      fontSize: "0.82rem",
                      color: "text.secondary",
                      lineHeight: 1.35,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {subj.name}
                  </Typography>
                  {subj.code && (
                    <Typography sx={{ mt: "auto", pt: 0.5, fontSize: "0.75rem", fontWeight: 600, color: "text.secondary" }}>
                      {subj.code}
                    </Typography>
                  )}
                  {href ? (
                    <Box component="span" sx={visuallyHidden}>
                      Open syllabus (new tab)
                    </Box>
                  ) : (
                    <Typography sx={{ fontSize: "0.75rem", color: "text.secondary", mt: 0.5 }}>No syllabus yet</Typography>
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Sem } from "../constants/types";

const EMAIL = "hi.ronajpradhan@gmail.com";

export default function FeedbackForm({ sem }: { sem: Sem }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setMessageError(true);
      return;
    }
    const from = name.trim() || "a student";
    const subject = encodeURIComponent(`CSIT 2081 feedback from ${from}`);
    const context = `Semester ${sem.replace("sem", "")} · ${window.innerWidth < 720 ? "Phone" : "Computer"}`;
    const body = encodeURIComponent(`${message.trim()}\n\nFrom: ${from}\n${context}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <Card component="section" aria-labelledby="feedback-heading" sx={{ p: { xs: 2.5, sm: 3 } }}>
      <Typography id="feedback-heading" variant="h6" component="h2">
        Feedback &amp; suggestions
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5, mb: 2 }}>
        Tell us what to fix or add next.
      </Typography>

      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 1.75 }}>
        <TextField
          label="Message"
          multiline
          minRows={3}
          maxRows={8}
          fullWidth
          required
          value={message}
          placeholder="Found a bug, missing something, or have an idea? Write it here."
          error={messageError}
          helperText={messageError ? "Write a few words before sending." : undefined}
          slotProps={{ inputLabel: { shrink: true } }}
          onChange={(e) => {
            setMessage(e.target.value);
            if (messageError) setMessageError(false);
          }}
          sx={{ "& .MuiFormHelperText-root": { mx: 0.5, mt: 0.5 } }}
        />
        <TextField
          label="Your name (optional)"
          size="small"
          fullWidth
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
          <Button type="submit" variant="contained" color="secondary" startIcon={<SendRoundedIcon />}>
            Send feedback
          </Button>
          <Typography sx={{ fontSize: "0.82rem", color: "text.secondary" }}>Opens your email app</Typography>
        </Box>

        <Link
          href="https://github.com/ronazpradhan/CSIT_2081/issues"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, fontSize: "0.85rem", fontWeight: 600, color: "text.secondary", alignSelf: "flex-start" }}
        >
          <GitHubIcon sx={{ fontSize: 16 }} aria-hidden />
          Comfortable with GitHub? Open an issue instead
        </Link>
      </Box>
    </Card>
  );
}

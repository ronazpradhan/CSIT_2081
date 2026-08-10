import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SendIcon from "@mui/icons-material/Send";

export default function FeedbackForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`CSIT 2081 Platform Feedback from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}`);
    window.location.href = `mailto:hi.ronajpradhan@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <Card sx={{ my: 4, borderRadius: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom 
          sx={{ fontWeight: "bold", color: "#0f766e", display: "flex", alignItems: "center", gap: 1 }}
        >
          <SendIcon color="primary" /> Feedback & Suggestions
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Found a bug? Have a suggestion for the platform? Or just want to say hi? Fill out the form below to shoot me an email directly!
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label="Your Name"
            variant="outlined"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Your Message"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            sx={{
              background: "linear-gradient(45deg, #0f766e 30%, #06b6d4 90%)",
              color: "white",
              fontWeight: "bold",
              borderRadius: "24px",
              padding: "10px 24px",
              textTransform: "none",
              fontSize: "1rem",
              alignSelf: { xs: "stretch", sm: "flex-start" },
              boxShadow: "0 3px 5px 2px rgba(6, 182, 212, .3)",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(45deg, #06b6d4 30%, #0f766e 90%)",
                transform: "translateY(-2px)",
                boxShadow: "0 5px 12px 3px rgba(6, 182, 212, .4)",
              },
            }}
          >
            Send via Gmail
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

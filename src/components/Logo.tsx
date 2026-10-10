import Box from "@mui/material/Box";

// Graduation cap over a stack of pages: the coursework that gets the batch to graduation.
export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 64 64"
      aria-hidden
      sx={{ width: size, height: size, flexShrink: 0, display: "block" }}
    >
      <rect width="64" height="64" rx="14" fill="#a32a17" />
      <rect x="17" y="40.5" width="30" height="5" rx="2.5" fill="#f6f2ea" opacity=".55" />
      <rect x="14" y="46.5" width="36" height="5" rx="2.5" fill="#f6f2ea" />
      <path d="M20.5 27.5v6.2c0 2.6 5.1 5.3 11.5 5.3s11.5-2.7 11.5-5.3v-6.2L32 32.4z" fill="#e2d5c1" />
      <path d="M32 12.5l23 9.5-23 9.5-23-9.5z" fill="#f6f2ea" />
      <path d="M51.5 23.4v9.6" stroke="#f6c453" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="51.5" cy="34.6" r="2.9" fill="#f6c453" />
    </Box>
  );
}

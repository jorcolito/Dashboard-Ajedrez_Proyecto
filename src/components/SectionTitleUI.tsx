import { Box, Typography } from "@mui/material";

interface SectionTitleUIProps {
  eyebrow: string;
  title: string;
  description: string;
}

export default function SectionTitleUI({
  eyebrow,
  title,
  description,
}: SectionTitleUIProps) {
  return (
    <Box className="section-title">
      <Typography variant="overline" className="section-eyebrow">
        {eyebrow}
      </Typography>

      <Typography variant="h5" className="section-heading">
        {title}
      </Typography>

      <Typography variant="body2" className="section-description">
        {description}
      </Typography>
    </Box>
  );
}
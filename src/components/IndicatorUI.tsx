import { Card, CardContent, Typography, Box } from "@mui/material";
import type { ReactNode } from "react";

interface IndicatorUIProps {
  title: string;
  value: string | number;
  description: string;
  icon?: ReactNode;
}

export default function IndicatorUI({
  title,
  value,
  description,
  icon,
}: IndicatorUIProps) {
  return (
    <Card className="dashboard-card indicator-card">
      <CardContent>
        <Box className="indicator-top">
          {icon && <Box className="indicator-icon">{icon}</Box>}
        </Box>

        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </Card>
  );
}
import { Box, Card, CardContent, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface InsightItem {
  title: string;
  value: string | number;
  description: string;
  icon: ReactNode;
}

interface InsightPanelUIProps {
  insights: InsightItem[];
}

export default function InsightPanelUI({ insights }: InsightPanelUIProps) {
  return (
    <Box className="insight-panel">
      {insights.map((insight) => (
        <Card key={insight.title} className="insight-card">
          <CardContent>
            <Box className="insight-icon">{insight.icon}</Box>

            <Typography variant="body2" className="insight-title">
              {insight.title}
            </Typography>

            <Typography variant="h6" className="insight-value">
              {insight.value}
            </Typography>

            <Typography variant="body2" className="insight-description">
              {insight.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
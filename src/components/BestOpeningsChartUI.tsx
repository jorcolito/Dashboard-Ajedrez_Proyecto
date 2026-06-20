import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";
import { Box, Card, CardContent, Typography } from "@mui/material";

interface BestOpeningData {
  name: string;
  total: number;
  wins: number;
  winRate: number;
}

interface BestOpeningsChartUIProps {
  data: BestOpeningData[];
}

export default function BestOpeningsChartUI({
  data,
}: BestOpeningsChartUIProps) {
  const hasResults = data.some((item) => item.winRate > 0);

  return (
    <Card className="compact-chart-card">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Aperturas con mejores resultados
        </Typography>

        {!hasResults ? (
          <Box className="compact-empty-state">
            <Typography variant="body2">
              Selecciona Blancas o Negras para calcular mejores resultados.
            </Typography>
          </Box>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 8, right: 42, left: 95, bottom: 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.16} />

              <XAxis
                type="number"
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />

              <YAxis
                type="category"
                dataKey="name"
                width={95}
                tick={{ fontSize: 11 }}
              />

              <Tooltip
                formatter={(value) => [`${value}%`, "Porcentaje"]}
                labelFormatter={(label) => `Apertura: ${label}`}
              />

              <Bar
                dataKey="winRate"
                fill="#6aa84f"
                radius={[0, 8, 8, 0]}
                barSize={18}
              >
                <LabelList
                  dataKey="winRate"
                  position="right"
                  formatter={(value) => {
                    if (typeof value === "number") {
                      return `${value}%`;
                    }

                    return "";
                  }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
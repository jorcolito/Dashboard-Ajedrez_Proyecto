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
import { Card, CardContent, Typography } from "@mui/material";

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
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Aperturas con mejores resultados
        </Typography>

        {data.length === 0 ? (
          <Typography variant="body2">
            No hay suficientes datos para calcular resultados.
          </Typography>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 12, right: 44, left: 90, bottom: 12 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.18} />

              <XAxis
                type="number"
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />

              <YAxis
                type="category"
                dataKey="name"
                width={130}
                tick={{ fontSize: 12 }}
              />

              <Tooltip
                formatter={(value, name) => {
                  if (name === "winRate") {
                    return [`${value}%`, "Porcentaje de victoria"];
                  }

                  return [value, name];
                }}
                labelFormatter={(label) => `Apertura: ${label}`}
              />

              <Bar
                dataKey="winRate"
                name="winRate"
                fill="#6aa84f"
                radius={[0, 8, 8, 0]}
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
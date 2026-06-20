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

interface WinnerChartData {
  name: string;
  value: number;
}

interface WinnerChartUIProps {
  data: WinnerChartData[];
}

export default function WinnerChartUI({ data }: WinnerChartUIProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const chartData = data.map((item) => ({
    ...item,
    percentage:
      total === 0 ? 0 : Number(((item.value / total) * 100).toFixed(2)),
  }));

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Distribución de ganadores
        </Typography>

        {total === 0 ? (
          <Typography variant="body2">
            No hay partidas para los filtros seleccionados.
          </Typography>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 12, right: 44, left: 40, bottom: 12 }}
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
                width={80}
                tick={{ fontSize: 12 }}
              />

              <Tooltip
                formatter={(value, name) => {
                  if (name === "percentage") {
                    return [`${value}%`, "Porcentaje"];
                  }

                  return [value, name];
                }}
              />

              <Bar
                dataKey="percentage"
                name="percentage"
                fill="#d6b35f"
                radius={[0, 8, 8, 0]}
              >
                <LabelList
                  dataKey="percentage"
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
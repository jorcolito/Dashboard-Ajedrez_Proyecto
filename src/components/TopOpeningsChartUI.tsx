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

interface TopOpeningData {
  name: string;
  count: number;
  percentage: number;
}

interface TopOpeningsChartUIProps {
  data: TopOpeningData[];
}

export default function TopOpeningsChartUI({
  data,
}: TopOpeningsChartUIProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Top 10 aperturas más utilizadas
        </Typography>

        {data.length === 0 ? (
          <Typography variant="body2">
            No hay aperturas para los filtros seleccionados.
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
                tickFormatter={(value) => `${value}%`}
              />

              <YAxis
                type="category"
                dataKey="name"
                width={130}
                tick={{ fontSize: 12 }}
              />

              <Tooltip
                formatter={(value, name, props) => {
                  if (name === "percentage") {
                    return [`${value}%`, "Porcentaje"];
                  }

                  return [value, name];
                }}
                labelFormatter={(label) => `Apertura: ${label}`}
              />

              <Bar
                dataKey="percentage"
                name="percentage"
                fill="#5b7cdb"
                radius={[0, 8, 8, 0]}
              >
                <LabelList
                  dataKey="percentage"
                  position="right"
                  formatter={(value) => `${value}%`}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
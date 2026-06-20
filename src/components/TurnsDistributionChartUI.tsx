import { useMemo } from "react";
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
import type { Game } from "../types/Game";

interface TurnsDistributionChartUIProps {
  games: Game[];
}

function getTurnsRange(turns: number) {
  if (turns <= 20) {
    return "0-20";
  }

  if (turns <= 40) {
    return "21-40";
  }

  if (turns <= 60) {
    return "41-60";
  }

  if (turns <= 80) {
    return "61-80";
  }

  if (turns <= 100) {
    return "81-100";
  }

  return "101+";
}

export default function TurnsDistributionChartUI({
  games,
}: TurnsDistributionChartUIProps) {
  const chartData = useMemo(() => {
    const ranges = {
      "0-20": 0,
      "21-40": 0,
      "41-60": 0,
      "61-80": 0,
      "81-100": 0,
      "101+": 0,
    };

    games.forEach((game) => {
      const range = getTurnsRange(game.turns);
      ranges[range] += 1;
    });

    return Object.entries(ranges).map(([range, count]) => ({
      range,
      count,
    }));
  }, [games]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Duración por número de turnos
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          Distribución de partidas según la cantidad de turnos registrados.
        </Typography>

        {games.length === 0 ? (
          <Typography variant="body2">
            No hay partidas para los filtros seleccionados.
          </Typography>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{ top: 12, right: 24, left: 0, bottom: 12 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.18} />

              <XAxis dataKey="range" />

              <YAxis />

              <Tooltip
                formatter={(value) => [value, "Partidas"]}
                labelFormatter={(label) => `Turnos: ${label}`}
              />

              <Bar
                dataKey="count"
                name="Partidas"
                fill="#6aa84f"
                radius={[8, 8, 0, 0]}
              >
                <LabelList
                  dataKey="count"
                  position="top"
                  formatter={(value) => {
                    if (typeof value === "number") {
                      return value;
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
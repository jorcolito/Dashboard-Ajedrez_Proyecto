import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
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
import type { Game } from "../types/Game";

interface MoveAnalysisByTurnUIProps {
  games: Game[];
}

export default function MoveAnalysisByTurnUI({
  games,
}: MoveAnalysisByTurnUIProps) {
  const [turnNumber, setTurnNumber] = useState(1);

  const moveAnalysisData = useMemo(() => {
    const moveCounts = games.reduce((acc, game) => {
      const moves = game.moves.trim().split(/\s+/);
      const move = moves[turnNumber - 1];

      if (!move) {
        return acc;
      }

      acc[move] = (acc[move] || 0) + 1;

      return acc;
    }, {} as Record<string, number>);

    const totalMovesInTurn = Object.values(moveCounts).reduce(
      (sum, count) => sum + count,
      0,
    );

    return Object.entries(moveCounts)
      .map(([move, count]) => ({
        move,
        count,
        percentage:
          totalMovesInTurn === 0
            ? 0
            : Number(((count / totalMovesInTurn) * 100).toFixed(2)),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [games, turnNumber]);

  const mostUsedMove = moveAnalysisData[0];

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="h6">
              Moda de movimientos por turno
            </Typography>

            <Typography variant="body2">
              Analiza los movimientos más comunes según los filtros activos.
            </Typography>
          </Box>

          <TextField
            select
            label="Turno"
            value={turnNumber}
            onChange={(event) => {
              setTurnNumber(Number(event.target.value));
            }}
            sx={{ width: 120 }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((turn) => (
              <MenuItem key={turn} value={turn}>
                {turn}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {mostUsedMove && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2">
              Movimiento más usado en el turno {turnNumber}
            </Typography>

            <Typography variant="h4">
              {mostUsedMove.move}
            </Typography>

            <Typography variant="body2">
              Aparece en {mostUsedMove.percentage}% de las partidas filtradas.
            </Typography>
          </Box>
        )}

        {moveAnalysisData.length === 0 ? (
          <Typography variant="body2">
            No hay movimientos disponibles para este turno.
          </Typography>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={moveAnalysisData}
              layout="vertical"
              margin={{ top: 12, right: 44, left: 30, bottom: 12 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.18} />

              <XAxis
                type="number"
                tickFormatter={(value) => `${value}%`}
              />

              <YAxis
                type="category"
                dataKey="move"
                width={60}
                tick={{ fontSize: 12 }}
              />

              <Tooltip
                formatter={(value, name) => {
                  if (name === "percentage") {
                    return [`${value}%`, "Porcentaje"];
                  }

                  return [value, name];
                }}
                labelFormatter={(label) => `Movimiento: ${label}`}
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
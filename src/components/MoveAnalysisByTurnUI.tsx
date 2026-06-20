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
    <Card className="compact-chart-card">
      <CardContent>
        <Box className="compact-chart-header">
          <Box>
            <Typography variant="h6">
              Moda de movimientos por turno
            </Typography>

            {mostUsedMove && (
              <Typography variant="body2">
                Movimiento más común:{" "}
                <strong>{mostUsedMove.move}</strong> ({mostUsedMove.percentage}%)
              </Typography>
            )}
          </Box>

          <TextField
            select
            label="Turno"
            value={turnNumber}
            onChange={(event) => {
              setTurnNumber(Number(event.target.value));
            }}
            sx={{ width: 105 }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((turn) => (
              <MenuItem key={turn} value={turn}>
                {turn}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {moveAnalysisData.length === 0 ? (
          <Box className="compact-empty-state">
            <Typography variant="body2">
              No hay movimientos disponibles para este turno.
            </Typography>
          </Box>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              data={moveAnalysisData}
              layout="vertical"
              margin={{ top: 8, right: 42, left: 45, bottom: 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.16} />

              <XAxis
                type="number"
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />

              <YAxis
                type="category"
                dataKey="move"
                width={45}
                tick={{ fontSize: 11 }}
              />

              <Tooltip
                formatter={(value) => [`${value}%`, "Porcentaje"]}
                labelFormatter={(label) => `Movimiento: ${label}`}
              />

              <Bar
                dataKey="percentage"
                fill="#d6b35f"
                radius={[0, 8, 8, 0]}
                barSize={18}
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
import {
  Card,
  CardContent,
  Grid,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import type { WinnerFilter, VictoryStatusFilter } from "../types/Game";

interface FilterUIProps {
  winnerFilter: WinnerFilter;
  victoryStatusFilter: VictoryStatusFilter;
  onWinnerChange: (value: WinnerFilter) => void;
  onVictoryStatusChange: (value: VictoryStatusFilter) => void;
  onClearFilters: () => void;
}

export default function FilterUI({
  winnerFilter,
  victoryStatusFilter,
  onWinnerChange,
  onVictoryStatusChange,
  onClearFilters,
}: FilterUIProps) {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <TextField
              select
              fullWidth
              label="Ganador"
              value={winnerFilter}
              onChange={(event) => {
                const value = event.target.value as WinnerFilter;
                onWinnerChange(value);
              }}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="white">Blancas</MenuItem>
              <MenuItem value="black">Negras</MenuItem>
              <MenuItem value="draw">Empate</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 2.4 }}>
            <TextField
              select
              fullWidth
              label="Tipo de Victoria"
              value={victoryStatusFilter}
              onChange={(event) => {
                const value = event.target.value as VictoryStatusFilter;
                onVictoryStatusChange(value);
              }}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="mate">Jaque Mate</MenuItem>
              <MenuItem value="resign">Rendición</MenuItem>
              <MenuItem value="outoftime">Tiempo Agotado</MenuItem>
              <MenuItem value="draw">Empate</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 2.4 }}>
            <TextField select fullWidth label="Partida Clasificada">
              <MenuItem value="true">Sí</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 2.4 }}>
            <TextField select fullWidth label="Tiempo de Juego">
              <MenuItem value="bullet">Bullet</MenuItem>
              <MenuItem value="blitz">Blitz</MenuItem>
              <MenuItem value="rapid">Rapid</MenuItem>
              <MenuItem value="classical">Clásica</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <Button onClick={onClearFilters}>Limpiar Filtros</Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

import "./App.css";
import { Grid } from "@mui/material";
import HeaderUI from "./components/HeaderUI";
import FilterUI from "./components/FilterUI";
import IndicatorUI from "./components/IndicatorUI";
import games from "./data/games.json";
import WinnerChartUI from "./components/WinnerChartUI";
import { useState } from "react";
import type { Game, WinnerFilter, VictoryStatusFilter, RatedFilter } from "./types/Game";

function App() {
  const gameData = games as Game[];
  const [winnerFilter, setWinnerFilter] = useState<WinnerFilter>("");
  const [victoryStatusFilter, setVictoryStatusFilter] =
    useState<VictoryStatusFilter>("");
  const [ratedFilter, setRatedFilter] = useState<RatedFilter>("");
  const filteredGames = gameData.filter((game) => {
    const matchesWinner = winnerFilter === "" || game.winner === winnerFilter;

    const matchesVictoryStatus =
      victoryStatusFilter === "" || game.victory_status === victoryStatusFilter;

    const matchesRated =
      ratedFilter === "" || game.rated.toLowerCase() === ratedFilter;

    return matchesWinner && matchesVictoryStatus && matchesRated;
  });
  const winnerChartGames = gameData.filter((game) => {
    const matchesVictoryStatus =
      victoryStatusFilter === "" || game.victory_status === victoryStatusFilter;

    return matchesVictoryStatus;
  });
  const totalGames = filteredGames.length;
  const whiteWins = filteredGames.filter(
    (game) => game.winner === "white",
  ).length;
  const blackWins = filteredGames.filter(
    (game) => game.winner === "black",
  ).length;
  const draws = filteredGames.filter((game) => game.winner === "draw").length;
  // hechos especialmente para el grafico circular, se filtran las partidas sin importar el ganador, pero si se toma en cuenta el tipo de victoria para que el grafico se actualice al cambiar ese filtro
  const chartWhiteWins = winnerChartGames.filter(
    (game) => game.winner === "white",
  ).length;

  const chartBlackWins = winnerChartGames.filter(
    (game) => game.winner === "black",
  ).length;

  const chartDraws = winnerChartGames.filter(
    (game) => game.winner === "draw",
  ).length;

  const averageRating =
    filteredGames.length === 0
      ? 0
      : Math.round(
          filteredGames.reduce((sum, game) => {
            return sum + game.white_rating + game.black_rating;
          }, 0) /
            (filteredGames.length * 2),
        );

  const winnerChartData = [
    { name: "Blancas", value: chartWhiteWins },
    { name: "Negras", value: chartBlackWins },
    { name: "Empates", value: chartDraws },
  ];

  return (
    <>
      <HeaderUI />
      <FilterUI
        winnerFilter={winnerFilter}
        victoryStatusFilter={victoryStatusFilter}
        ratedFilter={ratedFilter}
        onWinnerChange={setWinnerFilter}
        onVictoryStatusChange={setVictoryStatusFilter}
        onRatedChange={setRatedFilter}
        onClearFilters={() => {
          setWinnerFilter("");
          setVictoryStatusFilter("");
          setRatedFilter("");
        }}
      />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 2.4 }}>
          <IndicatorUI
            title="Total de Partidas"
            value={totalGames}
            description="# total de partidas analizadas"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2.4 }}>
          <IndicatorUI
            title="Victorias Blancas"
            value={whiteWins}
            description="# de partidas ganadas por las blancas"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2.4 }}>
          <IndicatorUI
            title="Victorias Negras"
            value={blackWins}
            description="# de partidas ganadas por las negras"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2.4 }}>
          <IndicatorUI
            title="Empates"
            value={draws}
            description="# de partidas que terminaron en empate"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2.4 }}>
          <IndicatorUI
            title="Rating Promedio"
            value={averageRating}
            description="ELO promedio de los jugadores analizados"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2.4 }}>
          <WinnerChartUI data={winnerChartData} />
        </Grid>
      </Grid>
    </>
  );
}
export default App;

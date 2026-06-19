import "./App.css";
import { Grid } from "@mui/material";
import HeaderUI from "./components/HeaderUI";
import FilterUI from "./components/FilterUI";
import IndicatorUI from "./components/IndicatorUI";
import games from "./data/games.json";
import WinnerChartUI from "./components/WinnerChartUI";
import { useState } from "react";
import type {
  Game,
  WinnerFilter,
  VictoryStatusFilter,
  RatedFilter,
  TimeControl,
  TimeControlFilter,
} from "./types/Game";

function getTimeControl(incrementCode: string): TimeControl {
  const [baseText, incrementText] = incrementCode.split("+");

  const baseMinutes = Number(baseText);
  const incrementSeconds = Number(incrementText);

  const estimatedSeconds = baseMinutes * 60 + incrementSeconds * 40;

  if (estimatedSeconds < 180) {
    return "bullet";
  }

  if (estimatedSeconds < 480) {
    return "blitz";
  }

  if (estimatedSeconds < 1500) {
    return "rapid";
  }

  return "classical";
}

function App() {
  const gameData = games as Game[];

  const [winnerFilter, setWinnerFilter] = useState<WinnerFilter>("");

  const [victoryStatusFilter, setVictoryStatusFilter] =
    useState<VictoryStatusFilter>("");

  const [ratedFilter, setRatedFilter] = useState<RatedFilter>("");

  const [timeControlFilter, setTimeControlFilter] =
    useState<TimeControlFilter>("");

  const filteredGames = gameData.filter((game) => {
    const matchesWinner =
      winnerFilter === "" || game.winner === winnerFilter;

    const matchesVictoryStatus =
      victoryStatusFilter === "" ||
      game.victory_status === victoryStatusFilter;

    const matchesRated =
      ratedFilter === "" || game.rated.toLowerCase() === ratedFilter;

    const matchesTimeControl =
      timeControlFilter === "" ||
      getTimeControl(game.increment_code) === timeControlFilter;

    return (
      matchesWinner &&
      matchesVictoryStatus &&
      matchesRated &&
      matchesTimeControl
    );
  });

  const winnerChartGames = gameData.filter((game) => {
    const matchesVictoryStatus =
      victoryStatusFilter === "" ||
      game.victory_status === victoryStatusFilter;

    const matchesRated =
      ratedFilter === "" || game.rated.toLowerCase() === ratedFilter;

    const matchesTimeControl =
      timeControlFilter === "" ||
      getTimeControl(game.increment_code) === timeControlFilter;

    return matchesVictoryStatus && matchesRated && matchesTimeControl;
  });

  const totalGames = filteredGames.length;

  const whiteWins = filteredGames.filter(
    (game) => game.winner === "white",
  ).length;

  const blackWins = filteredGames.filter(
    (game) => game.winner === "black",
  ).length;

  const draws = filteredGames.filter(
    (game) => game.winner === "draw",
  ).length;

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
        timeControlFilter={timeControlFilter}
        onWinnerChange={setWinnerFilter}
        onVictoryStatusChange={setVictoryStatusFilter}
        onRatedChange={setRatedFilter}
        onTimeControlChange={setTimeControlFilter}
        onClearFilters={() => {
          setWinnerFilter("");
          setVictoryStatusFilter("");
          setRatedFilter("");
          setTimeControlFilter("");
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
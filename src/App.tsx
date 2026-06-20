import "./App.css";
import { Grid } from "@mui/material";
import HeaderUI from "./components/HeaderUI";
import FilterUI from "./components/FilterUI";
import IndicatorUI from "./components/IndicatorUI";
import games from "./data/games.json";
import WinnerChartUI from "./components/WinnerChartUI";
import { useState } from "react";
import TopOpeningsChartUI from "./components/TopOpeningsChartUI";
import BestOpeningsChartUI from "./components/BestOpeningsChartUI";
import MoveAnalysisByTurnUI from "./components/MoveAnalysisByTurnUI";
import TurnsDistributionChartUI from "./components/TurnsDistributionChartUI";

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

function getOpeningFamily(openingName: string): string {
  return openingName.split(":")[0].split("|")[0].trim();
}

function App() {
  const gameData = games as Game[];

  const timeControlOptions = Object.entries(
  gameData.reduce((acc, game) => {
    acc[game.increment_code] = (acc[game.increment_code] || 0) + 1;

    return acc;
  }, {} as Record<string, number>),
)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20)
  .map(([incrementCode]) => incrementCode);

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
      game.increment_code === timeControlFilter;

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
      game.increment_code === timeControlFilter;

    return matchesVictoryStatus && matchesRated && matchesTimeControl;
  });

  const openingPerformanceGames = gameData.filter((game) => {
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

    const chartWhiteWins = whiteWins;

    const chartBlackWins = blackWins;

    const chartDraws = draws;

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

  {
    /*
    openingCounts crea un objeto y el topOpeningsData lo convierte en un array
    */
  }
  const openingCounts = filteredGames.reduce((acc,game) => {
    const opening = getOpeningFamily(game.opening_name);

    acc[opening] = (acc[opening] || 0)+1;

    return acc;
  }, {} as Record<string, number>);

  const topOpeningsData = Object.entries(openingCounts)
  .map(([name,count]) => ({
    name,
    count,
    percentage:
      filteredGames.length=== 0
      ? 0
      : Number (((count / filteredGames.length) * 100).toFixed(2)),
  }))
  .sort((a,b) => b.count -a.count)
  .slice(0,10);

  const openingPerformance = openingPerformanceGames.reduce((acc, game) => {
  const opening = getOpeningFamily(game.opening_name);

  if (!acc[opening]) {
    acc[opening] = {
      name: opening,
      total: 0,
      wins: 0,
    };
  }

  acc[opening].total += 1;

  const isWin = winnerFilter !== "" && game.winner === winnerFilter;

  if (isWin) {
    acc[opening].wins += 1;
  }

  return acc;
}, {} as Record<string, { name: string; total: number; wins: number }>);

const bestOpeningsData = Object.values(openingPerformance)
  .filter((opening) => opening.total >= 20)
  .map((opening) => ({
    name: opening.name,
    total: opening.total,
    wins: opening.wins,
    winRate: Number(((opening.wins / opening.total) * 100).toFixed(2)),
  }))
  .sort((a, b) => b.winRate - a.winRate)
  .slice(0, 10);

  return (
    <>
      <HeaderUI />

      <FilterUI
        winnerFilter={winnerFilter}
        victoryStatusFilter={victoryStatusFilter}
        ratedFilter={ratedFilter}
        timeControlFilter={timeControlFilter}
        timeControlOptions={timeControlOptions}
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

        <Grid size={{ xs: 12, md: 4 }}>
          <WinnerChartUI data={winnerChartData} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <TopOpeningsChartUI data={topOpeningsData} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <BestOpeningsChartUI data={bestOpeningsData} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <MoveAnalysisByTurnUI games={filteredGames} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <BestOpeningsChartUI data={bestOpeningsData} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <MoveAnalysisByTurnUI games={filteredGames} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TurnsDistributionChartUI games={filteredGames} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
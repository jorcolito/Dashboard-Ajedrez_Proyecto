import "./App.css";
import { Grid } from "@mui/material";
import { useState } from "react";

import HeaderUI from "./components/HeaderUI";
import FilterUI from "./components/FilterUI";
import IndicatorUI from "./components/IndicatorUI";
import WinnerChartUI from "./components/WinnerChartUI";
import TopOpeningsChartUI from "./components/TopOpeningsChartUI";
import BestOpeningsChartUI from "./components/BestOpeningsChartUI";
import MoveAnalysisByTurnUI from "./components/MoveAnalysisByTurnUI";
import TurnsDistributionChartUI from "./components/TurnsDistributionChartUI";
import InsightPanelUI from "./components/InsightPanelUI";
import SectionTitleUI from "./components/SectionTitleUI";

import games from "./data/games.json";

import {
  FaChessPawn,
  FaChessKing,
  FaHandshake,
  FaChartBar,
  FaChessKnight,
  FaClock,
  FaTrophy,
  FaFire,
} from "react-icons/fa";

import type {
  Game,
  WinnerFilter,
  VictoryStatusFilter,
  RatedFilter,
  TimeControlFilter,
} from "./types/Game";

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

  const openingPerformanceGames = gameData.filter((game) => {
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
    { name: "Blancas", value: whiteWins },
    { name: "Negras", value: blackWins },
    { name: "Empates", value: draws },
  ];

  const openingCounts = filteredGames.reduce((acc, game) => {
    const opening = getOpeningFamily(game.opening_name);

    acc[opening] = (acc[opening] || 0) + 1;

    return acc;
  }, {} as Record<string, number>);

  const topOpeningsData = Object.entries(openingCounts)
    .map(([name, count]) => ({
      name,
      count,
      percentage:
        filteredGames.length === 0
          ? 0
          : Number(((count / filteredGames.length) * 100).toFixed(2)),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

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

 const minimumOpeningGames =
  openingPerformanceGames.length < 50
    ? 1
    : openingPerformanceGames.length < 200
      ? 2
      : 5;

const bestOpeningsData = Object.values(openingPerformance)
  .filter((opening) => opening.total >= minimumOpeningGames)
  .map((opening) => ({
    name: opening.name,
    total: opening.total,
    wins: opening.wins,
    winRate: Number(((opening.wins / opening.total) * 100).toFixed(2)),
  }))
  .sort((a, b) => b.winRate - a.winRate)
  .slice(0, 10);

  const timeControlCounts = filteredGames.reduce((acc, game) => {
    acc[game.increment_code] = (acc[game.increment_code] || 0) + 1;

    return acc;
  }, {} as Record<string, number>);

  const mostUsedTimeControl = Object.entries(timeControlCounts).sort(
    (a, b) => b[1] - a[1],
  )[0];

  const longestGameTurns =
    filteredGames.length === 0
      ? 0
      : Math.max(...filteredGames.map((game) => game.turns));

  const topOpening = topOpeningsData[0];

  const dominantWinnerData = [
    { name: "Blancas", value: whiteWins },
    { name: "Negras", value: blackWins },
    { name: "Empates", value: draws },
  ].sort((a, b) => b.value - a.value)[0];

  const dominantWinnerPercentage =
    totalGames === 0
      ? 0
      : Number(((dominantWinnerData.value / totalGames) * 100).toFixed(1));

  const insightCards = [
    {
      title: "Apertura dominante",
      value: topOpening ? topOpening.name : "Sin datos",
      description: topOpening
        ? `${topOpening.percentage}% de las partidas filtradas`
        : "No hay partidas filtradas",
      icon: <FaChessKnight />,
    },
    {
      title: "Control más usado",
      value: mostUsedTimeControl ? mostUsedTimeControl[0] : "Sin datos",
      description: mostUsedTimeControl
        ? `${mostUsedTimeControl[1]} partidas con este ritmo`
        : "No hay partidas filtradas",
      icon: <FaClock />,
    },
    {
      title: "Partida más larga",
      value: longestGameTurns,
      description: "movimientos individuales registrados",
      icon: <FaTrophy />,
    },
    {
      title: "Resultado dominante",
      value: dominantWinnerData.name,
      description: `${dominantWinnerPercentage}% dentro del filtro actual`,
      icon: <FaFire />,
    },
  ];

  return (
    <div className="app-shell">
      <HeaderUI />

      <div className="filters-wrapper">
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
      </div>

      <Grid container spacing={3} className="dashboard-grid">
        <Grid size={{ xs: 12 }}>
          <SectionTitleUI
            eyebrow="Resumen"
            title="Resumen general del dataset"
            description="Indicadores principales calculados según los filtros activos."
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
          <IndicatorUI
            title="Total de Partidas"
            value={totalGames}
            description="# total de partidas analizadas"
            icon={<FaChessPawn />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
          <IndicatorUI
            title="Victorias Blancas"
            value={whiteWins}
            description="# de partidas ganadas por las blancas"
            icon={<FaChessKing />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
          <IndicatorUI
            title="Victorias Negras"
            value={blackWins}
            description="# de partidas ganadas por las negras"
            icon={<FaChessKing />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
          <IndicatorUI
            title="Empates"
            value={draws}
            description="# de partidas que terminaron en empate"
            icon={<FaHandshake />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
          <IndicatorUI
            title="Rating Promedio"
            value={averageRating}
            description="ELO promedio de los jugadores analizados"
            icon={<FaChartBar />}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <SectionTitleUI
            eyebrow="Insights"
            title="Lectura inteligente de las partidas"
            description="Conclusiones automáticas generadas a partir de las partidas filtradas."
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <InsightPanelUI insights={insightCards} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <SectionTitleUI
            eyebrow="Análisis visual"
            title="Resultados, aperturas y movimientos"
            description="Visualizaciones comparativas para comprender patrones de juego dentro del dataset."
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <WinnerChartUI data={winnerChartData} />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <TopOpeningsChartUI data={topOpeningsData} />
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
      <footer className="dashboard-footer">
        <span>Dashboard de Análisis de Partidas de Ajedrez</span>
        <span>React · TypeScript · Material UI · Recharts</span>
        <span>Dataset: Lichess Online Chess Games</span>
      </footer>
    </div>
  );
}

export default App;
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import "./App.css";
import { Grid } from "@mui/material";
import HeaderUI from "./components/HeaderUI";
// import AlertUI from './components/AlertUI';
import FilterUI from "./components/FilterUI";
import IndicatorUI from "./components/IndicatorUI";
import games from "./data/games.json";
import WinnerChartUI from "./components/WinnerChartUI";
import { useState } from "react";

type Game = {
  winner: "white" | "black" | "draw";
  white_rating: number;
  black_rating: number;
};

function App() {
  const gameData = games as Game[];
  const [winnerFilter, setWinnerFilter] = useState("");
  const filteredGames = gameData.filter((game) => {
    if (winnerFilter === "") {
      return true;
    }
    return game.winner === winnerFilter;
  });
  const totalGames = filteredGames.length;
  const whiteWins = filteredGames.filter(
    (game) => game.winner === "white",
  ).length;
  const blackWins = filteredGames.filter(
    (game) => game.winner === "black",
  ).length;
  const draws = filteredGames.filter((game) => game.winner === "draw").length;
  const averageRating =
    filteredGames.length === 0
      ? 0
      : filteredGames.reduce((sum, game) => {
          return sum + game.white_rating + game.black_rating;
        }, 0) /
        (filteredGames.length * 2);

  const winnerChartData = [
    { name: "Blancas", value: whiteWins },
    { name: "Negras", value: blackWins },
    { name: "Empates", value: draws },
  ];

  return (
    <>
      <HeaderUI />
      <FilterUI
        winnerFilter={winnerFilter}
        onWinnerChange={setWinnerFilter}
        onClearFilters={() => setWinnerFilter("")}
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
            description="Rating promedio de los jugadores analizados"
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

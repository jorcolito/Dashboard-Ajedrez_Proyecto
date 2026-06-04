// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import FilterUI from './components/FilterUI'
import IndicatorUI from './components/IndicatorUI';

function App() {
  return (
    <>
      <HeaderUI />
      <FilterUI />
      <IndicatorUI title="Total de Partidas" value={20.058} description="Número total de partidas analizadas" />
    </>
  );
}
export default App;

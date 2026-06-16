import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import  './index.css'
import App from './App';


// para definir como se quiere que se vea la app
const theme = createTheme ({ 
  palette : {
    mode: 'dark',
    background: {
      default: '#0d0f1a',     // color del body (fondo, general)
      paper: '#151929',     // color de cards, menu, dialogs
    },
    primary: {
      main: '#c9a84c',   // color principal (botones, highlights)
    },
    text: {
      primary: '#f0f0f0',   // color del texto principal
      secondary: '#8a8fa8'   // color del texto secundario
    },
  },
  typography: {
    fontFamily: '"Inter", system-ui, sans-serif',     // fuente principal
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      {
        /*se usa themeprovider para que absolutamente todos los componentes
        reciban el tema sin tener que pasarlos uno por uno */
      }
      <ThemeProvider theme={theme}>
        {
          /* CssBaseline se encarga de resetear los estilos por defecto del navegador
          para que la app se vea igual en todos los navegadores */
        }
        <CssBaseline />
        <App />
      </ThemeProvider>
  </StrictMode>
)
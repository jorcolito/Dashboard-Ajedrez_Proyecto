import { Box, Typography } from "@mui/material";
import { FaChessKnight } from "react-icons/fa";

export default function HeaderUI() {
  return (
    <Box className="hero-section">
      <Box className="hero-main">
        <Box className="hero-text">
          <Typography variant="overline" className="hero-overline">
            Análisis de
          </Typography>

          <Typography variant="h3">Ajedrez</Typography>

          <Typography variant="body1">
            Explora, analiza y comprende miles de partidas jugadas en Lichess.
          </Typography>
        </Box>

        <Box className="hero-side-card">
          <Box className="hero-side-icon">
            <FaChessKnight />
          </Box>

          <Box>
            <Typography variant="h6" className="hero-side-title">
              Más que un juego, una pasión estratégica.
            </Typography>

            <Typography variant="body2">
              +20.000 partidas analizadas
            </Typography>

            <Typography variant="body2">
              +1.400 aperturas diferentes
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
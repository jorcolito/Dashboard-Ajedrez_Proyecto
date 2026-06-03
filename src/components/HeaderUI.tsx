import Typography from "@mui/material/Typography";

export default function HeaderUI() {
  return (
    <>
    <Typography variant = "h3" component = "h1" sx={{fontWeight: 'bold'}}>
        Dashboard de Análisis de Partidas de Ajedrez
    </Typography>
    <Typography variant = "body1" component = "p" sx={{fontStyle: 'italic'}}>
        Exploración y visualización de partidas jugadas en Lichess.
    </Typography>
    </>
  );
}

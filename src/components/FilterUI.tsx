import { Card, CardContent, Grid, TextField, MenuItem } from "@mui/material";

export default function FilterUI() {
    return (
        <Card>
            <CardContent>
                <Grid container spacing={2}>

                    <Grid size={{xs: 12, md: 4}}>
                        <TextField select fullWidth label = "Ganador">
                            <MenuItem value="white">Blancas</MenuItem>
                            <MenuItem value="black">Negras</MenuItem>
                            <MenuItem value="draw">Empate</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid size={{xs: 12, md: 4}}>
                        <TextField select fullWidth label = "Tipo de Victoria">
                            <MenuItem value="checkmate">Jaque Mate</MenuItem>
                            <MenuItem value="resignation">Rendición</MenuItem>
                            <MenuItem value="timeout">Tiempo Agotado</MenuItem>
                            <MenuItem value="draw">Empate</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid size={{xs: 12, md: 4}}>
                        <TextField select fullWidth label = "Partida Clasificada">
                            <MenuItem value = "true">Sí</MenuItem>
                            <MenuItem value = "false">No</MenuItem>
                        </TextField>
                    </Grid>


                </Grid>
            </CardContent>
        </Card>
    );
}
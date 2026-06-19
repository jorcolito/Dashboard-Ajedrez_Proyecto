export type Game = {
    id: string;
    rated: string;
    created_at: number;
    turns: number;
    victory_status: "mate" | "resign" | "outoftime" | "draw";
    winner: "white" | "black" | "draw";
    increment_code: string;
    white_rating: number;
    black_id: string;
    black_rating: number;
    opening_eco: string;
    opening_name: string;
    opening_ply: number;
    moves: string;
};

export type WinnerFilter = "" | Game["winner"];
export type VictoryStatusFilter = "" | Game["victory_status"];
export type RatedFilter = "" | "true" | "false";

// ya que directamente no existen tipos de tiempo estilo bullet blitz rapid, se creara una ufncion auxiliar
// para poder hacer que los 10+5 o 3+0 se clasifiquen como bullet, blitz o rapid segun corresponda, y asi poder filtrar por tiempo de juego en el componente de filtros
// 10+5 significa que la partida dura 10 minutos y cada jugador recibe un incremento de 5 segundos por jugada, 3+0 significa que la partida dura 3 minutos sin incremento, etc.
export type TimeControl = "bullet" | "blitz" | "rapid" | "classical";
export type TimeControlFilter = "" | TimeControl;
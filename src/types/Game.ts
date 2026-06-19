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
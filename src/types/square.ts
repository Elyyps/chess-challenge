import { ChessPieceType } from "./chess-piece";

export type SquareType = {
  row: number;
  col: number;
  piece: ChessPieceType | null;
};

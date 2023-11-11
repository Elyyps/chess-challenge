export enum PieceType {
  Pawn = "p",
  Rook = "r",
  Knight = "n",
  Bishop = "b",
  Queen = "q",
  King = "k",
}
export type ChessPieceType = {
  type: PieceType;
  color: "white" | "black";
};

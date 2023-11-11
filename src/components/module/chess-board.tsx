import React from "react";
import style from "./chess-board.module.scss";
import ChessSquare from "../cores/chess-square/chess-square";
import { ChessPiece } from "../cores/chess-piece/chess-piece";
import { fenToBoard, boardToFen } from "../../utils/convert-fen";

interface IChessBoard {
  fen: string;
  onBoardChange: (fen: string) => void;
}
export const ChessBoard = ({ fen, onBoardChange }: IChessBoard) => {
  const [selectedSquare, setSelectedSquare] = React.useState<{
    row: number;
    col: number;
  } | null>(null);
  const [board, setBoard] = React.useState<string[][]>(fenToBoard(fen));
  const [isWhiteTurn, setIsWhiteTurn] = React.useState(true);

  React.useEffect(() => {
    console.log(fen);
    setBoard(fenToBoard(fen));
    setIsWhiteTurn(fen.includes("w"));
  }, [fen]);

  const isSameColor = (moved: string, target: string) => {
    return isWhiteTurn
      ? moved === moved.toUpperCase() && target === target.toUpperCase()
      : moved === moved.toLowerCase() && target === target.toLowerCase();
  };
  const isAllowedToPlay = (row: number, col: number) => {
    return (
      board[row][col] === " " ||
      (isWhiteTurn
        ? board[row][col] === board[row][col].toLowerCase()
        : board[row][col] === board[row][col].toUpperCase())
    );
  };
  const handleSquareClick = (row: number, col: number) => {
    if (selectedSquare) {
      const fromRow = selectedSquare.row;
      const fromCol = selectedSquare.col;

      const movedPiece = board[fromRow][fromCol];
      const targetPiece = board[row][col];

      // Invalid move
      if (isSameColor(movedPiece, targetPiece) && !isAllowedToPlay(row, col)) {
        setSelectedSquare(null);
        return;
      }

      // Move the piece and update the board state
      const newBoard = [...board];
      newBoard[row][col] = movedPiece;
      newBoard[fromRow][fromCol] = " "; // Clear the original position

      setBoard(newBoard);
      setSelectedSquare(null);

      // Update the FEN string with the correct turn
      onBoardChange(boardToFen(newBoard, !isWhiteTurn));
      // Swap turn
      setIsWhiteTurn(!isWhiteTurn);
    } else if (!selectedSquare && !isAllowedToPlay(row, col)) {
      setSelectedSquare({ row, col });
    }
  };
  const onSwap = (newType: string, row: number, col: number) => {
    const newBoard = [...board];
    newBoard[row][col] = newType;

    setBoard(newBoard);
    setSelectedSquare(null);

    onBoardChange(boardToFen(newBoard, isWhiteTurn));
  };
  return (
    <div className={style["chess-board"]}>
      {Array.from({ length: 8 }).map((_: any, colIndex: number) => (
        <div key={colIndex}>
          {board.map((row: any, rowIndex: number) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              data-testid={`chess-square-${rowIndex}-${colIndex}`}
            >
              <ChessSquare
                isDark={(rowIndex + colIndex) % 2 === 1}
                isSelected={
                  selectedSquare?.row === rowIndex &&
                  selectedSquare?.col === colIndex
                }
                onClick={() => handleSquareClick(rowIndex, colIndex)}
              >
                <ChessPiece
                  piece={{
                    type: row[colIndex],
                    color:
                      row[colIndex] === row[colIndex]?.toUpperCase()
                        ? "white"
                        : "black",
                  }}
                  onSwap={(e) => onSwap(e, rowIndex, colIndex)}
                />
              </ChessSquare>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

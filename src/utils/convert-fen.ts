export const fenToBoard = (fen: string) => {
  const parts = fen.split(" ");
  const boardPart = parts[0];
  const rows = boardPart.split("/");
  const board = [];

  for (const row of rows) {
    const newRow = [];
    for (const char of row) {
      if (/[1-8]/.test(char)) {
        const emptySquares = parseInt(char, 10);
        for (let i = 0; i < emptySquares; i++) {
          newRow.push(" ");
        }
      } else {
        newRow.push(char);
      }
    }
    board.push(newRow);
  }

  return board;
};
export const boardToPartialFen = (board: string[][]) => {
  return board
    .map((row) => {
      let fenRow = "";
      let emptyCount = 0;

      for (const piece of row) {
        if (piece === " ") {
          emptyCount++;
        } else {
          if (emptyCount > 0) {
            fenRow += emptyCount;
            emptyCount = 0;
          }
          fenRow += piece;
        }
      }

      if (emptyCount > 0) {
        fenRow += emptyCount;
      }

      return fenRow;
    })
    .join("/");
};
export const boardToFen = (board: string[][], isWhiteTurn: boolean) => {
  const fen = boardToPartialFen(board);
  const parts = fen.split(" ");

  // Update the board part of the FEN
  parts[0] = fen;
  // Update the player's turn
  parts[1] = isWhiteTurn ? "w" : "b";
  parts[2] = "KQkq";
  parts[3] = "-";
  parts[4] = "0";
  parts[5] = "1";
  // Reconstruct the updated FEN string
  const updatedFen = parts.join(" ");

  return updatedFen;
};

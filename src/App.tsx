import React from 'react';
import "./App.scss";
import { ChessBoard } from "./components/module/chess-board";
import { useCookies } from "react-cookie";

const initialBoard = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const App = () => {
  const [cookies, setCookie] = useCookies(["fen"]);
  const [fen, setFen] = React.useState(cookies.fen ?? initialBoard);
  const [inputFen, setInputFen] = React.useState(cookies.fen ?? initialBoard);
  const [isValidFen, setIsValidFen] = React.useState(true);

  const isValidFenString = (fen: string) => {
    const fenRegex =
      /^([rnbqkpRNBQKP1-8]+\/){7}[rnbqkpRNBQKP1-8]+ [wb] ([KkQq-]+|[KkQq]{2}) (-|[a-h][36]) \d+ \d+$/;
    const isValid = fenRegex.test(fen);
    setIsValidFen(isValid);
  };
  const handleFenInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputFen = event.target.value;
    setInputFen(inputFen);
  };
  const onBoardChange = (newFen: string) => {
    setInputFen(newFen);
    setCookie("fen", newFen);
    setFen(newFen);
  };
  const onApplyFen = () => {
    isValidFenString(inputFen);
    if (isValidFen) {
      setFen(inputFen);
      setCookie("fen", inputFen);
    }
  };
  const onReset = () => {
    onBoardChange(initialBoard);
    setIsValidFen(true);
  };
  const isWhiteTurn = inputFen.includes("w");
  return (
    <div className="container game">
      <h1>Chess game</h1>
      <h3>{`${isWhiteTurn ? "White" : "Black"}  Turn`} !</h3>
      {isValidFen ? (
        <ChessBoard fen={fen} onBoardChange={onBoardChange} />
      ) : (
        <p>Invalid FEN string. Please enter a valid FEN.</p>
      )}
      <div className="game-input">
        <input
          type="text"
          value={inputFen}
          onChange={handleFenInputChange}
          placeholder="Enter FEN string"
        />
        <button className="apply-btn" onClick={onApplyFen}>
          Apply
        </button>
        <button className="reset-btn" onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default App;

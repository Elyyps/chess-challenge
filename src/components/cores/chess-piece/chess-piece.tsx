import React from "react";
import style from "./chess-piece.module.scss";
import { ReactSVG } from "react-svg";
import { ChessPieceType } from "../../../types/chess-piece";
import { SwapPiece } from "../swap-piece/swap-piece";

interface IChessPiece {
  piece: ChessPieceType;
  onSwap: (newPiece: string) => void;
}
export const ChessPiece = ({ piece, onSwap }: IChessPiece) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  return (
    <div
      className={style["chess-piece"]}
      onDoubleClick={() => setIsOpen(!isOpen)}
    >
      <ReactSVG
        src={`/icons/${piece.type}.svg`}
        className={`${"piece-" + piece.color} ${
          piece.type?.toLowerCase() === "p" && style["chess-piece-small"]
        }`}
      />
      {isOpen && (
        <SwapPiece
          piece={piece}
          onClose={() => setIsOpen(false)}
          onClick={(p) => {
            onSwap(p);
            setIsOpen(false);
          }}
        />
      )}
    </div>
  );
};

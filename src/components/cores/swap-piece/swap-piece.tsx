import React from "react";
import { ReactSVG } from "react-svg";
import { ChessPieceType, PieceType } from "../../../types/chess-piece";
import style from "./swap-piece.module.scss";

interface ISwapPiece {
  onClose: () => void;
  onClick: (piece: string) => void;
  piece: ChessPieceType;
}
export const SwapPiece = ({ piece, onClick, onClose }: ISwapPiece) => {
  const possiblePieces: PieceType[] = [
    PieceType.Bishop,
    PieceType.King,
    PieceType.Knight,
    PieceType.Pawn,
    PieceType.Queen,
    PieceType.Rook,
  ];

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const handleOnClick = (type: PieceType) => {
    const newPiece = piece.color === "white" ? type.toUpperCase() : type;
    onClick(newPiece);
  };
  return (
    <div className={style["swap-piece"]} onClick={handleOverlayClick}>
      <div className={style["swap-piece-content"]}>
        <h3>Change piece to:</h3>
        <div>
          {possiblePieces
            .filter((a) => a !== piece.type.toLowerCase())
            .map((item, key) => (
              <div key={key} onClick={() => handleOnClick(item)}>
                <ReactSVG
                  src={`/icons/${item}.svg`}
                  className={"piece-" + piece.color}
                />
              </div>
            ))}
        </div>

        <span onClick={onClose}>x</span>
      </div>
    </div>
  );
};

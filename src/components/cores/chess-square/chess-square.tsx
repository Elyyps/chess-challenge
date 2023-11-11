import style from "./chess-square.module.scss";
interface IChessSquare {
  isDark: boolean;
  isSelected: boolean;
  children: JSX.Element;
  onClick: () => void;
}
const ChessSquare = ({
  isDark,
  isSelected,
  children,
  onClick,
}: IChessSquare) => {
  return (
    <div
      className={`${style["chess-square"]} ${
        style["chess-square-" + (isDark ? "dark" : "light")]
      } ${isSelected && style["chess-square-selected"]}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ChessSquare;

import { FC } from "react";
import { Square } from "../modules/Square";

interface SquareProps {
  square: Square;
  selected: boolean;
  click: (square: Square) => void;
}
const SquareComponent: FC<SquareProps> = ({ square, selected, click }) => {
  return (
    <div
      className={["square", square.color, selected ? "selected" : ""].join(" ")}
      onClick={() => click(square)}
    >
      {square.available && !square.figure && <div className="available" />}
      {square.figure?.logo && (
        <img src={square.figure.logo} alt={square.figure.name} />
      )}
    </div>
  );
};

export default SquareComponent;

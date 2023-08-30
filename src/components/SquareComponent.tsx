import { FC } from "react";
import { Square } from "../modules/Square";

interface SquareProps {
  square: Square;
}
const SquareComponent: FC<SquareProps> = ({ square }) => {
  return (
    <div className={["square", square.color].join(" ")}>
      {square.figure?.logo && (
        <img src={square.figure.logo} alt={square.figure.name} />
      )}
    </div>
  );
};

export default SquareComponent;

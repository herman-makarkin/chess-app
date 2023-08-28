import { FC } from "react";
import { Square } from "../modules/Square";

interface SquareProps {
  square: Square;
}
const SquareComponent: FC<SquareProps> = ({ square }) => {
  return <div className={["square", square.color].join(" ")}>134</div>;
};

export default SquareComponent;

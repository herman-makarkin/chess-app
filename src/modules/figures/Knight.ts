import { Figure, FigureTypes } from "./Figure";
import { Colors } from "../Colors";
import { Square } from "../Square";
import blackLogo from "../../assets/knight_b.png";
import whiteLogo from "../../assets/knight_w.png";

export class Knight extends Figure {
  constructor(color: Colors, square: Square) {
    super(color, square);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureTypes.KNIGHT;
  }
  canMove(square: Square): boolean {
    if (!super.canMove(square)) return false;
    const dx = Math.abs(square.x - this.square.x);
    const dy = Math.abs(square.y - this.square.y);

    return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
  }
}

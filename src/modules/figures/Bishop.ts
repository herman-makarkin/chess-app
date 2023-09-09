import { Figure, FigureTypes } from "./Figure";
import { Colors } from "../Colors";
import { Square } from "../Square";
import blackLogo from "../../assets/bishop_b.png";
import whiteLogo from "../../assets/bishop_w.png";

export class Bishop extends Figure {
  constructor(color: Colors, square: Square) {
    super(color, square);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureTypes.BISHOP;
  }

  canMove(square: Square): boolean {
    if (!super.canMove(square)) return false;
    if (this.square.isEmptyDiagonal(square)) return true;
    return false;
  }
}

import { Figure, FigureTypes } from "./Figure";
import { Colors } from "../Colors";
import { Square } from "../Square";
import blackLogo from "../../assets/queen_b.png";
import whiteLogo from "../../assets/queen_w.png";

export class Queen extends Figure {
  constructor(color: Colors, square: Square) {
    super(color, square);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureTypes.QUEEN;
  }

  canAttack(square: Square): boolean {
    if (this.square.isEmptyVertical(square)) return true;
    if (this.square.isEmptyHorizontal(square)) return true;
    if (this.square.isEmptyDiagonal(square)) return true;
    return false;
  }

  canMove(square: Square): boolean {
    if (!super.canMove(square)) return false;
    if (this.canAttack(square)) return true;
    return false;
  }
}

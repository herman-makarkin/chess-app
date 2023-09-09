import { Figure, FigureTypes } from "./Figure";
import { Colors } from "../Colors";
import { Square } from "../Square";
import blackLogo from "../../assets/rook_b.png";
import whiteLogo from "../../assets/rook_w.png";

export class Rook extends Figure {
  constructor(color: Colors, square: Square) {
    super(color, square);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureTypes.ROOK;
  }
  canMove(square: Square): boolean {
    if (!super.canMove(square)) {
      return false;
    }
    if (this.square.isEmptyVertical(square)) return true;
    if (this.square.isEmptyHorizontal(square)) return true;
    return false;
  }
}

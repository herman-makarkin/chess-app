import { Figure, FigureTypes } from "./Figure";
import { Colors } from "../Colors";
import { Square } from "../Square";
import blackLogo from "../../assets/king_b.png";
import whiteLogo from "../../assets/king_w.png";

export class King extends Figure {
  constructor(color: Colors, square: Square) {
    super(color, square);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureTypes.KING;
  }
  canMove(target: Square): boolean {
    if (!super.canMove(target)) return false;
    const dx = Math.abs(this.square.x - target.x);
    const dy = Math.abs(this.square.y - target.y);
    return dx <= 1 && dy <= 1;
  }
}

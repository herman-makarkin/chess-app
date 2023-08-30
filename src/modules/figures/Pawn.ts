import { Figure, FigureTypes } from "./Figure";
import { Colors } from "../Colors";
import { Square } from "../Square";
import blackLogo from "../../assets/pawn_b.png";
import whiteLogo from "../../assets/pawn_w.png";

export class Pawn extends Figure {
  constructor(color: Colors, square: Square) {
    super(color, square);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureTypes.PAWN;
  }
}

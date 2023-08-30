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
}

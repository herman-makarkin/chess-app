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
}

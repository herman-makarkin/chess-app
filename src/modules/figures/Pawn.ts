import { Figure, FigureTypes } from "./Figure";
import { Colors } from "../Colors";
import { Square } from "../Square";
import blackLogo from "../../assets/pawn_b.png";
import whiteLogo from "../../assets/pawn_w.png";

export class Pawn extends Figure {
  isFirstStep: boolean = true;

  constructor(color: Colors, square: Square) {
    super(color, square);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureTypes.PAWN;
  }
  canMove(target: Square): boolean {
    if (!super.canMove(target)) return false;
    const direction = this.square.figure?.color === Colors.BLACK ? 1 : -1;
    const firstStepDirection =
      this.square.figure?.color === Colors.BLACK ? 2 : -2;

    if (
      (target.y === this.square.y + direction ||
        (this.isFirstStep &&
          target.y === this.square.y + firstStepDirection)) &&
      target.x === this.square.x &&
      this.square.board.getSquare(target.x, target.y).isEmpty()
    ) {
      return true;
    }

    if (
      target.y === this.square.y + direction &&
      (target.x === this.square.x + 1 || target.x === this.square.x - 1) &&
      this.square.isEnemy(target)
    ) {
      return true;
    }
    return false;
  }

  moveFigure(target: Square): void {
    super.moveFigure(target);
    this.isFirstStep = false;
  }
}

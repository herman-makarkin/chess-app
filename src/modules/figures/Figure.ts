import { Colors } from "../Colors";
import { Square } from "../Square";
import logo from "../../assets/king_w.png";

export enum FigureTypes {
  ROOK = "rook",
  KNIGHT = "knight",
  BISHOP = "bishop",
  QUEEN = "queen",
  PAWN = "pawn",
  KING = "king",
  FIGURE = "figure",
}

export class Figure {
  color: Colors;
  logo: typeof logo | null;
  square: Square;
  name: FigureTypes;
  id: number;

  constructor(color: Colors, square: Square) {
    this.color = color;
    this.square = square;
    this.square.figure = this;
    this.logo = null;
    this.name = FigureTypes.FIGURE;
    this.id = Math.random();
  }

  canMove(square: Square): boolean {
    if (square.figure?.color === this.color) return false;
    if (square.figure?.name === FigureTypes.KING) return false;
    return true;
  }

  moveFigure(target: Square): void {}
}

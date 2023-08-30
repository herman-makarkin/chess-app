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
    this.name = FigureTypes.PAWN;
    this.id = Math.random();
  }

  canMove(target: Square): boolean {
    return true;
  }

  moveFigure(target: Square): void {}
}

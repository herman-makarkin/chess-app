import { Figure, FigureTypes } from "./Figure";
import { Colors } from "../Colors";
import { Square } from "../Square";
import Board from "../Board";
import blackLogo from "../../assets/pawn_b.png";
import whiteLogo from "../../assets/pawn_w.png";

export class Pawn extends Figure {
  enPassant: boolean = false;
  isFirstMove: boolean;

  constructor(color: Colors, square: Square) {
    super(color, square);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureTypes.PAWN;
    this.isFirstMove = true;
  }

  canMove(target: Square): boolean {
    if (!super.canMove(target)) return false;
    const direction = this.square.figure?.color === Colors.BLACK ? 1 : -1;
    const firstMoveDirection =
      this.square.figure?.color === Colors.BLACK ? 2 : -2;

    if (
      (target.y === this.square.y + direction ||
        (this.isFirstMove &&
          target.y === this.square.y + firstMoveDirection)) &&
      target.x === this.square.x &&
      this.square.board.getSquare(target.x, target.y).isEmpty()
    ) {
      this.enPassant = false
      return true;
    }

    if (target.y === this.square.y + direction &&
      (target.x === this.square.x + 1 || target.x === this.square.x - 1)) {
      if (this.square.isEnemy(target)) {
        this.enPassant = false;
        return true;
      }
    }
    if (this.square.board.isXProper(this.square.x - 1)) {
      const leftNeighbor = this.square.board.getSquare(this.square.x - 1, this.square.y)
      console.log(this.square.isEnemy(leftNeighbor), leftNeighbor)
      if (this.square.isEnemy(leftNeighbor)
        && target.y === this.square.y + direction
        && target.x === this.square.x - 1
        && leftNeighbor.figure != null
        && leftNeighbor.figure.name === 'pawn'
        && this.square.board.moveCount - leftNeighbor.figure.lastMoved === 1) {
        this.enPassant = true
        return true
      }
    }
    if (this.square.board.isXProper(this.square.x - 1)) {
      const rightNeighbor = this.square.board.getSquare(this.square.x + 1, this.square.y)
      console.log(this.square.isEnemy(rightNeighbor), rightNeighbor)
      if (this.square.isEnemy(rightNeighbor)
        && target.y === this.square.y + direction
        && target.x === this.square.x + 1
        && rightNeighbor.figure != null
        && rightNeighbor.figure.name === 'pawn'
        && this.square.board.moveCount - rightNeighbor.figure.lastMoved === 1) {
        this.enPassant = true
        return true
      }
    }

    return false;
  }

  moveFigure(target: Square): void {
    super.moveFigure(target);
    this.isFirstMove = false;
    if (this.enPassant) {
      console.log(this.square.board.getSquare(target.x, target.y + 1), 'asghasgj', this.color)
      this.square.board.squares[this.color === Colors.WHITE ? target.y + 1 : target.y - 1][target.x].figure = null
    }
  }
}

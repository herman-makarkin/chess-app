import { Figure, FigureTypes } from "./Figure";
import { Colors } from "../Colors";
import { Square } from "../Square";
import Board from "../Board";
import blackLogo from "../../assets/pawn_b.png";
import whiteLogo from "../../assets/pawn_w.png";

export class Pawn extends Figure {
  enPassant: boolean = false;
  direction: number;

  constructor(color: Colors, square: Square) {
    super(color, square);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureTypes.PAWN;
    this.isFirstMove = true;
    this.direction = this.color === Colors.BLACK ? 1 : -1;
  }

  canAttack(target: Square): boolean {
    return ((target.y === this.square.y + this.direction &&
      (target.x === this.square.x + 1 || target.x === this.square.x - 1)))
  }

  canMove(target: Square): boolean {
    if (!super.canMove(target)) return false;
    const firstMoveDirection = this.color === Colors.BLACK ? 2 : -2;

    if ((target.y === this.square.y + this.direction ||
      (this.isFirstMove && target.y === this.square.y + firstMoveDirection)) &&
      target.x === this.square.x &&
      this.square.board.getSquare(target.x, target.y).isEmpty()
    ) {
      return true;
    }

    if (this.canAttack(target) && this.square.isEnemy(target)) return true;

    if (this.square.board.isXProper(this.square.x - 1)) {
      const leftNeighbor = this.square.board.getSquare(this.square.x - 1, this.square.y)
      if (this.square.isEnemy(leftNeighbor)
        && target.y === this.square.y + this.direction
        && target.x === this.square.x - 1
        && leftNeighbor.figure != null
        && leftNeighbor.figure.name === FigureTypes.PAWN
        && this.square.board.moveCount - leftNeighbor.figure.lastMoved === 1) {
        this.enPassant = true
        return true
      }
    }

    if (this.square.board.isXProper(this.square.x + 1)) {
      const rightNeighbor = this.square.board.getSquare(this.square.x + 1, this.square.y)
      if (this.square.isEnemy(rightNeighbor)
        && target.y === this.square.y + this.direction
        && target.x === this.square.x + 1
        && rightNeighbor.figure != null
        && rightNeighbor.figure.name === FigureTypes.PAWN
        && this.square.board.moveCount - rightNeighbor.figure.lastMoved === 1) {
        this.enPassant = true
        return true
      }
    }

    return false;
  }

  moveFigure(target: Square): void {
    super.moveFigure(target);
    if (this.enPassant) {
      this.square.board.squares[this.color === Colors.WHITE ? target.y + 1 : target.y - 1][target.x].figure = null
    }
    this.enPassant = false;
  }
}

import { Figure, FigureTypes } from "./Figure";
import { Colors } from "../Colors";
import { Square } from "../Square";
import blackLogo from "../../assets/king_b.png";
import whiteLogo from "../../assets/king_w.png";

export class King extends Figure {
  isShortCastling: boolean = false;
  isLongCastling: boolean = false;

  constructor(color: Colors, square: Square) {
    super(color, square);
    this.isFirstMove = true;
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureTypes.KING;
  }

  canAttack(target: Square): boolean {
    const dx = Math.abs(this.square.x - target.x);
    const dy = Math.abs(this.square.y - target.y);
    return (dx <= 1 && dy <= 1 && target.isSafe(this.color))
  }

  canMove(target: Square): boolean {
    if (!super.canMove(target)) return false;
    if (this.canAttack(target)) return true;

    if (this.isFirstMove) {
      if (this.color === Colors.WHITE) {
        const rightRook = this.square.board.getSquare(7, 7).figure;
        const leftRook = this.square.board.getSquare(0, 7).figure;
        if (rightRook != null
          && rightRook.name === FigureTypes.ROOK
          && this.square.isEmptyHorizontal(rightRook.square)
          && target.x === 6
          && target.y === 7
          && rightRook.isFirstMove) {
          this.isShortCastling = true;
          return true;
        } else if (leftRook != null
          && leftRook.name === FigureTypes.ROOK
          && leftRook.isFirstMove
          && this.square.isEmptyHorizontal(leftRook.square)
          && target.x === 2
          && target.y === 7) {
          this.isLongCastling = true;
          return true;
        }
      }

      if (this.color === Colors.BLACK) {
        const rightRook = this.square.board.getSquare(7, 0).figure;
        const leftRook = this.square.board.getSquare(0, 0).figure;
        if (rightRook != null
          && rightRook.name === FigureTypes.ROOK
          && this.square.isEmptyHorizontal(rightRook.square)
          && target.x === 6
          && target.y === 0
          && rightRook.isFirstMove) {
          this.isShortCastling = true;
          return true;
        } else if (leftRook != null
          && leftRook.name === FigureTypes.ROOK
          && leftRook.isFirstMove
          && this.square.isEmptyHorizontal(leftRook.square)
          && target.x === 2
          && target.y === 0) {
          this.isLongCastling = true;
          return true;
        }

      }
    }

    return false;
  }

  moveFigure(target: Square): void {
    super.moveFigure(target);
    if (this.color === Colors.WHITE) {
      if (this.isShortCastling) {
        const rookSquare = this.square.board.getSquare(7, 7)
        this.square.board.getSquare(5, 7).figure = rookSquare.figure;
        rookSquare.figure = null;
      } else if (this.isLongCastling) {
        const rookSquare = this.square.board.getSquare(0, 7)
        this.square.board.getSquare(3, 7).figure = rookSquare.figure;
        rookSquare.figure = null;
      }
    } else if (this.color === Colors.BLACK) {
      if (this.isShortCastling) {
        const rookSquare = this.square.board.getSquare(7, 0)
        this.square.board.getSquare(5, 0).figure = rookSquare.figure;
        rookSquare.figure = null;
      } else if (this.isLongCastling) {
        const rookSquare = this.square.board.getSquare(0, 0)
        this.square.board.getSquare(3, 0).figure = rookSquare.figure;
        rookSquare.figure = null;
      }
    }
    this.isShortCastling = false;
  }
}

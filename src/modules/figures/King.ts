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
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureTypes.KING;
  }

  canAttack(target: Square): boolean {
    const dx = Math.abs(this.square.x - target.x);
    const dy = Math.abs(this.square.y - target.y);
    return (dx <= 1 && dy <= 1);
  }

  castling(rook: Figure, target: Square, targetX: number, targetY: number) {
    return (
      rook.name === FigureTypes.ROOK &&
      this.square.isEmptyHorizontal(rook.square) &&
      target.x === targetX &&
      target.y === targetY &&
      rook.isFirstMove &&
      this.square.board.isAreaSafe(
        this.square.y,
        this.square.y,
        this.square.x,
        rook.square.x,
      )
    );
  }

  canMove(target: Square): boolean {
    if (!super.canMove(target)) return false;
    if (this.canAttack(target)) return true;

    if (this.isFirstMove) {
      if (this.color === Colors.WHITE) {
        const rightRook = this.square.board.getSquare(7, 7).figure;
        const leftRook = this.square.board.getSquare(0, 7).figure;
        if (rightRook && this.castling(rightRook, target, 6, 7)) {
          this.isShortCastling = true;
          return true;
        }
        if (leftRook && this.castling(leftRook, target, 2, 7)) {
          this.isLongCastling = true;
          return true;
        }
      }
      if (this.color === Colors.BLACK) {
        const rightRook = this.square.board.getSquare(7, 0).figure;
        const leftRook = this.square.board.getSquare(0, 0).figure;
        if (rightRook && this.castling(rightRook, target, 6, 0)) {
          this.isShortCastling = true;
          return true;
        } else if (leftRook && this.castling(leftRook, target, 2, 0)) {
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
        const rookSquare = this.square.board.getSquare(7, 7);
        this.square.board.getSquare(5, 7).figure = rookSquare.figure;
        rookSquare.figure = null;
      } else if (this.isLongCastling) {
        const rookSquare = this.square.board.getSquare(0, 7);
        this.square.board.getSquare(3, 7).figure = rookSquare.figure;
        rookSquare.figure = null;
      }
    } else if (this.color === Colors.BLACK) {
      if (this.isShortCastling) {
        const rookSquare = this.square.board.getSquare(7, 0);
        this.square.board.getSquare(5, 0).figure = rookSquare.figure;
        rookSquare.figure = null;
      } else if (this.isLongCastling) {
        const rookSquare = this.square.board.getSquare(0, 0);
        this.square.board.getSquare(3, 0).figure = rookSquare.figure;
        rookSquare.figure = null;
      }
    }
    this.isShortCastling = false;
    this.isLongCastling = false;
  }
}

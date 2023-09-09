import Board from "./Board";
import { Figure } from "./figures/Figure";
import { Colors } from "./Colors";

export class Square {
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  board: Board;
  figure: Figure | null;
  available: boolean;
  id: number;

  constructor(board: Board, x: number, y: number, color: Colors) {
    this.board = board;
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = null;
    this.available = false;
    this.id = Math.random();
  }

  isEmpty(): boolean {
    return this.figure === null;
  }

  isEmptyVertical(target: Square): boolean {
    if (this.x !== target.x) {
      return false;
    }
    const min = Math.min(this.y, target.y);
    const max = Math.max(this.y, target.y);
    for (let y = min + 1; y < max; y++) {
      if (!this.board.getSquare(this.x, y).isEmpty()) {
        return false;
      }
    }
    return true;
  }
  isEmptyHorizontal(target: Square): boolean {
    if (this.y !== target.y) {
      return false;
    }
    const min = Math.min(this.x, target.x);
    const max = Math.max(this.x, target.x);
    for (let x = min + 1; x < max; x++) {
      if (!this.board.getSquare(x, this.y).isEmpty()) {
        return false;
      }
    }
    return true;
  }
  isEmptyDiagonal(target: Square): boolean {
    const absX = Math.abs(this.x - target.x);
    const absY = Math.abs(this.y - target.y);
    if (absX !== absY) {
      return false;
    }

    const dy = this.y < target.y ? 1 : -1;
    const dx = this.x < target.x ? 1 : -1;

    for (let i = 1; i < absY; i++) {
      if (!this.board.getSquare(this.x + dx * i, this.y + dy * i).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  setFigure(figure: Figure): void {
    this.figure = figure;
    this.figure.square = this;
  }
  moveFigure(target: Square): void {
    if (this.figure && this.figure?.canMove(target)) {
      this.figure.moveFigure(target);
      target.setFigure(this.figure);
      this.figure = null;
    }
  }

  isEnemy(target: Square): boolean {
    if (target.figure) {
      return this.figure?.color !== target.figure.color;
    }
    return false;
  }
}

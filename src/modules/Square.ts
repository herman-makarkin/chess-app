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
}

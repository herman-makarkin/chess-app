import { Square } from "./Square";
import { Colors } from "./Colors";
//import { Figure, FigureTypes } from "./figures/Figure";
import { Queen } from "./figures/Queen";
import { King } from "./figures/King";
import { Rook } from "./figures/Rook";
import { Pawn } from "./figures/Pawn";
import { Knight } from "./figures/Knight";
import { Bishop } from "./figures/Bishop";

class Board {
  squares: Square[][] = [];
  defaultFEN: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

  public initSquares() {
    for (let i = 0; i < 8; i++) {
      const row: Square[] = [];
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 === 0) {
          row.push(new Square(this, j, i, Colors.BLACK));
        } else {
          row.push(new Square(this, j, i, Colors.WHITE));
        }
      }
      this.squares.push(row);
    }
  }

  public getSquare(x: number, y: number) {
    return this.squares[y][x];
  }

  //   public setBoard(fen: string) {
  //     if (fen === "") {
  //       fen = this.defaultFEN;
  //     }

  //     const pieceTypeFromSymbol: { [key: string]: FigureTypes } = {
  //       k: FigureTypes.KING,
  //       q: FigureTypes.QUEEN,
  //       p: FigureTypes.PAWN,
  //       r: FigureTypes.ROOK,
  //       b: FigureTypes.BISHOP,
  //       n: FigureTypes.KNIGHT,
  //     };

  //     const rows = fen.split("/");
  //     let y = 0;

  //     for (let x = 0; x < rows.length; x++) {
  //       for (const line of rows[x]) {
  //         if (pieceTypeFromSymbol[line[y]].toLowerCase()) {
  //           if (line[y] === line[y].toUpperCase()) {
  //             this.squares[y][x].figure = new Figure(
  //               Colors.WHITE,
  //               this.squares[y][x]
  //             );
  //           } else {
  //             this.squares[y][x].figure = new Figure(
  //               Colors.BLACK,
  //               this.squares[y][x]
  //             );
  //           }
  //         }
  //       }
  //     }
  //   }
  // public fenToArray(fen: string) {
  //   const piecesString = fen.split(" ")[0].replace(/\//g, "");
  //   const piecesArrayNums = piecesString.split("");
  //   const piecesArray = piecesArrayNums
  //     .map((piece) => {
  //       if (parseInt(piece)) {
  //         return [...Array(parseInt(piece)).fill(null)];
  //       }
  //       return piece;
  //     })
  //     .flat();
  //   return piecesArray;
  // }
  // !! i'll implement this later

  private addPawns() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.BLACK, this.getSquare(i, 1));
      new Pawn(Colors.WHITE, this.getSquare(i, 6));
    }
  }

  private addKings() {
    new King(Colors.BLACK, this.getSquare(4, 0));
    new King(Colors.WHITE, this.getSquare(4, 7));
  }

  private addQueens() {
    new Queen(Colors.BLACK, this.getSquare(3, 0));
    new Queen(Colors.WHITE, this.getSquare(3, 7));
  }

  private addRooks() {
    new Rook(Colors.BLACK, this.getSquare(0, 0));
    new Rook(Colors.BLACK, this.getSquare(7, 0));
    new Rook(Colors.WHITE, this.getSquare(0, 7));
    new Rook(Colors.WHITE, this.getSquare(7, 7));
  }

  private addBishops() {
    new Bishop(Colors.BLACK, this.getSquare(2, 0));
    new Bishop(Colors.BLACK, this.getSquare(5, 0));
    new Bishop(Colors.WHITE, this.getSquare(2, 7));
    new Bishop(Colors.WHITE, this.getSquare(5, 7));
  }

  private addKnights() {
    new Knight(Colors.BLACK, this.getSquare(1, 0));
    new Knight(Colors.BLACK, this.getSquare(6, 0));
    new Knight(Colors.WHITE, this.getSquare(1, 7));
    new Knight(Colors.WHITE, this.getSquare(6, 7));
  }

  public addPieces() {
    this.addPawns();
    this.addKings();
    this.addQueens();
    this.addRooks();
    this.addBishops();
    this.addKnights();
  }
}
export default Board;

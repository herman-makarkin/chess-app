import { Square } from "./Square";
import { Colors } from "./Colors";
import { Figure, FigureTypes } from "./figures/Figure";
import { Queen } from "./figures/Queen";
import { King } from "./figures/King";
import { Rook } from "./figures/Rook";
import { Pawn } from "./figures/Pawn";
import { Knight } from "./figures/Knight";
import { Bishop } from "./figures/Bishop";

class Board {
  squares: Square[][] = [];
  blackPieces: Figure[] = [];
  whitePieces: Figure[] = [];
  defaultFEN: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
  moveCount: number = 0;
  whiteKing: King | null = null;
  blackKing: King | null = null;
  isCheck: boolean = false;
  Checkmate: boolean = false;

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

  public hightlightSquares(selectedSquare: Square | null) {
    for (let row of this.squares)
      for (let target of row)
        target.available = !!selectedSquare?.figure?.isAbleToMove(target);
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.squares = this.squares;
    newBoard.blackPieces = this.blackPieces;
    newBoard.whitePieces = this.whitePieces;
    newBoard.moveCount = this.moveCount;
    newBoard.whiteKing = this.whiteKing;
    newBoard.blackKing = this.blackKing;
    newBoard.isKingChecked();
    return newBoard;
  }

  public isCheckmate(): boolean {
    const king = this.moveCount % 2 === 0 ? this.whiteKing : this.blackKing;
    const friendlyPieces = this.moveCount % 2 === 0 ? this.whitePieces : this.blackPieces;
    for (let piece of friendlyPieces) {
      if (king && !this.tryAll(piece, king)) {
        return true
      }
    }
    return false;
  }

  public tryAll(piece: Figure, king: King): boolean {
    for (let row of this.squares) {
      for (let target of row) {
        if (this.try(piece.square, target, king)) {
          return true;
        }
      }
    }
    return false;
  }

  public isKingChecked() {
    const king = this.moveCount % 2 === 0 ? this.whiteKing : this.blackKing;
    if (king && !(king.square.isSafe(king.color))) {
      return true;
    }

    return false;
  }

  public getSquare(x: number, y: number) {
    return this.squares[y][x];
  }

  public isXProper(x: number) {
    return x < this.squares[0].length && x >= 0 ? true : false;
  }

  public isYProper(y: number) {
    return y < this.squares.length && y >= 0 ? true : false;
  }

  public try(fromSquare: Square, target: Square, king: King): boolean {

    if (fromSquare.figure && fromSquare.figure.name === FigureTypes.KING) {
      const tmp = king;
      king.square.figure = null;
      if (target.isSafe(king.color)) {
        king.square.figure = tmp;
        return true;
      }

      king.square.figure = tmp;
      return false;
    }

    const tmp = target.figure;
    target.figure = fromSquare.figure;
    fromSquare.figure = null;
    if (king && king.square.isSafe(king.color)) {
      fromSquare.figure = target.figure;
      target.figure = tmp;
      return true;
    }

    fromSquare.figure = target.figure
    target.figure = tmp;
    return false;
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
      this.blackPieces.push(new Pawn(Colors.BLACK, this.getSquare(i, 1)));
      this.whitePieces.push(new Pawn(Colors.WHITE, this.getSquare(i, 6)));
    }
  }

  private addKings() {
    this.blackKing = new King(Colors.BLACK, this.getSquare(4, 0));
    this.blackPieces.push(this.blackKing);
    this.whiteKing = new King(Colors.WHITE, this.getSquare(4, 7));
    this.whitePieces.push(this.whiteKing);
  }

  private addQueens() {
    this.blackPieces.push(new Queen(Colors.BLACK, this.getSquare(3, 0)));
    this.whitePieces.push(new Queen(Colors.WHITE, this.getSquare(3, 7)));
  }

  private addRooks() {
    this.blackPieces.push(new Rook(Colors.BLACK, this.getSquare(0, 0)));
    this.blackPieces.push(new Rook(Colors.BLACK, this.getSquare(7, 0)));
    this.whitePieces.push(new Rook(Colors.WHITE, this.getSquare(0, 7)));
    this.whitePieces.push(new Rook(Colors.WHITE, this.getSquare(7, 7)));
  }

  private addBishops() {
    this.blackPieces.push(new Bishop(Colors.BLACK, this.getSquare(2, 0)));
    this.blackPieces.push(new Bishop(Colors.BLACK, this.getSquare(5, 0)));
    this.whitePieces.push(new Bishop(Colors.WHITE, this.getSquare(2, 7)));
    this.whitePieces.push(new Bishop(Colors.WHITE, this.getSquare(5, 7)));
  }

  private addKnights() {
    this.blackPieces.push(new Knight(Colors.BLACK, this.getSquare(1, 0)));
    this.blackPieces.push(new Knight(Colors.BLACK, this.getSquare(6, 0)));
    this.whitePieces.push(new Knight(Colors.WHITE, this.getSquare(1, 7)));
    this.whitePieces.push(new Knight(Colors.WHITE, this.getSquare(6, 7)));
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

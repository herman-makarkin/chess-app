import { FC, Fragment, useState, useEffect } from "react";
import { Square } from "../modules/Square";
import Board from "../modules/Board";
import SquareComponent from "./SquareComponent";

interface BoardComponent {
  board: Board;
  setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardComponent> = ({ board, setBoard }) => {
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);

  function click(square: Square) {
    if (
      selectedSquare &&
      selectedSquare !== square &&
      selectedSquare.figure?.canMove(square)
    ) {
      selectedSquare.moveFigure(square);
      setSelectedSquare(null);
      updateBoard();
    } else {
      setSelectedSquare(square);
    }
  }

  useEffect(() => {
    highlightSquares();
  }, [selectedSquare]);

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  function highlightSquares() {
    board.hightlightSquares(selectedSquare);
    updateBoard();
  }

  return (
    <div className="board">
      {board.squares.map((row, i: number) => (
        <Fragment key={i}>
          {row.map((square) => (
            <SquareComponent
              click={click}
              square={square}
              key={square.id}
              selected={
                square.x === selectedSquare?.x && square.y === selectedSquare?.y
              }
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
};

export default BoardComponent;

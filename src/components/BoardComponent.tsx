import { FC, Fragment, useState, useEffect } from "react";
import { Square } from "../modules/Square";
import Board from "../modules/Board";
import SquareComponent from "./SquareComponent";
import Player from "../modules/Player";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  switchPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({
  board,
  setBoard,
  currentPlayer,
  switchPlayer,
}) => {
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);

  function click(square: Square) {
    if (
      selectedSquare &&
      selectedSquare !== square &&
      selectedSquare.figure?.canMove(square)
    ) {
      selectedSquare.moveFigure(square);
      switchPlayer();
      setSelectedSquare(null);
      updateBoard();
    } else if (square.figure?.color === currentPlayer?.color) {
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
    <div>
      <h3>Current Player: {currentPlayer?.color}</h3>
      <div className="board">
        {board.squares.map((row, i: number) => (
          <Fragment key={i}>
            {row.map((square) => (
              <SquareComponent
                click={click}
                square={square}
                key={square.id}
                selected={
                  square.x === selectedSquare?.x &&
                  square.y === selectedSquare?.y
                }
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default BoardComponent;

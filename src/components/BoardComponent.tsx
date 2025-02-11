import { FC, Fragment, useEffect, useState } from "react";
import { Square } from "../modules/Square";
import Board from "../modules/Board";
import SquareComponent from "./SquareComponent";
import MenuComponent from "./MenuComponent";
import Player from "../modules/Player";
import { on } from "events";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  switchPlayer: () => void;
  restart: () => void;
  setCheckmate: (value: boolean) => void;
  isCheckmate: boolean;
}

const BoardComponent: FC<BoardProps> = ({
  board,
  setBoard,
  currentPlayer,
  switchPlayer,
  restart,
  setCheckmate,
  isCheckmate,
}) => {
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  console.log(isCheckmate);

  if (board.isKingChecked() && board.isCheckmate()) {
    setCheckmate(true);
  }

  function click(square: Square) {
    if (
      selectedSquare &&
      selectedSquare !== square &&
      selectedSquare.figure?.isAbleToMove(square)
    ) {
      selectedSquare.moveFigure(square);
      switchPlayer();
      board.moveCount++;
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
    <div className="chess">
      <MenuComponent
        theEnd={isCheckmate}
        color={currentPlayer ? currentPlayer.color : null}
        restart={restart}
      />
      <div className="board">
        {board.squares.map((row, i: number) => (
          <Fragment key={i}>
            {row.map((square) => (
              <SquareComponent
                click={click}
                square={square}
                key={square.id}
                selected={square.x === selectedSquare?.x &&
                  square.y === selectedSquare?.y}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default BoardComponent;

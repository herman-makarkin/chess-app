import { FC, Fragment } from "react";
import Board from "../modules/Board";
import SquareComponent from "./SquareComponent";

interface BoardComponent {
  board: Board;
  setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardComponent> = ({ board, setBoard }) => {
  return (
    <div className="board">
      {board.squares.map((row, i: number) => (
        <Fragment key={i}>
          {row.map((square) => (
            <SquareComponent square={square} key={square.id} />
          ))}
        </Fragment>
      ))}
    </div>
  );
};

export default BoardComponent;

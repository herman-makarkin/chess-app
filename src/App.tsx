import { useEffect, useState } from "react";
import BoardComponent from "./components/BoardComponent";
import "./App.css";
import Board from "./modules/Board";

function App() {
  const [board, setBoard] = useState(new Board());

  useEffect(() => {
    restart();
  }, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initSquares();
    newBoard.addPieces();
    setBoard(newBoard);
  }
  return (
    <div className="App">
      <BoardComponent board={board} setBoard={setBoard} />
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import BoardComponent from "./components/BoardComponent";
import SidebarComponent from "./components/SidebarComponent";
import "./App.css";
import { Colors } from "./modules/Colors";
import Board from "./modules/Board";
import Player from "./modules/Player";

function App() {
  const [board, setBoard] = useState(new Board());
  const whitePlayer = new Player(Colors.WHITE);
  const blackPlayer = new Player(Colors.BLACK);
  const [currentPlayer, setCurrentPlayer] = useState(whitePlayer);
  const [isCheckmate, setCheckmate] = useState(false);
  const [time, setTimer] = useState(5);
  console.log(isCheckmate);

  useEffect(() => {
    setTimer(10);
    restart();
  }, []);

  function restart() {
    setCheckmate(false);
    setTimer(10);
    const newBoard = new Board();
    newBoard.initSquares();
    newBoard.addPieces();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
  }

  function switchPlayer() {
    setCurrentPlayer(
      currentPlayer?.color !== Colors.WHITE ? whitePlayer : blackPlayer,
    );
  }

  return (
    <div className="App">
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        switchPlayer={switchPlayer}
        restart={restart}
        setCheckmate={setCheckmate}
        isCheckmate={isCheckmate}
      />
      <SidebarComponent
        timeout={setCheckmate}
        currentPlayer={currentPlayer}
        time={time}
      />
    </div>
  );
}

export default App;

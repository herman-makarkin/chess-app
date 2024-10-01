import { useEffect, useState } from "react";
import BoardComponent from "./components/BoardComponent";
import "./App.css";
import { Colors } from "./modules/Colors";
import Board from "./modules/Board";
import Player from "./modules/Player";

function App() {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  useEffect(() => {
    restart();
  }, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initSquares();
    newBoard.addPieces();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
  }

  function switchPlayer() {
    setCurrentPlayer(
      currentPlayer?.color !== Colors.WHITE ? whitePlayer : blackPlayer
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
      />
    </div>
  );
}

export default App;

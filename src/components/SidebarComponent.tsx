import { FC, useEffect, useRef, useState } from "react";
import Board from "../modules/Board";
import { Colors } from "../modules/Colors";
import Player from "../modules/Player";
import SidebarSide from "./SidebarSide";

interface SidebarProps {
  timeout: (value: boolean) => void;
  currentPlayer: Player;
  time: number;
  board: Board;
}

const SidebarComponent: FC<SidebarProps> = (
  { timeout, currentPlayer, time, board },
) => {

  const [blackTime, setBlackTime] = useState(300);
  const [whiteTime, setWhiteTime] = useState(300);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    startTimer();
  }, [currentPlayer])

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }

    const cb = currentPlayer.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
    timer.current = setInterval(cb, 1000);
  }

  function decrementBlackTimer() {
    setBlackTime(prev => prev - 1);
  }

  function decrementWhiteTimer() {
    setWhiteTime(prev => prev - 1);
  }

  return (
    <div className="sidebar">
      <SidebarSide
        timeout={timeout}
        forColor={Colors.BLACK}
        title={Colors.BLACK}
        time={blackTime}
        pieces={board.lostWhitePieces}
        currentPlayer={currentPlayer}
      // time={time}
      />

      <h3 className="current-player">Current Player: {currentPlayer?.color}</h3>

      <SidebarSide
        timeout={timeout}
        forColor={Colors.WHITE}
        title={Colors.WHITE}
        pieces={board.lostBlackPieces}
        currentPlayer={currentPlayer}
        // time={time}
        time={whiteTime}
      />
    </div>
  );
};

export default SidebarComponent;

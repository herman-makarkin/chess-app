import { FC, useEffect, useState } from "react";
import TimerComponent from "./TimerComponent";
import { Colors } from "../modules/Colors";
import Player from "../modules/Player";
import { Figure } from "../modules/figures/Figure";
import LostPieces from "./LostPieces";

interface SidebarSideProps {
  timeout: (value: boolean) => void;
  forColor: Colors;
  currentPlayer: Player;
  time: number;
  title: string;
  pieces: Figure[];
}

const SidebarSide: FC<SidebarSideProps> = (
  { timeout, forColor, currentPlayer, time, title, pieces },
) => {
  const className = `sidebar-side sidebar-${forColor}`;
  const [timer1Up, setTimer1Up] = useState(true);
  const [timer2Up, setTimer2Up] = useState(true);

  if (timer1Up && timer2Up) {
    return (
      <div className={className}>
        <LostPieces title={title} pieces={pieces} />
        {/* <TimerComponent */}
        {/*   timeout={timeout} */}
        {/*   forColor={forColor} */}
        {/*   currentPlayer={currentPlayer} */}
        {/*   time={time} */}
        {/*   setTimeUp={forColor === Colors.BLACK ? setTimer1Up : setTimer2Up} */}
        {/* /> */}
      </div>
    );
  }
  return <div className={className}>0:00</div>;
};

export default SidebarSide;

import { FC } from "react";
import { Colors } from "../modules/Colors";
import Player from "../modules/Player";
import SidebarSide from "./SidebarSide";

interface SidebarProps {
  timeout: (value: boolean) => void;
  currentPlayer: Player;
  time: number;
}

const SidebarComponent: FC<SidebarProps> = (
  { timeout, currentPlayer, time },
) => {
  return (
    <div className="sidebar">
      <SidebarSide
        timeout={timeout}
        forColor={Colors.BLACK}
        currentPlayer={currentPlayer}
        time={time}
      />

      <h3 className="current-player">Current Player: {currentPlayer?.color}</h3>

      <SidebarSide
        timeout={timeout}
        forColor={Colors.WHITE}
        currentPlayer={currentPlayer}
        time={time}
      />
    </div>
  );
};

export default SidebarComponent;

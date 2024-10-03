import { FC } from "react";
import { Colors } from "../modules/Colors";

interface MenuProps {
  theEnd: boolean;
  color: Colors | null;
  restart: () => void;
}

const SquareComponent: FC<MenuProps> = ({ theEnd, color, restart }) => {
  if (theEnd) {
    return (
      <div className="menu">
        <h1>{color === Colors.WHITE ? Colors.BLACK : Colors.WHITE} won!</h1>
        <button onClick={restart}>Restart</button>
      </div>
    );
  } else {
    return null;
  }
};

export default SquareComponent;

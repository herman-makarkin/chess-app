import { FC, useRef } from "react";
import React from "react";
import { Colors } from "../modules/Colors";
import Player from "../modules/Player";

interface TimerProps {
  timeout: (value: boolean) => void;
  forColor: Colors;
  currentPlayer: Player;
  time: number;
  setTimeUp: (value: boolean) => void;
}

const TimerComponent: FC<TimerProps> = (
  { timeout, forColor, currentPlayer, time, setTimeUp },
) => {
  const [counter, setCounter] = React.useState(time);
  //const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  React.useEffect(() => {
    console.log(counter);
    if (forColor === currentPlayer.color) {
      setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
    }
    if (counter === 0) {
      timeout(true);
      setTimeUp(false);
      return;
    } else {
      setTimeUp(true);
    }
    console.log(counter);
  }, [currentPlayer, counter]);

  function decrementCounter() {
  }
  const className = `timer timer-${forColor}`;

  /*
  if (counter <= 0) {
    timeout(true);
    return (
      <div className={className}>
        <span>0:00</span>
      </div>
    );
  }
  */
  const minutes = Math.floor(counter / 60);
  const seconds = counter % 60;
  return (
    <div className={className}>
      <span>{minutes}:{Math.floor(seconds / 10)}{seconds % 10}</span>
    </div>
  );
};

export default TimerComponent;

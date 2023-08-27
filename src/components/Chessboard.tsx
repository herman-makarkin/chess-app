import React from "react";
import "./Chessboard.css";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

export default function Chessboard() {
  let board = [];
  for (let i = verticalAxis.length - 1; i >= 0; i--) {
    board.push([]);
    for (let j = 0; j < horizontalAxis.length; j++) {
      board.push(
        <div
          className={((j + i) % 2) ? "white-square" : "black-square"}
          key={horizontalAxis[i] + verticalAxis[j]}>
        </div>
      );
    }
  }
  return <div id="chessboard">{board}</div>;
}

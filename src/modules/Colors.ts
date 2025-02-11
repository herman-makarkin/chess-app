export enum Colors {
  WHITE = "white",
  BLACK = "black",
}

export function revertColor(color: Colors): Colors {
  return color === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
}

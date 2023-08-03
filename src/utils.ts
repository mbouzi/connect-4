import { IBoard, IBoardSpot, IBoardRow } from "./interfaces";
import { Users } from "./data";

// logic to format boardSpace IDs
export const formatSpaceId = (rowNumber: number, colNumber: number) =>
  `row-${rowNumber + 1}-col-${colNumber + 1}`;

// logic to start new board
export const resetBoard = () => {
  let rowLength = 6,
    colLength = 7,
    newBoard: IBoard = {
      boardRows: [],
      rowLength,
      colLength,
      moveCount: 0,
      lastTurn: Users[1],
      maxMoves: rowLength * colLength
    };
  for (let r = 0; r < rowLength; r++) {
    let newBoardRow: IBoardRow = { id: `${r + 1}-row`, boardSpots: [] };

    for (let c = 0; c < colLength; c++) {
      let newBoardSpot: IBoardSpot = {
          id: formatSpaceId(r, c),
          filled: false,
          rowNumber: r,
          colNumber: c
        },
        boardSpots: IBoardSpot[] = newBoardRow.boardSpots;

      boardSpots.push(newBoardSpot);
      newBoardRow.boardSpots = boardSpots;
    }
    let boardRows: IBoardRow[] = newBoard.boardRows;

    boardRows.push(newBoardRow);
    newBoard.boardRows = boardRows;
  }
  return newBoard;
};

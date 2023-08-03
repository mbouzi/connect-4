import * as React from "react";
import {
  Props,
  IBoardSpot,
  IUser,
  IBoard,
  BoardContextType
} from "./interfaces";

import { Users } from "./data";

import { resetBoard } from "./utils";

export const BoardContext = React.createContext<BoardContextType | null>(null);

const BoardProvider: React.FC<Props> = ({ children }) => {
  const [currentBoard, setCurrentBoard] = React.useState<IBoard>(resetBoard());
  const [highlightedColumn, setHighlightedColumn] = React.useState<
    number | null
  >(null);
  const [hasWinner, setHasWinner] = React.useState<boolean>(false);

  // reset the current games board and winner
  const resetGame = () => {
    setCurrentBoard(resetBoard());
    setHasWinner(false);
  };

  // get the next user
  const getNextUser = () => {
    return Users.filter(
      (user: IUser) => user.id !== currentBoard.lastTurn.id
    )[0];
  };

  // update the current board after player move
  const updateBoard = (colNumber: number) => {
    let rowCount: number = currentBoard.rowLength - 1,
      updatedBoard = currentBoard,
      moveCount = currentBoard.moveCount;

    while (rowCount >= 0 && moveCount === currentBoard.moveCount) {
      let pickedBoardSpot: IBoardSpot =
          currentBoard.boardRows[rowCount].boardSpots[colNumber],
        nextUser: IUser =
          currentBoard.moveCount > 0 && currentBoard.lastTurn
            ? Users.filter(
                (user: IUser) => user.id !== currentBoard?.lastTurn?.id
              )[0]
            : Users[0];

      if (!pickedBoardSpot.filled) {
        moveCount++;
        pickedBoardSpot.filled = true;
        pickedBoardSpot.user = nextUser;
        updatedBoard.boardRows[rowCount].boardSpots[
          colNumber
        ] = pickedBoardSpot;

        setCurrentBoard({
          ...currentBoard,
          moveCount,
          lastTurn: nextUser,
          lastFilledSpot: pickedBoardSpot,
          boardRows: updatedBoard.boardRows
        });
      }
      rowCount--;
    }
  };

  // check if current user has connect 4 spots in a row
  const checkForWin = () => {
    let lastFilledSpot = currentBoard.lastFilledSpot;

    if (lastFilledSpot) {
      let columnNumber = lastFilledSpot.colNumber,
        rowNumber = lastFilledSpot.rowNumber,
        columnLength = currentBoard.colLength,
        rowLength = currentBoard.rowLength,
        columnCount = 0, // to track column interation
        rowCount = 0, // to track row interation
        connectCount = 0, // to track connect 4 count
        currentUser = currentBoard.lastTurn;

      // updates board winner flag if connect 4
      const isFour = (count: number) => {
        if (count === 4) setHasWinner(true);
      };

      // checks for user match
      const checkForMatch = (currentBoardSpot: IBoardSpot) => {
        if (currentBoardSpot?.user?.id === currentUser?.id) {
          connectCount++;
          isFour(connectCount);
        } else {
          connectCount = 0;
        }
      };
      // vertical
      while (connectCount < 4 && rowCount < rowLength) {
        let currentBoardSpot: IBoardSpot =
          currentBoard.boardRows[rowCount].boardSpots[columnNumber];

        checkForMatch(currentBoardSpot);
        rowCount++;
      }

      connectCount = 0;

      //horizonal
      while (connectCount < 4 && columnCount < columnLength) {
        let currentBoardSpot: IBoardSpot =
          currentBoard.boardRows[rowNumber].boardSpots[columnCount];

        checkForMatch(currentBoardSpot);

        columnCount++;
      }

      if (currentBoard.maxMoves === currentBoard.moveCount) {
        resetGame();
      }

      // diagonal
    }
  };

  return (
    <BoardContext.Provider
      value={{
        currentBoard,
        updateBoard,
        checkForWin,
        highlightedColumn,
        setHighlightedColumn,
        hasWinner,
        setHasWinner,
        setCurrentBoard,
        resetGame,
        getNextUser
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;

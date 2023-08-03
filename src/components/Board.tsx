import React, { useEffect } from "react";
import { BoardContextType, IBoardRow, IBoardSpot } from "../interfaces";
import { BoardContext } from "../boardContext";
import BoardSpot from "./BoardSpot";
import Message from "./Message";

const Board = () => {
  const {
    currentBoard,
    checkForWin,
    hasWinner,
    getNextUser,
    resetGame
  } = React.useContext(BoardContext) as BoardContextType;

  const nextUser = getNextUser();

  const renderBoard = () => {
    return currentBoard.boardRows.map((boardRow: IBoardRow) => {
      return (
        <div className="row" key={boardRow.id}>
          {boardRow.boardSpots.map((boardSpot: IBoardSpot) => (
            <BoardSpot key={boardSpot.id} boardSpot={boardSpot} />
          ))}
        </div>
      );
    });
  };

  useEffect(() => {
    // checks for winner after every move,
    // if at least 6 moves have been made
    if (currentBoard.moveCount > 6) {
      checkForWin();
    }
  }, [currentBoard, checkForWin]);

  return (
    <div className="board">
      {hasWinner && <Message />}
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <p style={{ display: "flex", position: "relative" }}>
          {`${nextUser.name}'s Turn`}
          <span
            className="indicator"
            style={{ background: nextUser.color }}
          ></span>
        </p>
        <button className="restart-btn" onClick={() => resetGame()}>
          Restart
        </button>
      </div>
      <div>{renderBoard()}</div>
    </div>
  );
};

export default Board;

import React from "react";
import { BoardContextType } from "../interfaces";
import { BoardContext } from "../boardContext";

const Message = () => {
  const { currentBoard, resetGame } = React.useContext(
    BoardContext
  ) as BoardContextType;

  return (
    <div className="message-bg">
      <div className="message">
        <h3
          style={{ margin: "0 auto" }}
        >{`${currentBoard.lastTurn.name} has won!`}</h3>
        <button className="restart-btn" onClick={() => resetGame()}>
          Restart
        </button>
      </div>
    </div>
  );
};

export default Message;

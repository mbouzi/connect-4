import React from "react";
import { IBoardSpot, BoardContextType } from "../interfaces";
import { BoardContext } from "../boardContext";

const BoardSpot: React.FC<{ boardSpot: IBoardSpot }> = ({ boardSpot }) => {
  const {
    updateBoard,
    highlightedColumn,
    setHighlightedColumn
  } = React.useContext(BoardContext) as BoardContextType;

  return (
    <div
      className="board-spot"
      onMouseEnter={() => setHighlightedColumn(boardSpot.colNumber)}
      onMouseLeave={() => setHighlightedColumn(null)}
      style={{ opacity: highlightedColumn === boardSpot.colNumber ? 0.5 : 1 }}
    >
      <div
        className="board-slot"
        onClick={() => updateBoard(boardSpot.colNumber)}
        style={{ background: boardSpot.user ? boardSpot.user.color : "#fff" }}
      ></div>
    </div>
  );
};

export default BoardSpot;

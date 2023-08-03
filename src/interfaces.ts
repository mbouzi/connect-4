export interface Props {
  children: React.ReactNode;
}

export interface IUser {
  id: number;
  color: string;
  name: string;
}

export interface IBoardSpot {
  id: string;
  filled: boolean;
  user?: IUser;
  rowNumber: number;
  colNumber: number;
}

export interface IBoardRow {
  id: string;
  boardSpots: IBoardSpot[] | [];
}

export interface IBoard {
  boardRows: IBoardRow[] | [];
  rowLength: number;
  colLength: number;
  moveCount: number;
  lastTurn: IUser;
  lastFilledSpot?: IBoardSpot;
  maxMoves: number;
}

export type BoardContextType = {
  currentBoard: IBoard;
  setCurrentBoard: React.Dispatch<React.SetStateAction<IBoard>>;
  updateBoard: (colNumber: number) => void;
  checkForWin: () => void;
  hasWinner: boolean;
  setHasWinner: React.Dispatch<React.SetStateAction<boolean>>;
  highlightedColumn: number | null;
  setHighlightedColumn: React.Dispatch<React.SetStateAction<number | null>>;
  resetGame: () => void;
  getNextUser: () => IUser;
  // player1Wins: number;
  // player2Wins: number;
};

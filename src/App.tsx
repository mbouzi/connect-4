import React from "react";
import "./styles.css";

import BoardProvider from "./boardContext";
import Board from "./components/Board";

const App = () => {
  return (
    <BoardProvider>
      <div className="App">
        <h1>Connect 4</h1>
        <Board />
      </div>
    </BoardProvider>
  );
};

export default App;

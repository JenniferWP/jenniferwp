import { useEffect, useState } from "react";

import "./tictactoe.css";

type TypeTicTacToe = {
  currentShape: string;
  board: Array<{ id: number; name: string }>;
  history: Array<{ id: number; name: string }>;
};

const TicTacToe = () => {
  const initialState: TypeTicTacToe = {
    currentShape: "X",
    board: [],
    history: [],
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    let newBoard: TypeTicTacToe["board"] = [];
    while (newBoard.length < 9)
      newBoard = [...newBoard, { id: newBoard.length, name: "" }];
    setState({ ...state, board: newBoard });
  }, []);

  const handleClick = (id: number) => {
    if (!state.board[id].name) {
      state.board[id].name = state.currentShape;
      setState({
        ...state,
        currentShape: state.currentShape === "X" ? "O" : "X",
      });
      checkBoard();
    }
  };

  const checkBoard = () => {
    // 0 1 2
    // 3 4 5
    // 6 7 8
    // if 0 check 1 2 ou 3 6
    // if 1 check 0 2
    console.log(state.board);
  };

  const resetBoard = () =>
    setState({
      ...state,
      board: state.board.map((board) => ({ ...board, name: "" })),
    });

  return (
    <div className={"containerTicTacToe"}>
      {/* <div className={"playerName"}>
        Au tour du joueur {state.currentShape} !
      </div> */}
      <div className={"content"}>
        <div className={"containerSquare"}>
          {state.board.length > 0 &&
            state.board.map((board) => (
              <div
                key={board.id}
                className={"square"}
                onClick={() => handleClick(board.id)}
              >
                {board.name}
              </div>
            ))}
        </div>
        <div>
          {/* Historique :<div className={"containerHistory"}>{state.history.map((history)=> <div>{history.}</div>)}</div> */}
        </div>
      </div>
      <button className={"resetButton"} onClick={resetBoard}>
        Recommencer
      </button>
    </div>
  );
};

export { TicTacToe };

import { useEffect, useState } from "react";
import { Button } from "../../component/button";
import "./game.css";

const TicTacToe = () => {
  const initialState: {
    arrOfBoxes: Array<Array<string>>;
    currentSymbol: string;
    limit: number;
    round: number;
    isWinner: boolean;
  } = {
    arrOfBoxes: [],
    currentSymbol: "O",
    limit: 3,
    round: 9,
    isWinner: false,
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    handleCreateGame();
    // eslint-disable-next-line
  }, []);

  const handleCreateGame = () => {
    const arrOfBoxes: Array<Array<string>> = [...Array(state.limit)].map(() =>
      [...Array(state.limit)].map(() => ""),
    );
    setState({
      ...state,
      arrOfBoxes,
      currentSymbol: state.currentSymbol === "X" ? "O" : "X",
      round: 9,
      isWinner: false,
    });
  };

  const checkBoxes = (arrOfBoxes: Array<Array<string>>) => {
    arrOfBoxes.some((boxes) => {
      // Count how many similar items are on a line
      const acc = boxes.reduce(
        (acc, box) => (box === state.currentSymbol ? acc + 1 : acc),
        0,
      );
      if (acc === state.limit) {
        state.isWinner = true;
        return true;
      }
      return false;
    });
  };

  const checkWinner = () => {
    // Check a horizontal array of boxes
    checkBoxes(state.arrOfBoxes);
    // Create a vertical array of boxes
    if (!state.isWinner) {
      const verticalBoxes: Array<Array<string>> = [...Array(state.limit)].map(
        (_, index) => state.arrOfBoxes.map((boxes) => boxes[index]),
      );
      checkBoxes(verticalBoxes);
    }
    // Create a diagonal array of boxes
    if (!state.isWinner) {
      const boxes: Array<Array<string>> = [
        state.arrOfBoxes.map((boxes, index) => boxes[index]),
        state.arrOfBoxes.toReversed().map((boxes, index) => boxes[index]),
      ];
      checkBoxes(boxes);
    }
    if (!state.isWinner) {
      state.currentSymbol = state.currentSymbol === "X" ? "O" : "X";
      state.round -= 1;
    }
    setState({ ...state });
  };

  const handleClickBox = (indexOfBoxes: number, indexOfBox: number) => {
    if (!state.isWinner && !state.arrOfBoxes[indexOfBoxes][indexOfBox]) {
      state.arrOfBoxes[indexOfBoxes][indexOfBox] = state.currentSymbol;
      checkWinner();
    }
  };

  const getSymbolColor = (symbol: string) =>
    symbol === "X" ? "var(--blue-color)" : "var(--red-color)";

  return (
    <>
      <div>
        Au tour du joueur{" "}
        <span
          style={{
            color: getSymbolColor(state.currentSymbol),
          }}
        >
          {state.currentSymbol}
        </span>
      </div>
      {(state.round === 0 || state.isWinner) && state.round === 0 ? (
        <div>Fin de la partie, personne ne gagne</div>
      ) : (
        state.isWinner && (
          <div>
            Félicitations, le joueur
            <span
              style={{
                color: getSymbolColor(state.currentSymbol),
              }}
            >
              {" "}
              {state.currentSymbol}
            </span>{" "}
            gagne !
          </div>
        )
      )}
      <div className={"containerTicTacToe"}>
        {state.arrOfBoxes.map((boxes, indexOfBoxes) =>
          boxes.map((box, indexOfBox) => (
            <span
              key={indexOfBoxes + indexOfBox}
              onClick={() => handleClickBox(indexOfBoxes, indexOfBox)}
              className={"ticTacToe"}
              style={{
                color: getSymbolColor(box),
              }}
            >
              {box}
            </span>
          )),
        )}
      </div>
      <Button onClick={handleCreateGame}>Recommencer une partie</Button>
    </>
  );
};

export { TicTacToe };

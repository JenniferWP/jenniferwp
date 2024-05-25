import { useEffect, useState } from "react";
import { Button } from "../../component/button";
import "./game.css";

const MasterMind = () => {
  const initialState: {
    listColors: Array<string>;
    selectedColors: Array<string>;
    gameColors: Array<
      Array<{
        selectedColor: string;
        pickedColor: string;
        clueColor: string;
      }>
    >;
    round: number;
    isWon: boolean;
  } = {
    listColors: [
      "var(--yellow-color)",
      "var(--orange-color)",
      "var(--pink-color)",
      "var(--purple-color)",
      "var(--blue-color)",
      "var(--green-color)",
    ],
    selectedColors: [],
    gameColors: [],
    round: 9,
    isWon: false,
  };
  const [state, setState] = useState(initialState);

  const handleCreateGame = () => {
    const selectedColors = Array.from(
      { length: 4 },
      () => state.listColors[Math.floor(Math.random() * 5)],
    );

    setState({
      ...state,
      selectedColors,
      gameColors: Array.from({ length: 10 }, () =>
        Array.from({ length: 4 }, (_, index) => ({
          selectedColor: selectedColors[index],
          pickedColor: "",
          clueColor: "",
        })),
      ),
      round: 9,
      isWon: false,
    });
  };

  useEffect(() => {
    handleCreateGame();
    // eslint-disable-next-line
  }, []);

  const handleRemovePickedColor = (lineIndex: number, pickedIndex: number) => {
    // Not going to remove any other line than the current one
    if (state.round === lineIndex) {
      // Remove the pickedColor by writing down empty value instead
      state.gameColors[state.round][pickedIndex] = {
        ...state.gameColors[state.round][pickedIndex],
        pickedColor: "",
      };
      setState({ ...state });
    }
  };

  const handleAddPickedColor = (pickedColor: string) => {
    // Not going to add any other color if game is won or it's too late
    if (!state.isWon && state.round > -1) {
      // Pick the first item that is empty
      const pickedIndex = state.gameColors[state.round].findIndex(
        (color) => color.pickedColor === "",
      );
      if (pickedIndex > -1) {
        // Add the pickedColor by writing down his value instead
        state.gameColors[state.round][pickedIndex].pickedColor = pickedColor;
        setState({ ...state });
      }
    }
  };

  const handleRemovePickedColorLine = () => {
    state.gameColors[state.round] = Array.from({ length: 4 }, (_, index) => ({
      selectedColor: state.selectedColors[index],
      pickedColor: "",
      clueColor: "",
    }));
    setState({ ...state });
  };

  const handleCheckPickedColorLine = () => {
    // Put items of the same colour and position in first position
    state.gameColors[state.round]
      .toSorted((a) => (a.selectedColor === a.pickedColor ? -1 : 0))
      .forEach((color, _, arrColors) => {
        // First elements that exist and are well positioned get a clueColor of red
        if (color.pickedColor === color.selectedColor)
          color.clueColor = "var(--red-color)";
        // If not, let's check if they exist somewhere else
        else {
          const arrColor = arrColors.find(
            (arrColor) =>
              color.pickedColor === arrColor.selectedColor &&
              !arrColor.clueColor,
          );
          // Other elements that exist but are not well positioned get a clueColor of white
          if (arrColor) arrColor.clueColor = "var(--white-color)";
        }
      });

    if (
      state.gameColors[state.round].filter(
        (color) => color.clueColor === "var(--red-color)",
      ).length === 4
    )
      state.isWon = true;
    else state.round -= 1;

    setState({ ...state });
  };

  return (
    <>
      {(state.round === -1 || state.isWon) && (
        <div>
          {state.round === -1
            ? "Fin de la partie, la bonne combinaison était :"
            : "Félicitations, vous avez trouvé la combinaison !"}
        </div>
      )}
      <div className={"containerSelectedColors"}>
        {state.selectedColors.map((color, index) => (
          <div key={index} className={"containerColor"}>
            <div
              className={"color"}
              style={{
                visibility:
                  state.round === -1 || state.isWon ? "visible" : "hidden",
                backgroundColor: color,
              }}
            />
          </div>
        ))}
      </div>
      <div className={"containerBoardGame"}>
        <div className={"containerClue"}>
          {state.gameColors.map((colorLine) =>
            colorLine
              .toSorted((a, b) =>
                a.clueColor === ""
                  ? 1
                  : b.clueColor === ""
                  ? -1
                  : a.clueColor.localeCompare(b.clueColor),
              )
              .map((color, index) => (
                <div
                  key={index}
                  className={"clueColor"}
                  style={{ backgroundColor: color.clueColor }}
                />
              )),
          )}
        </div>
        <div className={"containerSearch"}>
          {state.gameColors.map((colorLine, indexLine) =>
            colorLine.map((color, index) => (
              <div
                key={index}
                onClick={() => handleRemovePickedColor(indexLine, index)}
                className={"searchColor"}
                style={{ backgroundColor: color.pickedColor }}
              />
            )),
          )}
        </div>
      </div>
      <div className={"containerBoardGame"}>
        {state.listColors.map((color, index) => (
          <div key={index} className={"containerColor"}>
            <div
              className={"color"}
              onClick={() => handleAddPickedColor(color)}
              style={{ backgroundColor: color }}
            />
          </div>
        ))}
      </div>
      <div className={"containerActions"}>
        <Button
          onClick={handleCheckPickedColorLine}
          width={"200px"}
          disabled={
            state.round < 0 ||
            (state.gameColors[state.round] &&
              state.gameColors[state.round].filter(
                (color) => color.pickedColor !== "",
              ).length !== 4)
          }
        >
          Tester la combinaison
        </Button>
        <Button
          onClick={handleRemovePickedColorLine}
          width={"200px"}
          disabled={
            state.round < 0 ||
            (state.gameColors[state.round] &&
              state.gameColors[state.round].filter(
                (color) => color.pickedColor !== "",
              ).length === 0)
          }
        >
          Supprimer la combinaison
        </Button>
      </div>
      <Button onClick={handleCreateGame} width={"200px"}>
        Recommencer une partie
      </Button>
    </>
  );
};

export { MasterMind };

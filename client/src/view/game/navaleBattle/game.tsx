import {
  TypeArrOfGrid,
  TypeArrOfShips,
  TypeNavaleBattle,
  TypeVersus,
} from "./type";
import ArrowRightImg from "../../../component/image/arrowRight.png";
import { Button } from "../../../component/button";
import { DisplayGrid } from "../navalebattle";
import { getNavaleBattleButtonStyle } from "./utils";
import styles from "./navaleBattle.module.css";

const BoardGame = ({
  state,
  resetGame,
  updateState,
}: {
  state: TypeNavaleBattle;
  resetGame: (keepVersus: boolean) => void;
  updateState: (arrOfShips: TypeArrOfShips, arrOfGrid: TypeArrOfGrid) => void;
}) => {
  const handleClickGrid = (
    indexOfPlayer: number,
    indexOfGrid: number,
    indexOfBox: number,
  ) => {
    // Check if you are on the other player's grid and if you are the currentPlayer
    if (
      ((state.versus === TypeVersus.COMPUTER &&
        indexOfPlayer !== state.currentPlayer) ||
        (state.versus === TypeVersus.PLAYER &&
          state.player !== indexOfPlayer &&
          state.player === state.currentPlayer)) &&
      state.winner === -1
    ) {
      const compGrid = state.arrOfGrid[0];
      const grid = state.arrOfGrid[indexOfPlayer];
      const box = state.arrOfGrid[indexOfPlayer][indexOfGrid][indexOfBox];

      // If ship exists
      if (box.indexOfShips > -1 && box.indexOfShip > -1) {
        // Ship is touched
        box.state = "T";

        const ship =
          state.arrOfShips[indexOfPlayer][box.indexOfShips][box.indexOfShip];
        ship.touched += 1;
        // Ship is sunk
        if (ship.touched === ship.size) {
          // Ship is horizontal
          if (ship.direction === "H") {
            // Get first index of row
            const firstIndex = state.arrOfGrid[indexOfPlayer][
              indexOfGrid
            ].findIndex(
              (grid) =>
                grid.indexOfShips === box.indexOfShips &&
                grid.indexOfShip === box.indexOfShip,
            );

            // Replace box's state by "empty"
            for (let i = firstIndex - 1; i < firstIndex + ship.size + 1; i++) {
              // Replace row - 1
              if (grid[indexOfGrid - 1] && grid[indexOfGrid - 1][i])
                grid[indexOfGrid - 1][i].state = "E";

              // Replace row
              if (grid[indexOfGrid][i])
                grid[indexOfGrid][i].state =
                  grid[indexOfGrid][i].state === "T" || box.state === "T"
                    ? "T"
                    : "E";

              // Replace row + 1
              if (grid[indexOfGrid + 1] && grid[indexOfGrid + 1][i])
                grid[indexOfGrid + 1][i].state = "E";
            }
            // Ship is vertical
          } else {
            // Get first index of col
            const firstIndex = state.arrOfGrid[indexOfPlayer].findIndex(
              (grid) =>
                grid[indexOfBox].indexOfShips === box.indexOfShips &&
                grid[indexOfBox].indexOfShip === box.indexOfShip,
            );

            // Replace box's state by "empty"
            for (let i = firstIndex - 1; i < firstIndex + ship.size + 1; i++) {
              if (grid[i] && grid[i][indexOfBox - 1])
                // Replace col - 1
                grid[i][indexOfBox - 1].state = "E";

              // Replace col
              if (grid[i] && grid[i][indexOfBox])
                grid[i][indexOfBox].state =
                  grid[i][indexOfBox].state === "T" || box.state === "T"
                    ? "T"
                    : "E";

              // Replace col + 1
              if (grid[i] && grid[i][indexOfBox + 1])
                grid[i][indexOfBox + 1].state = "E";
            }
          }
        } else if (
          state.versus === TypeVersus.COMPUTER &&
          state.currentPlayer === 1
        ) {
          if (compGrid[indexOfGrid][indexOfBox + 1])
            handleClickGrid(0, indexOfGrid, indexOfBox + 1);
          else if (compGrid[indexOfGrid][indexOfBox - 1])
            handleClickGrid(0, indexOfGrid, indexOfBox - 1);
          else if (compGrid[indexOfGrid + 1][indexOfBox])
            handleClickGrid(0, indexOfGrid + 1, indexOfBox);
          else if (compGrid[indexOfGrid - 1][indexOfBox])
            handleClickGrid(0, indexOfGrid - 1, indexOfBox);
        }
      } else {
        box.state = "E";
        // Switch currentPlayer when nothing happen
        state.currentPlayer = state.currentPlayer === 0 ? 1 : 0;
      }

      // If all ship's size and ship's touched are the same, we get a winner
      if (
        state.arrOfShips[indexOfPlayer].filter(
          (ships) => ships.filter((ship) => ship.touched !== ship.size).length,
        ).length === 0
      )
        state.winner = state.currentPlayer;

      // Computer plays
      if (
        state.versus === TypeVersus.COMPUTER &&
        state.currentPlayer === 1 &&
        state.winner === -1
      ) {
        setTimeout(() => {
          let tryIndexOfGrid = Math.floor(Math.random() * 10);
          let tryIndexOfBox = Math.floor(Math.random() * 10);

          // Finding a box that has empty state
          while (compGrid[tryIndexOfGrid][tryIndexOfBox].state !== "") {
            tryIndexOfGrid = Math.floor(Math.random() * 10);
            tryIndexOfBox = Math.floor(Math.random() * 10);
          }

          handleClickGrid(0, tryIndexOfGrid, tryIndexOfBox);
        }, 750);
      }

      updateState(state.arrOfShips, state.arrOfGrid);
    }
  };

  return (
    <div className={styles.containerBoardGame}>
      <div className={styles.containerViewTitle}>
        <div className={styles.viewTitle}>
          Détruisez les navires de l'ennemi !
        </div>
      </div>
      {state.winner > -1 && (
        <div>
          Partie terminée !{" "}
          {state.winner === state.player
            ? "Félicitations, vous remportez la bataille !"
            : "Malheureusement, l'ennemi remporte la bataille..."}
        </div>
      )}
      <div className={styles.boardGame}>
        {[...Array(2)].map((_, indexOfPlayer) => (
          <div key={indexOfPlayer} className={styles.boardGameCurrentPlayer}>
            {indexOfPlayer === 1 && (
              <img
                alt={ArrowRightImg}
                src={ArrowRightImg}
                style={{
                  transform:
                    state.currentPlayer === 1
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                }}
                className={styles.currentPlayer}
              />
            )}
            <div className={styles.boardGamePlayer}>
              <div>
                {state.player === indexOfPlayer
                  ? "Ton plateau"
                  : "Plateau de l'ennemi"}
              </div>
              <DisplayGrid
                ships={state.arrOfShips[indexOfPlayer]}
                grid={state.arrOfGrid[indexOfPlayer]}
                onClick={(indexOfGrid: number, indexOfBox: number) =>
                  // Not being able to click on our own grid while computer is playing
                  state.versus === TypeVersus.COMPUTER
                    ? state.currentPlayer === 0
                      ? handleClickGrid(indexOfPlayer, indexOfGrid, indexOfBox)
                      : ""
                    : handleClickGrid(indexOfPlayer, indexOfGrid, indexOfBox)
                }
                indexOfGrid={indexOfPlayer}
                player={state.player}
                winner={state.winner}
              />
            </div>
          </div>
        ))}
      </div>
      {state.winner > -1 && (
        <div className={styles.containerActions}>
          <Button
            onClick={() => resetGame(true)}
            style={getNavaleBattleButtonStyle(state.matchesMobile)}
          >
            {state.versus === TypeVersus.COMPUTER
              ? "Rejouer contre l'ordinateur"
              : "Rejouer avec le même joueur"}
          </Button>
          <Button
            onClick={() => resetGame(false)}
            style={getNavaleBattleButtonStyle(state.matchesMobile)}
          >
            Rejouer avec un autre joueur
          </Button>
        </div>
      )}
    </div>
  );
};

export { BoardGame };

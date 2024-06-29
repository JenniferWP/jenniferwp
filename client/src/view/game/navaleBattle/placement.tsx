import { Button } from "../../../component/button";
import { TypeGrid, TypeShip } from "./type";
import { DisplayGrid } from "../navalebattle";
import {
  checkHorizontalPosition,
  checkVerticalPosition,
  getNavaleBattleButtonStyle,
} from "./utils";
import Ship1Img from "../../../component/image/ship1.png";
import Ship2Img from "../../../component/image/ship2.png";
import Ship3Img from "../../../component/image/ship3.png";
import Ship4Img from "../../../component/image/ship4.png";
import styles from "./navaleBattle.module.css";

const Placement = ({
  ships,
  grid,
  player,
  matchesMobile,
  launchGame,
  resetShips,
  updateState,
}: {
  ships: TypeShip;
  grid: TypeGrid;
  player: number;
  matchesMobile: boolean;
  launchGame: () => void;
  resetShips: () => void;
  updateState: (ships: TypeShip, grid: TypeGrid) => void;
}) => {
  let currentShipID = "";

  const getShipImg = (size: number) => {
    if (size === 1) return Ship1Img;
    if (size === 2) return Ship2Img;
    if (size === 3) return Ship3Img;
    if (size === 4) return Ship4Img;
  };

  const handleShipDirection = (ship: {
    size: number;
    direction: string;
    placed: boolean;
  }) => {
    if (!ship.placed) {
      ship.direction = ship.direction === "H" ? "V" : "H";
      updateState(ships, grid);
    }
  };

  const allowDrop = (event: any) => event.preventDefault();

  const onDrag = (event: any) => (currentShipID = event.target.id);

  const onDrop = (event: any) => {
    if (event) {
      event.preventDefault();

      const box = event.target.id;
      const ship = currentShipID;
      if (box && ship) {
        // Ship
        const shipSplit = ship.split(".");
        const indexOfShips = parseInt(shipSplit[0]);
        const indexOfShip = parseInt(shipSplit[1]);
        const currentShip = ships[indexOfShips][indexOfShip];
        // Box
        const boxSplit = box.split(".");
        const indexOfGrid = parseInt(boxSplit[0]);
        const indexOfBox = parseInt(boxSplit[1]);

        currentShip.direction === "H"
          ? checkHorizontalPosition(
              grid,
              indexOfShips,
              indexOfShip,
              indexOfGrid,
              indexOfBox,
              currentShip,
            )
          : checkVerticalPosition(
              grid,
              indexOfShips,
              indexOfShip,
              indexOfGrid,
              indexOfBox,
              currentShip,
            );

        updateState(ships, grid);
      }
    }
  };

  return (
    <div className={styles.containerChoice}>
      <div className={styles.containerViewTitle}>
        <div className={styles.viewTitle}>
          Choisissez le placement de vos navires
        </div>
      </div>
      <div className={styles.choice}>
        <div className={styles.containerShips}>
          {ships.toReversed().map((arr, indexOfShips, tab) => (
            <div key={indexOfShips} className={styles.containerShip}>
              {arr.map((ship, indexOfShip) => (
                <div
                  key={tab.length - 1 - indexOfShips + "." + indexOfShip}
                  id={tab.length - 1 - indexOfShips + "." + indexOfShip}
                  onClick={() => handleShipDirection(ship)}
                  onDragStart={onDrag}
                  onTouchStart={onDrag}
                  draggable={!ship.placed}
                  className={styles.ship}
                  style={{
                    filter: ship.placed ? "brightness(0.5)" : "",
                    cursor: ship.placed ? "not-allowed" : "grab",
                  }}
                >
                  {ship.size > 1 && <div>{ship.direction}</div>}
                  {[...Array(ship.size)].map((_, index) => (
                    <img
                      alt={getShipImg(ship.size)}
                      key={index}
                      id={tab.length - 1 - indexOfShips + "." + indexOfShip}
                      src={getShipImg(ship.size)}
                      className={styles.shipImg}
                      draggable={false}
                    />
                  ))}
                </div>
              ))}
            </div>
          ))}
          <div className={styles.containerActions}>
            <Button
              onClick={launchGame}
              disabled={
                ships.filter(
                  (ships) => ships.filter((ship) => !ship.placed).length,
                ).length > 0
              }
              style={getNavaleBattleButtonStyle(
                matchesMobile,
                ships.filter(
                  (ships) => ships.filter((ship) => !ship.placed).length,
                ).length > 0,
              )}
            >
              Valider ces placements
            </Button>
            <Button
              onClick={resetShips}
              style={getNavaleBattleButtonStyle(matchesMobile)}
            >
              Supprimer et recommencer
            </Button>
          </div>
        </div>
        <DisplayGrid
          ships={ships}
          grid={grid}
          allowDrop={allowDrop}
          onDrop={onDrop}
          indexOfGrid={player}
          player={player}
          winner={-1}
        />
      </div>
    </div>
  );
};

export { Placement };

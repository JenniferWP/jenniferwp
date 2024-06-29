import { io } from "socket.io-client";
import { TypeGrid, TypeNavaleBattle, TypeView } from "./type";

const socket = io("https://jenniferwp.onrender.com");

const createRandomID = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++)
    result += characters.charAt(Math.floor(Math.random() * charactersLength));

  return result;
};

const getNavaleBattleButtonStyle = (
  matchesMobile: boolean,
  disabled?: boolean,
) => ({
  backgroundColor: disabled
    ? "var(--disabled-color)"
    : "var(--navale-battle-color)",
  color: "var(--white-color)",
  border: "none",
  fontFamily: "LXGW WenKai TC",
  fontSize: matchesMobile ? "12px" : "15px",
  maxWidth: "300px",
  padding: "10px",
});

const getNavaleBattleViewMobileStyle = (state: TypeNavaleBattle) => ({
  marginLeft: state.matchesMobile
    ? state.view === TypeView.HOME
      ? "82%"
      : state.winner > -1
      ? "97%"
      : "88%"
    : "",
});

const checkVerticalPosition = (
  grid: TypeGrid,
  indexOfShips: number,
  indexOfShip: number,
  indexOfGrid: number,
  indexOfBox: number,
  ship: { size: number; direction: string; placed: boolean },
) => {
  let isPresent = false;
  for (let i = indexOfGrid - 1; i < indexOfGrid + ship.size + 1; i++) {
    if (
      (grid[i] &&
        grid[i][indexOfBox - 1] &&
        grid[i][indexOfBox - 1].indexOfShips > -1) ||
      (grid[i] &&
        grid[i][indexOfBox] &&
        grid[i][indexOfBox].indexOfShips > -1) ||
      (grid[i] &&
        grid[i][indexOfBox + 1] &&
        grid[i][indexOfBox + 1].indexOfShips > -1)
    ) {
      isPresent = true;
      break;
    }
  }

  if (!isPresent && indexOfGrid + ship.size < 11) {
    for (let i = indexOfGrid; i < indexOfGrid + ship.size; i++) {
      grid[i][indexOfBox].indexOfShips = indexOfShips;
      grid[i][indexOfBox].indexOfShip = indexOfShip;
    }
    ship.placed = true;
    // eslint-disable-next-line
    ship.direction = ship.direction;
  }
};

const checkHorizontalPosition = (
  grid: TypeGrid,
  indexOfShips: number,
  indexOfShip: number,
  indexOfGrid: number,
  indexOfBox: number,
  ship: { size: number; direction: string; placed: boolean },
) => {
  let isPlaced = false;
  for (let i = indexOfBox - 1; i < indexOfBox + ship.size + 1; i++) {
    if (
      (grid[indexOfGrid - 1] &&
        grid[indexOfGrid - 1][i] &&
        grid[indexOfGrid - 1][i].indexOfShips > -1) ||
      (grid[indexOfGrid][i] && grid[indexOfGrid][i].indexOfShips > -1) ||
      (grid[indexOfGrid + 1] &&
        grid[indexOfGrid + 1][i] &&
        grid[indexOfGrid + 1][i].indexOfShips > -1)
    ) {
      isPlaced = true;
      break;
    }
  }
  if (!isPlaced && indexOfBox + ship.size < 11) {
    for (let i = indexOfBox; i < indexOfBox + ship.size; i++) {
      grid[indexOfGrid][i].indexOfShips = indexOfShips;
      grid[indexOfGrid][i].indexOfShip = indexOfShip;
    }
    ship.placed = true;
    // eslint-disable-next-line
    ship.direction = ship.direction;
  }
};

export {
  socket,
  createRandomID,
  getNavaleBattleButtonStyle,
  getNavaleBattleViewMobileStyle,
  checkVerticalPosition,
  checkHorizontalPosition,
};

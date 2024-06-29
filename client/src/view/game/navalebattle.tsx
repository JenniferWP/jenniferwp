import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Placement } from "./navaleBattle/placement";
import { Home } from "./navaleBattle/home";
import {
  TypeArrOfGrid,
  TypeArrOfShips,
  TypeGrid,
  TypeNavaleBattle,
  TypeShip,
  TypeVersus,
  TypeView,
} from "./navaleBattle/type";
import { BoardGame } from "./navaleBattle/game";
import {
  checkHorizontalPosition,
  checkVerticalPosition,
  createRandomID,
  getNavaleBattleViewMobileStyle,
  socket,
} from "./navaleBattle/utils";
import { Loader } from "../../component/loader";
import { Wave } from "../../component/wave";
import Ship1Img from "../../component/image/ship1.png";
import Ship2Img from "../../component/image/ship2.png";
import Ship3Img from "../../component/image/ship3.png";
import Ship4Img from "../../component/image/ship4.png";
import CrossImg from "../../component/image/cross.png";
import styles from "./navaleBattle/navaleBattle.module.css";

const DisplayGrid = ({
  ships,
  grid,
  allowDrop,
  onDrop,
  onClick,
  indexOfGrid,
  player,
  winner,
}: {
  ships: TypeShip;
  grid: TypeGrid;
  allowDrop?: (event: any) => void;
  onDrop?: (event: any) => void;
  onClick?: (indexOfGrid: number, indexOfBox: number) => void;
  indexOfGrid: number;
  player: number;
  winner: number;
}) => {
  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  const getStyle = (box: {
    indexOfShips: number;
    indexOfShip: number;
    state: string;
  }) => ({
    // If empty box
    backgroundColor: box.state === "E" || box.state === "T" ? "#00c3ff3a" : "",
  });

  const getShipImg = (box: {
    indexOfShips: number;
    indexOfShip: number;
    state: string;
  }) => {
    if (box.indexOfShips > -1 && box.indexOfShip > -1) {
      const ship = ships[box.indexOfShips][box.indexOfShip];

      // Ship is sunk or it's other player's grid
      if (ship.touched === ship.size || player === indexOfGrid || winner > -1) {
        if (ship.size === 1) return Ship1Img;
        if (ship.size === 2) return Ship2Img;
        if (ship.size === 3) return Ship3Img;
        if (ship.size === 4) return Ship4Img;
      }
    }
  };

  return (
    <div className={styles.containerGrid}>
      <div></div>
      {alphabet.map((_, indexOfAlphabet) => (
        <div key={indexOfAlphabet} className={styles.boxIndex}>
          {indexOfAlphabet + 1}
        </div>
      ))}
      {grid.map((boxes, indexOfGrid) => (
        <Fragment key={indexOfGrid}>
          <div className={styles.boxIndex}>{alphabet[indexOfGrid]}</div>
          {boxes.map((box, indexOfBox) => (
            <div
              key={indexOfGrid + "." + indexOfBox}
              id={indexOfGrid + "." + indexOfBox}
              onDragOver={allowDrop}
              onDrop={onDrop}
              onTouchEnd={onDrop}
              onClick={() =>
                box.state !== "T" &&
                box.state !== "E" &&
                onClick &&
                onClick(indexOfGrid, indexOfBox)
              }
              className={styles.box}
              style={getStyle(box)}
            >
              {box.indexOfShips > -1 && box.indexOfShip > -1 && (
                <div className={styles.containerBoxImg}>
                  <img
                    alt={getShipImg(box)}
                    src={getShipImg(box)}
                    className={styles.boxImg}
                  />
                  {box.state === "T" && (
                    <img
                      alt={CrossImg}
                      src={CrossImg}
                      className={styles.boxImg}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  );
};

const NavaleBattle = () => {
  const initialeState: TypeNavaleBattle = {
    arrOfShips: [...Array(2)].map(() =>
      [...Array(4)].map((_, index, tab) =>
        [...Array(tab.length - index)].map(() => ({
          size: index + 1,
          direction: "H",
          placed: false,
          touched: 0,
        })),
      ),
    ),
    arrOfGrid: [...Array(2)].map(() =>
      [...Array(10)].map(() =>
        [...Array(10)].map(() => ({
          indexOfShips: -1,
          indexOfShip: -1,
          state: "",
        })),
      ),
    ),
    player: 0,
    currentPlayer: 0,
    versus: TypeVersus.COMPUTER,
    socketRoom: createRandomID(16),
    view: TypeView.HOME,
    displayLoader: false,
    loaderText: "En attente de l'ennemi",
    winner: -1,
    matchesMobile: window.matchMedia("(max-width: 767px)").matches,
  };
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const room = searchParams.get("join_room");
  const [state, setState] = useState(initialeState);

  useEffect(() => {
    window
      .matchMedia("(max-width: 767px)")
      .addEventListener("change", (e) =>
        setState({ ...state, matchesMobile: e.matches }),
      );
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // If player 2 is connected from a link
    if (room) socketJoinRoom(room, 1);
    // eslint-disable-next-line
  }, [room]);

  useEffect(() => {
    // Socket to init the game
    socket.on("init_game", (room: string) => {
      state.versus = TypeVersus.PLAYER;
      state.socketRoom = room;
      handleInitBoardGame();
    });

    // Socket during the placement and game view
    socket.on("on_game", (data: TypeNavaleBattle) => {
      state.arrOfShips = data.arrOfShips;
      state.arrOfGrid = data.arrOfGrid;
      state.currentPlayer = data.currentPlayer;
      state.winner = data.winner;
      state.loaderText = data.loaderText;
      state.socketRoom = data.socketRoom;
      state.view = data.view;
      setState({ ...state });
    });

    // Socket for leaving room for both players
    socket.on("leave_room", () => {
      socket.emit("leave_room", { room: state.socketRoom });
    });

    // Socket if resetting the game
    socket.on("reset_game", () => {
      state.displayLoader = true;
      state.loaderText =
        "La bataille est terminée. Vous allez être redirigé sur le menu.";
      setState({ ...state });
    });
    // eslint-disable-next-line
  }, [socket]);

  const socketJoinRoom = (room: string, player: number) => {
    state.socketRoom = room;
    socket.emit("join_room", { room: state.socketRoom });
    state.versus = TypeVersus.PLAYER;
    state.player = player;
    state.currentPlayer = 0;
    state.displayLoader = true;
    setState({ ...state });
  };

  const generateComputerShips = (
    grid: TypeGrid,
    indexOfShips: number,
    indexOfShip: number,
    ship: { size: number; direction: string; placed: boolean },
  ) => {
    const indexOfGrid = Math.floor(Math.random() * 10);
    const indexOfBox = Math.floor(Math.random() * 10);
    const direction = ["H", "V"][Math.floor(Math.random() * 2)];
    ship.direction = direction;

    direction === "H"
      ? checkHorizontalPosition(
          grid,
          indexOfShips,
          indexOfShip,
          indexOfGrid,
          indexOfBox,
          ship,
        )
      : checkVerticalPosition(
          grid,
          indexOfShips,
          indexOfShip,
          indexOfGrid,
          indexOfBox,
          ship,
        );
  };

  const handleInitBoardGame = () => {
    state.arrOfShips = [...Array(2)].map(() =>
      [...Array(4)].map((_, index, tab) =>
        [...Array(tab.length - index)].map(() => ({
          size: index + 1,
          direction: "H",
          placed: false,
          touched: 0,
        })),
      ),
    );
    state.arrOfGrid = [...Array(2)].map(() =>
      [...Array(10)].map(() =>
        [...Array(10)].map(() => ({
          indexOfShips: -1,
          indexOfShip: -1,
          state: "",
        })),
      ),
    );
    state.displayLoader = false;
    state.loaderText = "En attente de l'ennemi";
    state.currentPlayer = 0;
    state.winner = -1;
    state.view = TypeView.PLACEMENT;
    setState({ ...state });
  };

  const handleResetPlacement = (player: number) => {
    state.arrOfGrid[player] = [...Array(10)].map(() =>
      [...Array(10)].map(() => ({
        indexOfShips: -1,
        indexOfShip: -1,
        state: "",
      })),
    );
    state.arrOfShips[player] = [...Array(4)].map((_, index, tab) =>
      [...Array(tab.length - index)].map(() => ({
        size: index + 1,
        direction: "H",
        placed: false,
        touched: 0,
      })),
    );
    setState({ ...state });
  };

  const handleInitComputerPlacement = () => {
    state.arrOfShips[0] = [...Array(4)].map((_, index, tab) =>
      [...Array(tab.length - index)].map(() => ({
        size: index + 1,
        direction: "H",
        placed: false,
        touched: 0,
      })),
    );

    // TMP à supprimer
    // state.arrOfShips[0].forEach((ships, indexOfShips) => {
    //   ships.forEach((ship, indexOfShip) => {
    //     while (ship.placed === false)
    //       generateComputerShips(
    //         state.arrOfGrid[0],
    //         indexOfShips,
    //         indexOfShip,
    //         ship,
    //       );
    //   });
    // });

    state.arrOfShips[1].forEach((ships, indexOfShips) => {
      ships.forEach((ship, indexOfShip) => {
        while (ship.placed === false)
          generateComputerShips(
            state.arrOfGrid[1],
            indexOfShips,
            indexOfShip,
            ship,
          );
      });
    });

    setState({ ...state, winner: -1, view: TypeView.PLACEMENT });
  };

  const handleResetGame = (keepVersus: boolean) => {
    if (state.versus === TypeVersus.COMPUTER) {
      if (keepVersus) {
        state.arrOfShips = [...Array(2)].map(() =>
          [...Array(4)].map((_, index, tab) =>
            [...Array(tab.length - index)].map(() => ({
              size: index + 1,
              direction: "H",
              placed: false,
              touched: 0,
            })),
          ),
        );
        state.arrOfGrid = [...Array(2)].map(() =>
          [...Array(10)].map(() =>
            [...Array(10)].map(() => ({
              indexOfShips: -1,
              indexOfShip: -1,
              state: "",
            })),
          ),
        );
        state.currentPlayer = 0;
        handleInitComputerPlacement();
      } else setState(initialeState);
    } else {
      if (keepVersus) {
        socket.emit("reset_board_game", state);
        setState({ ...state, displayLoader: true });
      } else socket.emit("reset_game", { room: state.socketRoom });
    }
  };

  const handleLoadPlacement = (versus: TypeVersus) => {
    if (versus === TypeVersus.COMPUTER) handleInitComputerPlacement();
    else socketJoinRoom(state.socketRoom, 0);
  };

  const handleLoadGame = () => {
    if (state.versus === TypeVersus.COMPUTER)
      setState({ ...state, view: TypeView.GAME });
    else {
      socket.emit("set_game", state);
      setState({ ...state, displayLoader: true });
    }
  };

  const handleUpdateStateGame = (
    arrOfShips: TypeArrOfShips,
    arrOfGrid: TypeArrOfGrid,
  ) => {
    if (state.versus === TypeVersus.COMPUTER)
      setState({ ...state, arrOfShips, arrOfGrid });
    else socket.emit("on_game", state);
  };

  return (
    <div>
      <div className={styles.rotationWrapperInner}>
        <div
          className={styles.containerNavaleBattle}
          style={getNavaleBattleViewMobileStyle(state)}
        >
          {state.view === TypeView.HOME && (
            <Home
              socketRoom={state.socketRoom}
              matchesMobile={state.matchesMobile}
              loadPlacement={(versus) => handleLoadPlacement(versus)}
            />
          )}
          {state.view === TypeView.PLACEMENT && (
            <Placement
              ships={state.arrOfShips[state.player]}
              grid={state.arrOfGrid[state.player]}
              player={state.player}
              matchesMobile={state.matchesMobile}
              launchGame={handleLoadGame}
              resetShips={() => handleResetPlacement(state.player)}
              updateState={(ships, grid) => {
                state.arrOfShips[state.player] = ships;
                state.arrOfGrid[state.player] = grid;
                setState({ ...state });
              }}
            />
          )}
          {state.view === TypeView.GAME && (
            <BoardGame
              state={state}
              resetGame={handleResetGame}
              updateState={handleUpdateStateGame}
            />
          )}
          {!state.matchesMobile && <Wave />}
          {state.displayLoader && (
            <Loader
              action={state.loaderText !== "En attente de l'ennemi"}
              text={state.loaderText}
              onClick={() => {
                window.history.pushState({}, document.title, location.pathname);
                setState(initialeState);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export { DisplayGrid, NavaleBattle };

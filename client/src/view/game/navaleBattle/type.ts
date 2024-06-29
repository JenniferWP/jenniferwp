export enum TypeView {
  HOME = "home",
  PLACEMENT = "placement",
  GAME = "game",
}

export enum TypeVersus {
  COMPUTER = "computer",
  PLAYER = "player",
}

export type TypeShip = Array<
  Array<{
    size: number;
    direction: string;
    placed: boolean;
    touched: number;
  }>
>;

export type TypeArrOfShips = Array<TypeShip>;

export type TypeGrid = Array<
  Array<{ indexOfShips: number; indexOfShip: number; state: string }>
>;

export type TypeArrOfGrid = Array<
  Array<Array<{ indexOfShips: number; indexOfShip: number; state: string }>>
>;

export type TypeNavaleBattle = {
  arrOfShips: TypeArrOfShips;
  arrOfGrid: TypeArrOfGrid;
  player: number;
  currentPlayer: number;
  versus: TypeVersus;
  socketRoom: string;
  view: TypeView;
  displayLoader: boolean;
  loaderText: string;
  winner: number;
  matchesMobile: boolean;
};

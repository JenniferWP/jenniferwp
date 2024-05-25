import { TicTacToe } from "./tictactoe";
import { MasterMind } from "./mastermind";
import { ArrowRightUp } from "../../component/icon/arrowRightUp";
import "./game.css";

const Game = () => {
  const games = [
    {
      title: "MasterMind",
      children: () => <MasterMind />,
    },
    {
      title: "TicTacToe",
      children: () => <TicTacToe />,
    },
  ];

  return (
    <div className={"containerGame"}>
      <div className={"game"}>
        {games.map((game, index) => (
          <div key={index} className={"gamePart"}>
            <a
              rel={"noreferrer"}
              href={`https://github.com/JenniferWP/jenniferwp/tree/main/src/view/game/${game.title.toLowerCase()}.tsx`}
              target={"_blank"}
              className={"gameLink"}
            >
              <span>{"Voir le code associé"}</span>
              <ArrowRightUp />
            </a>
            <div className={"gameTitle"}>{game.title}</div>
            <game.children />
          </div>
        ))}
      </div>
    </div>
  );
};

export { Game };

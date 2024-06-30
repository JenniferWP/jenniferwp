import { TicTacToe } from "./tictactoe";
import { MasterMind } from "./mastermind";
import { NavaleBattle } from "./navalebattle";
import { ArrowRightUp } from "../../component/icon/arrowRightUp";
import "./game.css";

const Game = () => {
  const games = [
    {
      title: "Bataille navale",
      githubFileName: "navalebattle",
      children: () => <NavaleBattle />,
    },
    {
      title: "MasterMind",
      githubFileName: "mastermind",
      children: () => <MasterMind />,
    },
    {
      title: "Tic Tac Toe",
      githubFileName: "tictactoe",
      children: () => <TicTacToe />,
    },
  ];

  return (
    <div className={"containerGame"}>
      <div className={"game"}>
        {games.map((game, index) => (
          <div
            key={index}
            className={"gamePart"}
            style={{
              flexBasis:
                game.githubFileName === "navalebattle" ? "100%" : "30%",
            }}
          >
            <a
              rel={"noreferrer"}
              href={`https://github.com/JenniferWP/jenniferwp/tree/main/client/src/view/game/${game.githubFileName}.tsx`}
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

import { useEffect } from "react";
//@ts-ignore
import Typewriter from "typewriter-effect/dist/core";
import "./home.css";

const Home = () => {
  useEffect(() => {
    const textHome = document.getElementById("textHome");

    const typewriter = new Typewriter(textHome, {
      delay: 30,
    });

    typewriter
      .typeString("Bienvenue sur Jennifer WP !<br/>")
      .pauseFor(1000)
      .typeString("Développeuse web spécialisée en front située à Paris")
      .pauseFor(500)
      .deleteChars(5)
      .changeDelay(80)
      .typeString("Toulouse")
      .pauseFor(500)
      .changeDelay(30)
      .typeString(
        ", je suis à la recherche de mission de programmation 💻<br/>",
      )
      .pauseFor(1000)
      .typeString(
        "Vous retrouverez ici toutes les informations importantes me concernant sur mon parcours et mes expériences<br/>",
      )
      .pauseFor(1000)
      .typeString("Bonne visite !")
      .start();
  }, []);

  return (
    <>
      <div className={"containerHome"}></div>
      <div className={"home"}>
        <div id={"textHome"} className={"textHome"}></div>
      </div>
    </>
  );
};

export { Home };

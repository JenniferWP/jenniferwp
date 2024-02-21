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
      .typeString("<div>Bonjour et bienvenue sur 'nom de mon site web' !</div>")
      .pauseFor(1000)
      .typeString("Développeuse web spécialisée en front située à Paris")
      .pauseFor(500)
      .deleteChars(5)
      .changeDelay(80)
      .typeString("Toulouse")
      .pauseFor(500)
      .changeDelay(30)
      .typeString(
        ", vous retrouverez ici toutes les informations importantes à connaitre sur mon parcours et mes expériences professionnelles",
      )
      .pauseFor(1000)
      .typeString("<div>Bonne visite !</div>")
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

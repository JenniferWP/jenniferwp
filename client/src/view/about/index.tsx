import { Link } from "react-router-dom";
import { ArrowRight } from "../../component/icon/arrowRight";
import MyselfImg from "../../component/image/myself.png";
import "./about.css";

const About = () => {
  return (
    <div className={"containerAbout"}>
      <div className={"about"}>
        <div className={"aboutTop"}>
          <img alt={MyselfImg} src={MyselfImg} className={"aboutImg"} />
          <div className={"aboutMe"}>
            <span className={"aboutTitle"}>Présentation</span>
            <div className={"aboutDescription"}>
              Bonjour ! Je m'appelle Jennifer et je vis à Toulouse. Cela fait
              maintenant plus de 4 ans que je suis développeuse web spécialisée
              en front, et plus particulièrement en React. Aujourd'hui je me
              lance à la recherche de missions en freelance ou d'un poste en
              CDI, en présentiel.
              <br />
              En parallèle de la programmation, je suis passionnée par la
              psychologie, à tel point que j'ai repris mes études dans ce
              domaine. Et quand je suis ni en train de coder ni en train
              d'étudier, je joue à des jeux de société ou des jeux vidéo.
            </div>
          </div>
        </div>
        <div className={"aboutTech"}>
          <span className={"aboutTitle"}>L'informatique</span>
          <div className={"aboutDescription"}>
            En 2016, mon aventure en informatique a débuté avec{" "}
            <Link
              className={"aboutLink"}
              to={"https://42.fr/"}
              target={"_blank"}
            >
              l'école 42
            </Link>
            . 42 est une école qui ne propose pas d'apprentissage de la
            programmation par des cours, des professeurs ou des classes.
            L'apprentissage se fait par nous-même au travers de divers projets
            de différents niveaux et langages proposés par l'école. J'ai donc
            commencé la programmation en C avec des projets algorithmiques, puis
            je me suis dirigée vers le web avec le HTML & CSS, le PHP, le
            Javascript et enfin React.
            <br />
            En 2020 j'ai rejoint l'équipe{" "}
            <Link
              className={"aboutLink"}
              to={"https://www.tactill.com/"}
              target={"_blank"}
            >
              Tactill
            </Link>{" "}
            pour une durée de 3 ans en tant que développeuse front-end afin de
            commencer le développement d'un tout nouveau tableau de bord en
            React.
          </div>
          <Link className={"linkExperience"} to={"/experience"}>
            <div className={"linkIcon"}>
              <ArrowRight />
            </div>
            <div>Voir mes expériences</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export { About };

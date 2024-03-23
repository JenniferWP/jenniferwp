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
              lance en tant que freelance, je suis donc disponible pour des
              missions de développement en React et en distantiel, de
              préférence.
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
            React. Vous l'aurez compris je pense, j'aime React.
          </div>
          <Link className={"linkExperience"} to={"/experience"}>
            <div className={"linkIcon"}>
              <ArrowRight />
            </div>
            <div>Voir mes expériences</div>
          </Link>
        </div>
        <div className={"aboutPsychology"}>
          <span className={"aboutTitle"}>La psychologie</span>
          <div className={"aboutDescription"}>
            Fin 2023, j'ai décidé de reprendre mes études dans un domaine qui
            m'a toujours passionné, à savoir la psychologie. Comprendre comment
            le cerveau fonctionne et comment il nous influence au quotidien est
            un sujet qui me donne envie d'aller très loin dans ce domaine. C'est
            pourquoi je me destine à la recherche par la suite.
          </div>
        </div>
      </div>
    </div>
  );
};

export { About };

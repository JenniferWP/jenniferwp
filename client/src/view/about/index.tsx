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
              Bonjour ! Je suis développeuse web front-end spécialisée en React,
              avec plus de 3 ans d'expérience dans la création d'applications
              web modernes, interactives et performantes.
              <br /> <br />
              Passionnée par le développement front-end, je conçois des
              interfaces fluides, intuitives et responsive, en mettant l'accent
              sur la performance et l'expérience utilisateur. Mon expertise en
              React.js, TypeScript, JavaScript, HTML, CSS, Figma et d'autres
              technologies front-end me permet de répondre aux besoins les plus
              exigeants.
              <br /> <br />
              Je suis actuellement à la recherche de missions en freelance ou
              d'un poste en CDI pour continuer à relever des défis techniques et
              à collaborer sur des projets innovants. Si vous êtes à la
              recherche d'une développeuse React compétente, motivée et
              rigoureuse, n’hésitez pas à me contacter pour discuter de vos
              besoins !
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
            . 42 est une école d’informatique innovante où l’apprentissage se
            fait en totale autonomie. Sans cours ni professeurs, l’école repose
            sur un apprentissage basé sur des projets et des peer reviews, une
            méthode qui m’a permis de développer ma capacité à résoudre des
            problèmes de manière indépendante et à travailler efficacement en
            équipe. J'y ai appris des langages comme le C, le Shell,
            l'algorithmique, ainsi que les bases du développement web avec PHP,
            HTML, CSS, JavaScript, Angular et enfin React, que j'utilise
            aujourd’hui pour construire des applications modernes et
            performantes.
            <br /> <br />
            En 2020, j'ai rejoint l'équipe{" "}
            <Link
              className={"aboutLink"}
              to={"https://www.tactill.com/"}
              target={"_blank"}
            >
              Tactill
            </Link>{" "}
            pour une mission de 3 ans en tant que développeuse front-end afin de
            commencer le développement d'une toute nouvelle application web en
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

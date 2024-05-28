import { Tag } from "../../component/tag";
// @ts-ignore
import ResumePDF from "./resume.pdf";
import { ArrowRightUp } from "../../component/icon/arrowRightUp";
import "./experience.css";
import { useEffect, useState } from "react";

type TypeExperience = Array<{
  year: string;
  job: string;
  project?: string;
  description: string;
  skills: Array<string>;
}>;

const Experience = () => {
  const initialState: {
    matchesIPad: boolean;
    matchesMobile: boolean;
  } = {
    matchesIPad: false,
    matchesMobile: false,
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState({
      ...state,
      matchesIPad: window.matchMedia("(max-width: 1023px)").matches,
      matchesMobile: window.matchMedia("(max-width: 767px)").matches,
    });
    window
      .matchMedia("(max-width: 1023px)")
      .addEventListener("change", (e) =>
        setState({ ...state, matchesIPad: e.matches }),
      );
    window
      .matchMedia("(max-width: 767px)")
      .addEventListener("change", (e) =>
        setState({ ...state, matchesMobile: e.matches }),
      );
    // eslint-disable-next-line
  }, []);

  const proExperiences: TypeExperience = [
    {
      year: "2020-2023",
      job: "Développeuse Front-End @ Tactill",
      description:
        "Tactill est une entreprise proposant une application de caisse enregistreuse sur iPad et un tableau de bord web à destination des commercants dans le but de pouvoir gérer leur magasin. Suite à l'évolution des besoins, une nouvelle application et un nouveau tableau de bord ont eu besoin d'être développé. Mise en place du projet, installation des librairies, création de composants associés aux besoins visuels, implémentation des fonctions, ajout du style et des appels API, assemblage de tous ces composants entre eux pour composer les vues ainsi que création de leurs tests unitaires/d'intégration ont été développé en très grande partie par moi.",
      skills: [
        "React",
        "TypeScript",
        "JavaScript",
        "HTML & CSS",
        "Redux",
        "GraphQL",
        "Figma",
        "Amazon Web Services",
      ],
    },
    {
      year: "2018-2019",
      job: "Développeuse Full-Stack @ Crème de la crème",
      description:
        "Crème de la crème est une entreprise permettant aux freelances de trouver des missions et aux entreprises de recruter des freelances. De nouveaux besoins ont engendré l'implémentation d'un nouveau formulaire d'inscription ainsi que le remplacement des composants existants Angular en React et la résolution des bugs sur le site existant, ce à quoi j'ai contribué.",
      skills: [
        "React",
        "TypeScript",
        "JavaScript",
        "HTML & CSS",
        "NodeJS",
        "Amazon Web Services",
      ],
    },
    {
      year: "2018-2018",
      job: "Développeuse Full-Stack @ Elum Energy",
      description:
        "Elum Energy est une société spécialisée dans l'énergie et l'automatisation qui fournit des solutions efficaces de surveillance et de contrôle pour les systèmes d'énergie solaire. De nouveaux besoins ont engendré l'implémentation d'un nouveau formulaire d'inscription ainsi que la résolution des bugs sur le site existant.",
      skills: ["Angular", "JavaScript", "HTML & CSS", "NodeJS"],
    },
  ];

  const schoolExperiences: TypeExperience = [
    {
      year: "2019-2020",
      job: "Etudiante @ 42",
      project: "Hypertube",
      description:
        "Hypertube est un site de streaming. L'objectif de ce projet était de créer un site au même titre que Netflix ou Amazon Prime. Un lecteur de film a été implémenté, partant d'un film sélectionné dans une liste complète s'affichant avec un lazy loading. Une recherche de film a aussi été implémenté, ainsi qu'une possibilité de sauvegarder les films que l'on souhaite voir dans le futur. Un système de notation comportant une note entre 1 et 5 et un champ commentaire est possible en dessous de chaque film et reste publique pour toutes les personnes inscrites et connectées.",
      skills: [
        "React",
        "TypeScript",
        "JavaScript",
        "HTML & CSS",
        "Redux",
        "SemanticUI",
        "NodeJS",
        "PostegreSQL",
      ],
    },
    {
      year: "2019-2019",
      job: "Etudiante @ 42",
      project: "Matcha",
      description:
        "Matcha est un site de rencontres. L'objectif de ce projet était de créer un site au même titre que Tinder ou Okcupid. Une liste de potentiels partenaires s'affiche, qu'on peut aimer et matcher avec s'ils nous ont aimé en retour. Une conversation en temps réel a aussi été implémenté.",
      skills: [
        "React",
        "TypeScript",
        "JavaScript",
        "HTML & CSS",
        "Redux",
        "SemanticUI",
        "NodeJS",
        "SocketIO",
        "PostegreSQL",
        "Postico",
      ],
    },
    {
      year: "2018-2018",
      job: "Etudiante @ 42",
      project: "Camagru",
      description:
        "Camagru est un réseau social. L'objectif de ce projet était de créer un site au même titre qu'Instagram ou Snapchat. A partir d'une image, prise en direct à travers une webcam ou téléchargée directement sur le site, on peut y appliquer un filtre et l'afficher dans une galerie publique disponible pour toutes les personnes inscrites et connectées.",
      skills: ["JavaScript", "HTML & CSS", "Ajax", "PHP", "MySQL"],
    },
  ];

  return (
    <div className={"containerExperience"}>
      <div>
        <a
          rel={"noreferrer"}
          href={ResumePDF}
          target={"_blank"}
          className={"resume"}
        >
          <span>{state.matchesMobile ? "CV" : "Voir mon CV complet"}</span>
          <ArrowRightUp />
        </a>
        <div className={"containerPart"}>
          <div>
            <div className={"typeExperience"}>Expériences professionnelles</div>
            {proExperiences.map((exp, index) => (
              <div key={exp.job}>
                <div
                  style={{
                    animationDelay: "0" + (index - 0.5 * index) + "s",
                  }}
                  className={"containerInfos"}
                >
                  <div className={"infoYear"}>{exp.year}</div>
                  <div className={"infos"}>
                    <div className={"infoJob"}>{exp.job}</div>
                    <div className={"infoDescription"}>{exp.description}</div>
                    <div className={"infoSKill"}>
                      {exp.skills.map((skill) => (
                        <Tag key={skill} value={skill} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className={"typeExperience"}>Projets scolaires</div>
            {schoolExperiences.map((exp, index) => (
              <div key={exp.project}>
                <div
                  style={{
                    animationDelay: state.matchesIPad
                      ? "0" + (1.5 + index - 0.5 * index) + "s"
                      : "0" + (index - 0.5 * index) + "s",
                  }}
                  className={"containerInfos"}
                >
                  <div className={"infoYear"}>{exp.year}</div>
                  <div className={"infos"}>
                    <div className={"infoJob"}>{exp.job}</div>
                    <div className={"infoProject"}>{exp.project}</div>
                    <div className={"infoDescription"}>{exp.description}</div>
                    <div className={"infoSKill"}>
                      {exp.skills.map((skill) => (
                        <Tag key={skill} value={skill} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Experience };

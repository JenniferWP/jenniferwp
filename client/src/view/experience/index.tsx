// @ts-ignore
import ResumePDF from "./JenniferCharloisResume.pdf";
import { ArrowRightUp } from "../../component/icon/arrowRightUp";
import "./experience.css";
import { useEffect, useState } from "react";
import { Tags } from "../../component/tags";

type TypeExperience = Array<{
  year: string;
  job: string;
  project?: string;
  description: string;
  tags: Array<string>;
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
        setState({ ...state, matchesIPad: e.matches })
      );
    window
      .matchMedia("(max-width: 767px)")
      .addEventListener("change", (e) =>
        setState({ ...state, matchesMobile: e.matches })
      );
    // eslint-disable-next-line
  }, []);

  const proExperiences: TypeExperience = [
    {
      year: "2020-2023",
      job: "Développeuse Front-End @ Tactill",
      description: `Tactill est une entreprise proposant une application de caisse enregistreuse sur iPad et un tableau de bord web à destination des commercants dans le but de pouvoir gérer leur magasin.
      Conception complète d’une application web, depuis l’intégration des vues Figma jusqu’à la création des composants React.
      Utilisation du CSS pour le design, intégration des appels API via GraphQL et développement des tests unitaires pour garantir la fiabilité du code.
      Réalisation de l’ensemble du projet de manière autonome, visant à livrer une application performante, conforme aux spécifications et optimisée pour l’expérience utilisateur.`,
      tags: [
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
      job: "Développeuse Full Stack @ Crème de la crème",
      description: `Crème de la crème est une entreprise permettant aux freelances de trouver des missions et aux entreprises de recruter des freelances. 
      Participation à la refonte d’une application web, avec la conception et le développement d’un nouveau formulaire d’inscription en React et NodeJS.
      Résolution des bugs existants sur la version précédente de l’application pour améliorer la performance et la stabilité. Mise à jour des profils utilisateurs et
      ajout de nouvelles fonctionnalités pour améliorer l’expérience. Collaboration étroite avec l’équipe pour garantir la cohérence du projet et l’intégration des modifications.`,
      tags: [
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
      job: "Développeuse Full Stack @ Elum Energy",
      description: `Elum Energy est une société spécialisée dans l'énergie et l'automatisation qui fournit des solutions efficaces de surveillance et de contrôle pour les systèmes d'énergie solaire. 
      Participation à la refonte d’une application web, avec la conception et le développement d’un nouveau formulaire d’inscription en React et NodeJS. Résolution des bugs existants sur la version
      précédente de l’application pour améliorer la performance et la stabilité. Mise à jour des profils utilisateurs et ajout de nouvelles fonctionnalités pour améliorer l’expérience.
      Collaboration étroite avec l’équipe pour garantir la cohérence du projet et l’intégration des modifications.`,
      tags: ["Angular", "JavaScript", "HTML & CSS", "NodeJS"],
    },
  ];

  const schoolExperiences: TypeExperience = [
    {
      year: "2019-2020",
      job: "Etudiante @ 42",
      project: "Hypertube",
      description:
        "Hypertube est une plateforme de streaming similaire à Netflix ou Amazon Prime. Le projet consistait à développer un site de diffusion de films avec plusieurs fonctionnalités clés. Un lecteur vidéo a été intégré, permettant la lecture de films sélectionnés dans une liste complète affichée via lazy loading pour optimiser les performances. Une fonction de recherche a également été ajoutée, ainsi qu'une option permettant aux utilisateurs de sauvegarder les films à visionner plus tard. De plus, un système de notation a été mis en place, offrant une échelle de 1 à 5 étoiles, ainsi qu'un champ de commentaire sous chaque film. Ces évaluations restent publiques et accessibles à tous les utilisateurs inscrits et connectés.",
      tags: [
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
        "Matcha est une plateforme de rencontres inspirée de sites comme Tinder ou OkCupid. L'objectif du projet était de créer un espace où les utilisateurs peuvent découvrir des profils compatibles, exprimer leur intérêt en aimant un profil, et 'matcher' si l'intérêt est réciproque. Une fonctionnalité de chat en temps réel a également été intégrée pour permettre aux utilisateurs de discuter immédiatement après un match.",
      tags: [
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
        "Camagru est un réseau social similaire à Instagram ou Snapchat. L'objectif du projet était de créer une plateforme où les utilisateurs peuvent prendre ou télécharger une image via leur webcam, y appliquer un filtre, puis la partager dans une galerie publique. Cette galerie est accessible à toutes les personnes inscrites et connectées, permettant ainsi un échange et une interaction autour des créations.",
      tags: ["JavaScript", "HTML & CSS", "Ajax", "PHP", "MySQL"],
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
                    <Tags tags={exp.tags} />
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
                    <Tags tags={exp.tags} />
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
